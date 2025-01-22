import Image from "next/image";
import featureSection from "@/assets/images/featureSection.png";
import { features } from "@/constant";

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white">
      <div className="py-24 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-12">
          <h2 className="heading">Why Pademi for Teams?</h2>
          {/* <p className="text-gray-600 max-w-3xl mx-auto">
          Objectively deliver professional value with diverse web-readiness.
          Collaboratively transition wireless customer service without
          goal-oriented catalysts for change. Collaboratively.
        </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-8">
            {features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={`${feature.iconBg} w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="subheading">{feature.heading}</h3>
                  <p className="subdescription text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-[600px] mx-auto w-full max-w-[300px]">
            <Image
              src={featureSection}
              alt="Mobile app interface"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-8">
            {features.slice(3).map((feature, index) => (
              <div key={index} className="flex gap-4">
                <div
                  className={`${feature.iconBg} w-12 h-12 flex items-center justify-center rounded-lg flex-shrink-0`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <div>
                  <h3 className="subheading">{feature.heading}</h3>
                  <p className="subdescription text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
