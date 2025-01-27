import LazyImg from "@/components/common/lazyImage/page";

export default function AboutFoundersSection() {
  return (
    <section className="bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative">
        <h2 className="text-4xl font-extrabold text-white sm:text-5xl text-center mb-12 tracking-tight">
          Visionaries Behind{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Pademi
          </span>
        </h2>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300">
          <div className="md:flex items-stretch">
            <div className="md:w-1/2 relative">
              <LazyImg
                className="h-full w-full object-cover"
                src="/placeholder.svg?height=600&width=600" // Add real Image of Founders
                alt="Founders"
                placeholder={"Founders"}
                title="Founders"
                width={600}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold">Sarah & Michael</h3>
                <p className="text-sm mt-2">
                  Co-founders, Relationship Innovators
                </p>
              </div>
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-600 bg-opacity-20 text-indigo-300 text-sm font-semibold tracking-wide uppercase">
                  Our Vision
                </div>
                <p
                  className="subdescription leading-relaxed"
                  style={{ color: "#d1d5db" }}
                >
                  Wer&apos;e a husband-and-wife team who first met on a dating
                  app. Weeks of endless chat led nowhere—until we finally met in
                  person and felt the spark. Now, with two wonderful boys and a
                  passion for genuine connection, we created Pademi to help
                  people skip the small talk and jump straight into real-life
                  experiences.
                </p>
                <blockquote className="text-xl italic font-semibold text-purple-300 border-l-4 border-purple-500 pl-4">
                  &quot;In a world of endless scrolling, we&apos;re bringing
                  back the magic of real-world connections.&quot;
                </blockquote>
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 bg-opacity-20">
                      <svg
                        className="h-6 w-6 text-purple-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-medium text-gray-200 truncate">
                      10,000+ Connections
                    </p>
                    <p className="text-sm text-gray-400 truncate">
                      Made through Pademi
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200">
                  Join Our Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
