import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authContext";
import { useNavigate } from "react-router";
import ActivityIndicator from "../../components/ActivityIndicator";
import AnimatedButton from "../../components/AnimatedButton";
import Input from "../../components/Input";

const Login = () => {
  const { login, authError, setAuthError, fetchUser, user } = useAuthContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await fetchUser();
      setLoading(false);
    };
    fetch();
    if (user) {
      navigate("/home");
    }
  }, [user]);

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
    <div className="w-screen h-screen bg-gradient-to-tr from-cyan-500 to-gray-800 flex flex-col items-center justify-center">
      <form
        onSubmit={(e) => onSubmit(e)}
        className="flex flex-col items-center gap-3 w-11/12 lg:w-1/4 bg-gray-600 p-4 shadow-md shadow-slate-900 rounded-lg"
      >
        {!loading ? (
          <>
            <p className="font-bold text-white text-xl">
              Welcome to Sherp's Shopping
            </p>
            <hr style={{ width: "100%" }} />
            <Input
              labelBackground="bg-gray-600"
              type="email"
              placeholder="Put in your email..."
              value={input.email}
              onChange={(e) => onChange(e)}
              name="email"
              onFocus={() => resetError()}
              inputName="Email Address"
            />
            <Input
              type="password"
              placeholder="Put in your password..."
              value={input.password}
              onChange={(e) => onChange(e)}
              name="password"
              onFocus={() => resetError()}
              labelBackground="bg-gray-600"
              inputName="Password"
            />
            {authError && (
              <div className="border-red-800 border px-4 py-2 text-red-800 bg-red-300">
                {authError}
              </div>
            )}
            <div className="flex flex-row w-full justify-evenly">
              <AnimatedButton
                type="submit"
                className="border border-white text-white py-2 px-6 active:scale-95 duration-200 rounded-full font-bold"
              >
                Log in
              </AnimatedButton>
              <AnimatedButton
                type="button"
                className="bg-cyan-500 text-white py-2 px-6 active:scale-95 duration-200 rounded-full font-bold"
              >
                Sign up
              </AnimatedButton>
            </div>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </form>
    </div>
  );
};

export default Login;
