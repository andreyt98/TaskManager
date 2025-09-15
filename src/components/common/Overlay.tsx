import { ReactNode } from "react";

function Overlay({ children, setShowOverlay }: { children: ReactNode; setShowOverlay: (value: boolean) => void }) {
  return (
    <div className={`flex fixed z-20 h-screen w-full top-0 left-0 p-10 flex-col justify-center items-center`}>
      <div
        className="overlay bg-black opacity-85 absolute left-0 top-0 w-full h-full"
        onClick={() => {
          setShowOverlay(false);
        }}
      ></div>
      {children}
    </div>
  );
}

export default Overlay;
