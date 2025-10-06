"use client";
import NavItems from "./NavItems";

export const menuActions = [
  {
    name: "Go to App",
    href: "/",
    icon: <i className="bi bi-house nav-mobile-icon"></i>,
    actionFunction: null,
  },
];
export default function Navbar() {
  return (
    <>
      <div className="w-full" ref={null}>
        <nav className="nav ">
          <NavItems />
        </nav>
      </div>
    </>
  );
}
