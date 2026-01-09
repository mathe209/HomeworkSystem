import Navbar from '../components/navbar';

export default function Success() {
  return (
    <div className="min-h-screen bg-gray-50 mt-15">
      <Navbar />
      <main className="container px-4 py-6 mx-auto max-w-4xl">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="p-8 w-full max-w-md bg-green-100 rounded-lg border border-green-400">
            <div className="flex justify-center items-center mx-auto mb-4 w-16 h-16 bg-green-500 rounded-full">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="mb-4 text-2xl font-bold text-green-800">
              Registration Successful!
            </h1>
            <p className="mb-6 text-green-700">
              Thank you for registering for being a member at Evolved Mentality. Your
              information has been successfully submitted.
            </p>
            <div className="space-y-3">
              <a
                href="/"
                className="block px-6 py-3 w-full font-semibold text-white bg-blue-500 rounded-lg transition-colors duration-200 hover:bg-blue-600"
              >
                Go to Home Page
              </a>
              <a
                href="/mentorship"
                className="block px-6 py-3 w-full font-semibold text-white bg-gray-500 rounded-lg transition-colors duration-200 hover:bg-gray-600 muted"
              >
                Go to Mentorship Page
              </a>
            </div>
          </div>

          <div className="p-6 w-full max-w-md bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="mb-3 text-lg font-semibold text-blue-800">
              What's Next?
            </h2>
            <ul className="space-y-2 text-left text-blue-700">
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Check your email for confirmation
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Access your Membership Package
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-blue-500">•</span>
                Join the program community
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
