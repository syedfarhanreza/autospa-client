import { CarIcon, BuildingIcon, WrenchIcon, MapPinIcon } from "lucide-react";

const InfoSection = () => {
  const infoData = [
    { id: 1, value: 480, label: "Crash Recover Car", icon: CarIcon },
    { id: 2, value: 460, label: "Auto Repair", icon: WrenchIcon }, // Changed label
    { id: 3, value: 700, label: "Vehicle Inspection", icon: MapPinIcon }, // Changed label and icon
    { id: 4, value: 970, label: "Branch City", icon: BuildingIcon },
  ];

  return (
    <div className="bg-gray-950 py-12 px-4 sm:px-6 lg:px-8  mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {infoData.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:bg-gray-900 hover:shadow-2xl"
            >
              <item.icon className="text-primaryMat h-12 w-12 mb-4 transition-transform duration-300 transform hover:scale-110" />
              {/* Value */}
              <h3 className="text-3xl font-bold text-white">{item.value}</h3>
              {/* Label */}
              <p className="text-lg text-gray-400 mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
