function LandingPage() {
  return (
    <div className="rounded-lg h-screen text-center text-black w-full flex flex-col items-center justify-start gap-4 p-2 landing">
      <div>
        <h1 className=" md:text-[240%] tracking-tight leading-tight text-pretty font-semibold text-xl">Simplify your task management</h1>
        <p className="max-md:text-[85%]">
          Organize, prioritize and focus, <br /> all in one workplace.
        </p>
      </div>

      {/* <div className="border-2 border-red-200 h-72 w-[75%] "> */}
      {/* image here */}
      <img className="lg:w-1/3" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs_webp/9d4b93179374693.64f87fe05aa79.png" alt="" />
      {/* </div> */}

      <div className="flex-row-center gap-4">
        <button type="button" className="btn-secondary">
          Go to App
        </button>
        <button type="button" className="btn-primary">
          Sign up
        </button>
      </div>

      <span className="text-[65%] text-center mt-2">
        <span className="font-semibold">Disclaimer: </span>
        If you sign up you will be using a dedicated database.
        <br />
        Otherwise, browser{`'`}s memory will be used to saved your data.
      </span>
    </div>
  );
}

export default LandingPage;
