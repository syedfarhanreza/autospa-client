import { IService } from "@/types/service";
import { WashingMachineIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "../ui/card";

const ServiceCard = ({ service }: { service: IService }) => {
  return (
    <Card className="w-full max-w-sm p-6 grid gap-4">
      <div className="flex items-start gap-4">
        <div className="bg-primary rounded-md p-3 flex items-center justify-center">
          <WashingMachineIcon className="w-6 h-6 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-semibold">{service.name}</h3>
      </div>
      <p className="text-muted-foreground h-[48px] truncate overflow-hidden whitespace-pre-wrap">
        {service.description}...
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="grid gap-1">
          <div className="text-sm font-medium">Price</div>
          <div className="text-2xl font-bold">${service.price}</div>
        </div>
        <div className="grid gap-1">
          <div className="text-sm font-medium">Duration</div>
          <div className="text-2xl font-bold text-primaryMat">
            {service.duration} mins
          </div>
        </div>
      </div>
      <Link
        to={`/service/${service._id}`}
        className="w-full bg-primaryMat text-white hover:bg-primary py-[8px] text-center rounded-[8px]"
      >
        Book Now
      </Link>
    </Card>
  );
};

export default ServiceCard;
