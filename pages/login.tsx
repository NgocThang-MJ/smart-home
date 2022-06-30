import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const loginEmail = "tnthangg@gmail.com";
  const loginPassword = "101190305";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (email == loginEmail && password == loginPassword) {
      localStorage.setItem("isAuth", "true");
      router.push("/");
    } else {
      setErr("Invalid Credentials");
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth");
    console.log(isAuth);
  }, []);

  return (
    <div className="bg-[#191925] min-h-screen">
      <div className="container">
        <div className="mx-auto pt-48 flex items-center justify-center">
          <div>
            <h1 className="text-5xl text-white mb-5">Login</h1>
            <div>
              <form>
                <label
                  htmlFor="email"
                  className="text-white text-lg block mb-1"
                >
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  className="rounded block mb-3 py-1 px-2"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label
                  htmlFor="password"
                  className="text-white text-lg block mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="rounded block py-1 px-2"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <p className="text-red-500 mt-3">{err}</p>
                <button
                  type="submit"
                  className="bg-green-500 py-2 px-4 rounded mt-3"
                  onClick={login}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
