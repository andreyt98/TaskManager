function LandingPage() {
  return (
    <div className="rounded-lg text-center text-black w-full flex-col-center gap-2 p-2 landing">
      <h1 className="md:text-[240%] tracking-tight leading-tight text-pretty font-semibold text-xl">
        Simplify your task management <br /> with Clarity
      </h1>
      <p className="">Organize, prioritize and focus - all in one workplace</p>

      {/* <div className="border-2 border-red-200 h-72 w-[75%] "> */}
      {/* image here */}
      <img src="https://i.pinimg.com/736x/5e/97/aa/5e97aa3af68b934d0fdb14c1c894bbbf.jpg" alt="" />
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
