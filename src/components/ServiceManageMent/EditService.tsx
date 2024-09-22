import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateServiceMutation } from "@/redux/features/service/service.api";
import { IService } from "@/types/service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { PencilIcon } from "lucide-react";
import { toast } from "sonner";
import * as Yup from "yup";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export type TValues = {
  name: string;
  description: string;
  price: number;
  duration: number;
};
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  duration: Yup.string().required("duration is required"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
});

const EditService = ({ data }: { data: IService }) => {
  const [updateService] = useUpdateServiceMutation(undefined);
  const { _id, description, duration, name, price } = data;

  const initialValues = {
    name,
    description,
    price,
    duration,
  };

  console.log(data);

  const handleSubmit = async (values: TValues) => {
    const toastId = toast.loading("Please wait..");
    const btn = document.getElementById("close_service") as HTMLButtonElement;
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        duration: values.duration,
      };
      const res = await updateService({ payload, id: _id.toString() });

      toast.dismiss(toastId);
      if (!res.data?.success) {
        return toast.error("something went wrong while making this request", {
          description: "Please try agin",
        });
      }
      btn.click();
      toast.success("Successfully created service");
    } catch (error) {
      toast.dismiss(toastId);
      return toast.error("something went wrong while making this request", {
        description: "Please try agin",
      });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <PencilIcon className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Service Details</DialogTitle>
          <DialogDescription>
            Fill out the form to update service.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Field
                as={Input}
                id="name"
                name="name"
                placeholder="Enter service name"
                className="col-span-3"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-600 col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Enter service description"
                className="col-span-3"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-600 col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Field
                as={Input}
                id="duration"
                name="duration"
                type="number"
                className="col-span-3"
              ></Field>
              <ErrorMessage
                name="duration"
                component="div"
                className="text-red-600 col-span-4"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Field
                as={Input}
                id="price"
                name="price"
                type="number"
                placeholder="Enter service price"
                className="col-span-3"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-600 col-span-4"
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" id="close_service">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save Service</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditService;
