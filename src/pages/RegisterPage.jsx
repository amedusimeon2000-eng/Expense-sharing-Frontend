// This register page mirrors the same auth-card design as the login screen so the website feels consistent.
// The goal is a clean, modern form with a red accent line and matching hover states.
const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="relative inline-block text-[30px] font-semibold mt-5 mb-2.5 before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-[50px] before:rounded-md before:bg-gradient-to-r before:from-red-500 before:to-red-500 before:content-['']">
          Register
        </h1>

        <form className="space-y-6 mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <div className="relative">
              <input
                type="text"
                placeholder="John Doe"
                className="peer w-full h-[45px] text-[16px] border-0 border-b border-gray-300 bg-transparent outline-none"
              />
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300" />
              <span className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 bg-red-500 transition-transform duration-500 peer-focus:scale-x-100 peer-focus:origin-left" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                className="peer w-full h-[45px] text-[16px] border-0 border-b border-gray-300 bg-transparent outline-none"
              />
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300" />
              <span className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 bg-red-500 transition-transform duration-500 peer-focus:scale-x-100 peer-focus:origin-left" />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="••••••••"
                className="peer w-full h-[45px] text-[16px] border-0 border-b border-gray-300 bg-transparent outline-none"
              />
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300" />
              <span className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 bg-red-500 transition-transform duration-500 peer-focus:scale-x-100 peer-focus:origin-left" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-gradient-to-r from-red-500 to-blue-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
