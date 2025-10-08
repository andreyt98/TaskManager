"use client";
import NavItems from "./NavItems";

export const menuActions = [
  {
    name: "Go to App",
    href: "/tasks",
    icon: null,
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
