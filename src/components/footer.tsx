export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-400 shadow">
      <div className="container max-w-md mx-auto flex py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full md:w-1/2 ">
            <div className="px-8">
              <h3 className="font-bold text-gray-100">About</h3>
              <p className="py-4 text-gray-600 text-sm">IWA Copyright 2023</p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2">
            <div className="px-8">
              <h3 className="font-bold text-gray-100">Social</h3>
              <ul className="list-reset items-center text-sm pt-3">
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1"
                    href="#"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1"
                    href="#"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-gray-600 no-underline hover:text-gray-100 hover:text-underline py-1"
                    href="#"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
