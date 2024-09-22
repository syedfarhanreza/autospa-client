import { useRegisterCustomerMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { useAppDispatch } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  password: "",
  confirmPassword: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  firstName: Yup.string().required("* firstName is required"),
  lastName: Yup.string().required("* lastName is required"),
  address: Yup.string().required("* Address is required"),
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "* Passwords must match")
    .required("* Confirm password is required"),
});
const Register = () => {
  const [register] = useRegisterCustomerMutation();
  const [phone, setPhone] = useState<string>("");
  const [phoneErr, setPhoneErr] = useState("");
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleRegister = async (values: TFormValues) => {
    if (!phone) {
      return setPhoneErr("Contact number is required");
    }
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      return setPhoneErr("Invalid phone number");
    }
    const toastId = toast.loading("Please wait...");
    try {
      const { data } = await register({ ...values, phone });
      if (!data) {
        return toast.error("Something went wrong");
      }
      if (!data.success) {
        return toast.error(data.message);
      }

      const authData = {
        user: data.data,
      };
      dispatch(setUser(authData));
      Cookies.set("refreshToken", data.refreshToken, { expires: 30 });
      dispatch(setToken(data.accessToken || ""));
      toast.success("Successfully registered", {
        description: "Now please login",
      });
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[15px] py-[20px] bg-black">
      <div className="bg-gray-900 p-[25px]  max-w-xl shadow-md rounded-[12px]">
        <h2 className=" font-bold mb-6 text-left text-[35px] text-white">
          Create an Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Your FirstName
                </label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder={"your first name"}
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Your LastName
                </label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder={"Your last name"}
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@some.com"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Your Address
                </label>
                <Field
                  type="address"
                  name="address"
                  as={"textArea"}
                  placeholder="Your address"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none min-h-[100px]"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="mb-4 ">
                <label className="block text-white text-[18px] font-[600]">
                  Your phone Number
                </label>
                <PhoneInput
                  defaultCountry="BD"
                  international
                  placeholder="Enter your phone number"
                  onChange={(value) => setPhone(value as string)}
                  className={`mt-1 block w-full px-3 py-2 bg-white border border-borderColor rounded-md outline-none`}
                  style={phoneErr ? { border: "1px solid red" } : {}}
                />
                <p className="text-red-500 text-sm">{phoneErr}</p>
              </div>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-[18px] font-[600]">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full  py-[12px] rounded-[5px] font-bold bg-primaryMat border-2 border-black hover:bg-black hover:border-2 hover:border-primaryMat hover:text-primaryMat"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
        <div className="mt-6 text-start">
          <p className="text-white">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryMat">
              Login
            </Link>
          </p>
        </div>

        <p className="mt-4 text-white text-sm text-start">
          Note: Your personal data will be used to support your experience
          throughout this website, to manage access to your account, and for
          other purposes described in our privacy policy.
        </p>
      </div>
    </div>
  );
};

export default Register;
