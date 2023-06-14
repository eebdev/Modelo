export default function Footer() {
  return (
    <footer className="border-t border-modelo-yellow shadow">
      <div className="container max-w-md mx-auto flex py-8">
        <div className="w-full mx-auto flex flex-wrap">
          <div className="flex w-full md:w-1/2 ">
            <div className="px-8">
              <h3 className="font-bold text-modelo-yellow">About</h3>
              <p className="py-4 text-modelo-brown text-sm">
                IWA Copyright 2023
              </p>
            </div>
          </div>

          <div className="flex w-full md:w-1/2">
            <div className="px-8">
              <h3 className="font-bold text-modelo-yellow">Social</h3>
              <ul className="list-reset items-center text-sm pt-3">
                <li>
                  <a
                    className="inline-block text-modelo-brown no-underline hover:text-modelo-yellow hover:text-underline py-1"
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-modelo-brown no-underline hover:text-modelo-yellow hover:text-underline py-1"
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    className="inline-block text-modelo-brown no-underline hover:text-modelo-yellow hover:text-underline py-1"
                    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                    target="_blank"
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
