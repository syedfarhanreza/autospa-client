/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useUpdateUserImageMutation,
  useUpdateUserInfoMutation,
} from "@/redux/features/auth/user.api";
import { useAppSelector } from "@/redux/hooks";
import { TUser } from "@/types/user";
import { local_img_url } from "@/utils/localImageURL";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { UploadIcon } from "lucide-react";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required("* First Name is required"),
  lastName: Yup.string().required("* Last Name is required"),
  image: Yup.mixed().optional(),
});
type Image = { image: string | File | null | undefined };

const UpdateProfileInfo = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { firstName, lastName, image } = user as TUser;
  const initialValues = {
    firstName,
    lastName,
    image: "",
  };
  type FormValues = typeof initialValues & Image;
  type key = keyof Pick<FormValues, "firstName" | "lastName">;
  const [profileUrl, setProfileUrl] = useState(image || "/images/avatar.jpg");

  // mutation
  const [updateDetails] = useUpdateUserInfoMutation();
  const [updateProfileImage] = useUpdateUserImageMutation();

  const onSubmit = async (values: FormValues) => {
    const toastId = toast.loading("Please wait");
    const payload: Record<string, any> = {};

    const { image, ...newRest } = values;
    const { image: img, ...oldrest } = initialValues;

    const newValues = Object.entries(newRest);

    newValues.forEach(([key, value]) => {
      if (oldrest[key as key] !== value) {
        payload[key] = value;
      }
    });
    try {
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        await updateProfileImage(formData);
      }

      if (!Object.keys(payload).length) {
        toast.dismiss(toastId);
        return;
      }
      toast.success("Profile updated");
      await updateDetails(payload);
      toast.dismiss(toastId);
    } catch (error) {
      toast.dismiss(toastId);

      console.log(error);
      toast.error("Something went wrong while updating your details");
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleMakeProfilePreviewUrl = async (file: File) => {
    const url = await local_img_url(file);
    setProfileUrl(url);
  };

  return (
    <div className="w-full">
      <h1 className="text-[25px] font-[600] mb-[20px]">Update Information</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Label
                  htmlFor={"image"}
                  className="w-[120px] h-[120px] rounded-full overflow-hidden bg-[whitesmoke] relative group/profile border-[1px] border-borderColor p-[3px]"
                >
                  <img
                    src={profileUrl}
                    alt="avatar"
                    className=" w-full h-full object-cover rounded-full"
                  />

                  <span className="absolute top-0 left-0 bg-[#2727272f] w-full h-full scale-0 group-hover/profile:scale-[1] duration-75 rounded-full cursor-pointer center text-white">
                    <FaPen />
                  </span>
                </Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  className="invisible w-0"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    if (file) {
                      setFieldValue("image", file);
                      handleMakeProfilePreviewUrl(file);
                    }
                  }}
                />
                <ErrorMessage
                  name="image"
                  component="div"
                  className="text-red-500 text-sm mt-[5px]"
                />
                <label
                  htmlFor="image"
                  className="p-[10px] border-[1px] border-borderColor rounded-[8px]"
                >
                  <UploadIcon className="h-4 w-4" />
                </label>
              </div>
            </div>

            <div className="mb-4">
              <Label htmlFor="firstName">First Name *</Label>
              <Field
                as={Input}
                type="text"
                name="firstName"
                className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
              />
              <ErrorMessage
                name="firstName"
                component="div"
                className="text-red-500 text-sm mt-[5px]"
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="lastName">Last Name *</Label>
              <Field
                type="text"
                as={Input}
                name="lastName"
                className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
              />
              <ErrorMessage
                name="lastName"
                component="div"
                className="text-red-500 text-sm mt-[5px]"
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="lastName">Email</Label>
              <Input
                readOnly
                value={user?.email}
                className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none bg-[whitesmoke] cursor-not-allowed"
              />
            </div>

            <Button
              type="submit"
              className="bg-primaryMat text-white w-[100px]"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default UpdateProfileInfo;
