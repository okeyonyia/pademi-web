import { BiCalendar, BiCoffee, BiLink, BiMessageSquare } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

export default function FeaturesSection() {
  const FeaturesData = [
    {
      icon: <BiCalendar className="w-6 h-6 text-purple-600" />,
      title: "Find Events & Activities",
      description:
        "Explore local gatherings—from brunches to networking mixers—and join people who share your interests. Skip idle swiping; embrace real-life meetups.",
      color: "#E9D5FF",
    },
    {
      icon: <BiCoffee className="w-6 h-6 text-blue-600" />,
      title: "1-on-1 Hangouts",
      description:
        "Reserve a spot, invite someone special, and sweeten it with money for transport or a thoughtful gesture. Funds stay secure until the hangout ends.",
      color: "#DBEAFE",
    },
    {
      icon: <FaUsers className="w-6 h-6 text-pink-600" />,
      title: "User-Driven Matchmaking",
      description:
        "Your friends know you best—on Pademi, they can set you up for romance or business. Every match is rooted in real connections.",
      color: "#FCE7F3",
    },
    {
      icon: <BiMessageSquare className="w-6 h-6 text-indigo-600" />,
      title: "No Endless Messaging",
      description:
        "Conversation is only enabled if you share an event or hangout—no more chatting that goes nowhere. Every text leads to a real-life meetup.",
      color: "#E0E7FF",
    },
    {
      icon: <BiLink className="w-6 h-6 text-violet-600" />,
      title: "Link in Bio Integration",
      description:
        "Connect your IG, then add your Pademi link to your profile. That way, friends can tap to invite you directly to events—so you never miss out.",
      color: "#EDE9FE",
    },
  ];

  return (
    <section
      id="features"
      className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-50 to-blue-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Key Features & Benefits
          </h2>
          <p className="text-lg text-gray-600">
            Discover how our platform transforms online connections into
            meaningful real-life relationships
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {FeaturesData.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden z-10"
            >
              <div className="flex items-center mb-6">
                <div className="flex items-start">
                  <div
                    className={`p-3 rounded-xl group-hover:bg-[${feature.color}] transition-colors`}
                    style={{ backgroundColor: feature.color }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="ml-4 subheading text-gray-900">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="subdescription text-gray-600 leading-relaxed">
                {feature.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 w-0 group-hover:w-full transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-80 h-80 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-multiply opacity-10 animate-blob" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply opacity-10 animate-blob animation-delay-2000" />
    </section>
  );
}
