import Link from "next/link";
import { useEffect, useState } from "react";
import { menuActions } from "./Navbar";
import { usePathname } from "next/navigation";
import SearchButton from "./SearchButton";
import SignInButton from "./SignInButton";
import UserMenuButton from "./UserMenuButton";
import { setAuthState } from "../../store/slices/authSlice";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

function NavItems() {
  const pathname = usePathname();
  const { authState } = useSelector((state: RootState) => state.auth);

  return (
    <div className={`links relative flex-row-between gap-2 w-full text-black`}>
      <ul className="">
        <li id="logo" className="">
          <Link href="/">
            <img src="/Clarity.png" className="w-[5.5rem]" alt="" />
          </Link>
        </li>
      </ul>
      <ul className=" flex gap-4 sm:gap-8 items-center justify-center ">
        {authState === "unknown" ? (
          <>
            <div className="font-medium h-7 w-24 bg-slate-200 rounded-xl animate-pulse"></div>
          </>
        ) : authState === "off" ? (
          <>
            {menuActions.map((element, index) => {
              return (
                <li className="" key={index}>
                  <Link
                    className={`${" hover:text-brand-light hover:font-semibold"} nav-item-box max-sm:text-[80%] border-b border-transparent transition-all duration-200`}
                    key={index}
                    href={element.href}
                  >
                    {element.icon}
                    {element.name}
                  </Link>
                </li>
              );
            })}
            <SignInButton />
          </>
        ) : (
          <UserMenuButton />
        )}
      </ul>
    </div>
  );
}

export default NavItems;
