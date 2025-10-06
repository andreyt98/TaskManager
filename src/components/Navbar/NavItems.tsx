import Link from "next/link";
import { useEffect, useState } from "react";
import { menuActions } from "./Navbar";
import { usePathname } from "next/navigation";
// import { auth } from "@/firebase/firebase.config";
// import { onAuthStateChanged } from "firebase/auth";
import SearchButton from "./SearchButton";
import SignInButton from "./SignInButton";
import UserMenuButton from "./UserMenuButton";

function NavItems() {
  // const [loadingAuth, setLoadingAuth] = useState({ state: "unknown" }); //original
  const [loadingAuth, setLoadingAuth] = useState({ state: "on" });
  const pathname = usePathname();

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
        <li className="">
          {loadingAuth.state === "unknown" ? <div className="font-medium py-2 px-4 bg-slate-400 rounded-lg animate-pulse"></div> : loadingAuth.state === "off" ? <SignInButton /> : <UserMenuButton />}
        </li>
      </ul>
    </div>
  );
}

export default NavItems;
