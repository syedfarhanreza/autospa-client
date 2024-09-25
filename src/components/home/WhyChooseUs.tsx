import {
  UserCheckIcon,
  WrenchIcon,
  DollarSignIcon,
  CarIcon,
  TruckIcon,
} from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    { id: 1, label: "Expertise and Experience", icon: UserCheckIcon },
    { id: 2, label: "Skilled Technicians", icon: WrenchIcon },
    { id: 3, label: "Financing Available", icon: DollarSignIcon },
    { id: 4, label: "Vacuum and Hand Car Wash", icon: CarIcon },
    { id: 5, label: "Free Pick Up & Drop", icon: TruckIcon },
  ];

  return (
    <section className="bg-gray-950 py-16 px-4 mb-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          <span className="text-primaryMat">Why</span> Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {reasons.map((reason) => (
            <div
              key={reason.id}
              className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              {/* Icon */}
              <reason.icon className="text-primaryMat h-12 w-12 mb-4 transition-transform duration-300 transform hover:scale-110" />
              {/* Label */}
              <h3 className="text-xl font-bold text-white mt-2">
                {reason.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
