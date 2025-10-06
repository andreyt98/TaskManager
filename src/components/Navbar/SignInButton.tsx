// import { RootState } from "@/store";
// import { useDispatch, useSelector } from "react-redux";
// import { setAuthModalActive, setNoAccount } from "@/store/slices/UISlice";

function SignInButton() {
  // const { authModalActive } = useSelector((state: RootState) => state.ui);
  // const dispatch = useDispatch();

  return (
    <button
      className="btn-primary"
      onClick={() => {
        // dispatch(setNoAccount(false));
        // dispatch(setAuthModalActive(!authModalActive));
      }}
    >
      <p className="font-semibold">Sign in</p>
    </button>
  );
}

export default SignInButton;
