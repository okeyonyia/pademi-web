"use client";

import { useEffect, useState } from "react";
import LazyImg from "../common/lazyImage/page";

interface Testimonial {
  id: number;
  text: string;
  rating: number;
  author: string;
  role: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Intrinsicly facilitate functional imperatives without next-generation meta-services. Compellingly revolutionize worldwide users vis-a-vis enterprise best practices.",
    rating: 5,
    author: "Pirtle Karol",
    role: "ThemeTags",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZHnOcdajky3bhlgPIsZSC017jDnKVl.png",
  },
  {
    id: 2,
    text: "Interactively grow backend scenarios through one paradigms. Distinctively and communicate efficient information without effective meta-services.",
    rating: 5,
    author: "Aminul Islam",
    role: "ThemeTags",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZHnOcdajky3bhlgPIsZSC017jDnKVl.png",
  },
  {
    id: 3,
    text: "Intrinsicly facilitate functional imperatives without next-generation meta-services. Compellingly revolutionize worldwide users vis-a-vis enterprise best practices.",
    rating: 5,
    author: "Pirtle Karol",
    role: "ThemeTags",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZHnOcdajky3bhlgPIsZSC017jDnKVl.png",
  },
];

export default function TestimonialSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-50 py-24">
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <h2 className="heading text-center">TESTIMONIALS</h2>

        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-4 md:px-8">
              <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-sm">
                <p className="mb-6 text-lg text-gray-600">{testimonial.text}</p>

                <div className="mb-4 flex">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className="h-5 w-5 text-[#FF6B42]"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 overflow-hidden rounded-full">
                    <LazyImg
                      src={testimonial.image}
                      alt={testimonial.author}
                      placeholder={testimonial.author}
                      title={testimonial.author}
                      width={48}
                      height={48}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-semibold">5.0</span>
                      <span className="text-gray-500">BizBite</span>
                    </div>
                    <div className="mt-1">
                      <h4 className="font-semibold">{testimonial.author}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? "bg-[#FF6B42] w-4" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
