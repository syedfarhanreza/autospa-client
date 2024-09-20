import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
const DeleteService = () => {
  return (
    <Button variant="outline" size="icon" className="rounded-full">
      <TrashIcon className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  );
};
export default DeleteService;
