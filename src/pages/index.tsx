import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { clientCredentials } from "@config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const app = initializeApp(clientCredentials);
const auth = getAuth(app);

export default function Home() {
  const router = useRouter();
  const [error, setError] = useState("");

  const [user, loading, errorTemp] = useAuthState(auth);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        router.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      });
  }

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col text-white text-2xl gap-4">
      <h1>Login</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        {error !== "" && (
          <div className="text-red-500 text-lg w-full text-center">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="bg-gray-100 py-1 px-1 rounded-md text-gray-900"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="bg-gray-100 py-1 px-1 rounded-md text-gray-900"
          required
        />
        <button
          className="border-2 border-gray-100 rounded-md text-xl py-1 hover:bg-gray-100 hover:text-gray-900 duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
