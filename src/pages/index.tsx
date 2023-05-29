export default function Home() {
  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col text-white text-2xl gap-4">
      <h1>Login</h1>
      <form className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-100 py-1 px-1 rounded-md text-gray-900"
        />
        <input
          type="password"
          placeholder="Password"
          className="bg-gray-100 py-1 px-1 rounded-md text-gray-900"
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
