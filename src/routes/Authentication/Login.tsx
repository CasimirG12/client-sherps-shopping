import React, { useState } from "react";
import { useAuthContext } from "../../context/authContext";

const Login = () => {
  const { login, authError, setAuthError } = useAuthContext();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const resetError = () => {
    setAuthError(null);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(input.email, input.password);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="w-screen h-screen bg-gradient-to-tr from-slate-600 to-slate-800 flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col items-center gap-3 w-11/12 bg-slate-200 p-4 shadow-md shadow-slate-900 rounded-sm"
      >
        <p className="font-bold text-xl">Welcome to Sherp's Shopping</p>
        <input
          type="text"
          placeholder="Put in your email..."
          value={input.email}
          onChange={(e) => onChange(e)}
          name="email"
          className="bg-slate-300 w-11/12 py-2 px-2"
          onFocus={() => resetError()}
        />
        <input
          type="password"
          placeholder="Put in your password..."
          value={input.password}
          onChange={(e) => onChange(e)}
          name="password"
          className="bg-slate-300 w-11/12 py-2 px-2"
          onFocus={() => resetError()}
        />
        {authError && (
          <div className="border-red-800 border px-4 py-2 text-red-800 bg-red-300">
            {authError}
          </div>
        )}
        <button
          type="submit"
          className="bg-cyan-300 py-2 px-6 active:scale-95 duration-200 rounded-md font-bold"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
