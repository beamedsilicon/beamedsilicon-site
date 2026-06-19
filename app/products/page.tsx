import React from "react";

interface Industry {
  id: number;
  name: string;
  description: string;
  applications: string[];
}

const industries: Industry[] = [
  {
    id: 1,
    name: "Automotive",
    description:
      "High-performance chips and ICs powering modern vehicles and mobility solutions.",
    applications: [
      "ADAS Systems",
      "Electric Vehicles (EV)",
      "Battery Management",
      "Infotainment Systems",
      "Engine Control Units",
    ],
  },
  {
    id: 2,
    name: "Industrial Automation",
    description:
      "Reliable semiconductor solutions for smart factories and industrial control systems.",
    applications: [
      "PLC Controllers",
      "Robotics",
      "Motor Drives",
      "Industrial Sensors",
      "Factory Automation",
    ],
  },
  {
    id: 3,
    name: "Consumer Electronics",
    description:
      "Efficient ICs designed for next-generation consumer devices.",
    applications: [
      "Smartphones",
      "Wearables",
      "Smart Home Devices",
      "Gaming Systems",
      "Audio Equipment",
    ],
  },
  {
    id: 4,
    name: "Healthcare",
    description:
      "Precision chips and integrated circuits for medical technologies.",
    applications: [
      "Patient Monitoring",
      "Medical Imaging",
      "Diagnostic Equipment",
      "Portable Medical Devices",
      "Telehealth Solutions",
    ],
  },
  {
    id: 5,
    name: "Telecommunications",
    description:
      "Advanced semiconductor solutions enabling high-speed connectivity.",
    applications: [
      "5G Infrastructure",
      "Networking Equipment",
      "Fiber Optics",
      "Data Transmission",
      "Wireless Communication",
    ],
  },
  {
    id: 6,
    name: "Aerospace & Defense",
    description:
      "Rugged and reliable ICs for mission-critical systems.",
    applications: [
      "Navigation Systems",
      "Radar Systems",
      "Satellite Communications",
      "Flight Control",
      "Defense Electronics",
    ],
  },
];

const ProductsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <h1 className="text-5xl font-bold mb-4">
            Semiconductor Solutions
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            High-performance Chips and Integrated Circuits powering innovation
            across industries worldwide.
          </p>
        </div>
      </section>

      {/* Product Overview */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold mb-6">
            Our Product Portfolio
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-2xl font-semibold mb-3">
                Semiconductor Chips
              </h3>
              <p className="text-gray-600">
                High-performance processing, memory, and communication chips
                designed for reliability, efficiency, and scalability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="text-2xl font-semibold mb-3">
                Integrated Circuits (ICs)
              </h3>
              <p className="text-gray-600">
                Analog, digital, mixed-signal, power management, and custom IC
                solutions for diverse industrial requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="text-3xl font-bold mb-10">
            Industries We Serve
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <div
                key={industry.id}
                className="border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {industry.name}
                </h3>

                <p className="text-gray-600 mb-4">
                  {industry.description}
                </p>

                <h4 className="font-medium mb-2">
                  Applications
                </h4>

                <ul className="space-y-2">
                  {industry.applications.map((app) => (
                    <li
                      key={app}
                      className="text-sm text-gray-700 flex items-center"
                    >
                      <span className="mr-2">•</span>
                      {app}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Looking for Custom Semiconductor Solutions?
          </h2>
          <p className="text-gray-300 mb-8">
            Our team can help identify the right chips and ICs for your
            application and industry requirements.
          </p>

          <button className="bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;