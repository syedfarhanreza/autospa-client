export type TFeaturedService = {
  name: string;
  image: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
  id: string;
};
export const serviceData = [
  {
    id: "101",
    name: "Exterior Detailing",
    image: "/images/exterior-detailing.jpg",
    description:
      "A 45-minute session to deeply clean and polish your car’s exterior. This service includes hand washing, waxing, and light scratch removal to restore the vehicle's shine and protect the paint.",
    price: 70,
    duration: 45,
    isDeleted: false,
  },
  {
    id: "202",
    name: "Interior Detailing",
    image: "/images/interior-detailing.jpeg",
    description:
      "A 90-minute session for thorough cleaning of the car's interior, including vacuuming, upholstery shampooing, and dashboard conditioning. This service ensures a fresh and clean driving experience.",
    price: 180,
    duration: 90,
    isDeleted: false,
  },
  {
    id: "303",
    name: "Engine Diagnostic",
    image: "/images/engine-diagnostic.jpg",
    description:
      "A 60-minute session to diagnose engine performance issues. Our experts will use advanced tools to check for any faults, analyze the problem, and recommend repairs or adjustments.",
    price: 120,
    duration: 60,
    isDeleted: false,
  },
  {
    id: "404",
    name: "Oil Change Service",
    image: "/images/oil-change-service.jpg",
    description:
      "A quick 25-minute oil change service to keep your engine running smoothly. Includes an oil filter replacement and inspection of fluid levels.",
    price: 40,
    duration: 25,
    isDeleted: false,
  },
  {
    id: "505",
    name: "Battery Testing",
    image: "/images/battery-testing.jpg",
    description:
      "A 45-minute service to test the health and performance of your car battery. We will ensure that the battery is in optimal condition or recommend a replacement if necessary.",
    price: 60,
    duration: 45,
    isDeleted: false,
  },
  {
    id: "606",
    name: "Tire Rotation Service",
    image: "/images/tire-rotation.jpeg",
    description:
      "A 30-minute tire rotation service to ensure even wear and extend the life of your tires. This service helps improve vehicle handling and fuel efficiency.",
    price: 50,
    duration: 30,
    isDeleted: false,
  },
];
