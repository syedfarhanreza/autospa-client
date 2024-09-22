import {
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { AlertCircleIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useDeleteServiceMutation } from "@/redux/features/service/service.api";

const DeleteService = ({ id }: { id: string }) => {
  const [deleteService] = useDeleteServiceMutation();
  const handleDelete = async () => {
    const toastId = toast.loading("Please wait...");
    const modalCloseBtn = document.getElementById(
      "delete-modal-close"
    ) as HTMLElement;

    try {
      const { data } = await deleteService(id);
      if (!data) {
        toast.dismiss(toastId);

        return toast.error("An unknown error occurred");
      }
      if (!data.success) {
        toast.dismiss(toastId);

        return toast.error(data.message || "Failed to delete product");
      }
      toast.dismiss(toastId);

      modalCloseBtn.click();
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="rounded-full">
          <TrashIcon className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <AlertCircleIcon className="size-12 text-red-500" />
          <div className="space-y-2 text-center">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the
              selected item.
            </DialogDescription>
          </div>
        </div>
        <DialogFooter>
          <div>
            <DialogClose asChild>
              <Button variant="outline" id="delete-modal-close">
                Cancel
              </Button>
            </DialogClose>
          </div>
          <Button variant="destructive" onClick={handleDelete}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteService;
