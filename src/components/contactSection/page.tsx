import { useState, type FormEvent } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <section className="w-full py-16 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
        <div className="bg-gray-100 py-8 px-4 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Ready to get started?</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Enter name"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
              <input
                type="text"
                placeholder="Your Company"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />
            </div>
            <textarea
              placeholder="Message"
              rows={6}
              className="w-full px-4 py-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
            />
            <button
              type="submit"
              className="px-8 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="space-y-12 px-4">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Looking for a excellent Business idea?
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Seamlessly deliver pandemic e-services and next-generation
              initiatives.
            </p>
            <button className="px-8 py-3 border-2 border-purple-500 text-purple-500 rounded-full hover:bg-purple-500 hover:text-white transition-colors duration-300">
              Get Directions
            </button>
          </div>

          <div className="space-y-6">
            <h3 className="subheading">Our Headquarters</h3>
            <div className="space-y-2">
              <p className="subdescription">100 Yellow House, Mn</p>
              <p className="subdescription">Factory, United State, 13420</p>
            </div>
            <div className="space-y-2">
              <p className="subdescription">Phone: +123456789123</p>
              <p className="subdescription">
                Email:{" "}
                <a
                  href="mailto:email@yourdomain.com"
                  className="text-purple-500 hover:underline"
                >
                  email@yourdomain.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
