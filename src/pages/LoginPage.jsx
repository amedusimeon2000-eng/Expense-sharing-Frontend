import { useState } from "react";

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(form);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="relative inline-block text-[30px] font-semibold mt-5 mb-2.5 before:absolute before:-bottom-1 before:left-0 before:h-[5px] before:w-[50px] before:rounded-md before:bg-gradient-to-r before:from-red-500 before:to-red-500 before:content-['']">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>

            {/* Fix: the underline was breaking out because it was positioned without a stable parent container. */}
            {/* I wrapped the input and both underline lines in a relative div so the red line stays inside the input width and scales correctly. */}
            <div className="relative">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="JohnDoe@mail.com"
                required
                className="peer w-full h-[45px] text-[16px] border-0 border-b border-gray-300 bg-transparent outline-none"
              />
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300" />
              <span className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 bg-red-500 transition-transform duration-500 peer-focus:scale-x-100 peer-focus:origin-left" />
            </div>
            <label className="block my-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="min 6 letters"
                required
                className="peer w-full h-[45px] text-[16px] border-0 border-b border-gray-300 bg-transparent outline-none"
              />
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-gray-300" />
              <span className="absolute left-0 bottom-0 h-[2px] w-full origin-right scale-x-0 bg-red-500 transition-transform duration-500 peer-focus:scale-x-100 peer-focus:origin-left" />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-gradient-to-r from-red-500 to-blue-600 px-4 py-2 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:bg-blue-700 hover:shadow-lg"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
