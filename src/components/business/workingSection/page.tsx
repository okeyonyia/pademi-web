"use client";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Join the Waitlist",
      description: "Set up an account in seconds and share your interests.",
      dotColor: "bg-[#ff4d4d]",
    },
    {
      number: "2",
      title: "Discover & Match",
      description:
        "Browse local events or let your friends match you with someone they know. Perfect for dating, networking, or just having fun.",
      dotColor: "bg-[#ffb84d]",
    },
    {
      number: "3",
      title: "Invite & Butter-Up",
      description:
        "Send an invite with location and date/time, attach funds if you'd like, and finalize the hangout details.",
      dotColor: "bg-[#4dff4d]",
    },
    {
      number: "4",
      title: "Meet Offline & Enjoy",
      description:
        "Chat only unlocks if you share a confirmed event or hangout, ensuring every conversation translates into real-time experiences.",
      dotColor: "bg-[#4d4dff]",
    },
    {
      number: "5",
      title: "Add Your Link in Bio",
      description:
        "Place your personalized Pademi link on Instagram or other social profiles—friends can click and invite you instantly.",
      dotColor: "bg-[#9933ff]",
      optional: true,
    },
  ];

  return (
    <div
      id="how-it-works"
      className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-purple-100 px-4 sm:px-6 lg:px-8 py-24"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
          How It Works
        </h1>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-200 to-purple-200 z-0" />

          <div className="space-y-12 relative">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-6 group">
                <div className="flex-shrink-0 select-none w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center text-2xl font-bold  border-2 border-transparent hover:border-purple-300 transition-all duration-300">
                  {step.number}
                </div>
                <div className="flex-grow bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${step.dotColor}`} />
                    <h2 className="subheading text-gray-800">{step.title}</h2>
                  </div>
                  <p className="subdescription text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
