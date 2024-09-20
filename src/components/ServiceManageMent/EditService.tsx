import { PencilIcon } from "lucide-react";
import { Button } from "../ui/button";
const EditService = () => {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <PencilIcon className="h-4 w-4" />
      <span className="sr-only">Edit</span>
    </Button>
  );
};
export default EditService;
