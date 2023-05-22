export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col text-white text-2xl gap-4">
      <h1>Login</h1>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-700 py-1 px-1"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-700 py-1 px-1"
        />
        <button
          className="border-2 border-gray-400 text-xl py-1 hover:bg-gray-400 hover:text-gray-900 duration-300"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
