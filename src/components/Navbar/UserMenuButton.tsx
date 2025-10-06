// import { Context } from "@/context/Context";
// import { auth } from "@/firebase/firebase.config";
// import { RootState } from "@/store";
import { useContext } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setShowSearchBar, setUserMenuActive, setOpenUserDrawer } from "@/store/slices/UISlice";

function UserMenuButton() {
  // const { showSearchBar, userMenuActive } = useSelector((state: RootState) => state.ui);
  // const { firebaseActiveUser } = useSelector((state: RootState) => state.auth);

  // const dispatch = useDispatch();

  return (
    <button
      // className={`w-[2rem] h-[2rem] rounded-full font-semibold  ${userMenuActive ? "bg-brand-primary/80" : "bg-gray-800"} lg:hover:bg-brand-primary/80`}
      className={`w-[2rem] h-[2rem] rounded-full font-semibold text-white ${"userMenuActive" == "userMenuActive" ? "bg-brand-primary/80" : "bg-gray-800"} lg:hover:bg-brand-primary/80`}
      onClick={() => {
        // if (isMobilePWA) {
        //   dispatch(setOpenUserDrawer(true));
        // } else {
        //   if (showSearchBar) dispatch(setShowSearchBar(false));
        //   dispatch(setUserMenuActive(!userMenuActive));
        // }
      }}
      title="user-option"
    >
      {/* <span className="text-xl">{auth.currentUser?.displayName?.slice(0, 1).toUpperCase() || firebaseActiveUser?.email?.slice(0, 1).toUpperCase()}</span> */}
      <span className="text-xl">{"auth.currentUser?.displayName?".slice(0, 1).toUpperCase() || "firebaseActiveUser?.email?".slice(0, 1).toUpperCase()}</span>
    </button>
  );
}

export default UserMenuButton;
