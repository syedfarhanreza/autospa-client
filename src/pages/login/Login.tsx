"use client";
import { useLoginUserMutation } from "@/redux/features/auth/auth.api";
import { setToken, setUser } from "@/redux/features/auth/auth.slice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { LogIn } from "lucide-react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
  password: "",
};
type TFormValues = typeof initialValues;
const validationSchema = Yup.object({
  email: Yup.string()
    .email("* Invalid email address")
    .required("* Email is required"),
  password: Yup.string().required("* Password is required"),
});
const Login = () => {
  const [login] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const redirect = Cookies.get("redirect");
  const handleLogin = async (values: TFormValues) => {
    const toastId = toast.loading("Please wait...");
    try {
      const { data, error: err } = await login(values);
      const error: any = err;
      if (error) {
        if (error.status === 401) {
          return toast.error("password didn't matched", {
            description: "try to remember your password and try again",
          });
        }
        if (error.status === 404) {
          return toast.error("Invalid email address", {
            description: "Enter a valid email address.",
          });
        }
        return toast.error(error.data?.message || "Unknown error occurred");
      }
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
      toast.success("Successfully logged in", {
        description: "Welcome back!",
      });
      redirect ? Cookies.remove("redirect") : "";
      navigate(redirect || "/profile");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastId);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-[15px]">
      <div className="flex items-start justify-center flex-col gap-[50px] shadow-lg rounded-[12px] overflow-hidden p-[20px]">
        <Link
          to={"/"}
          className="text-primaryTxt font-[600] text-[18px] center gap-[5px]"
        >
          <FaArrowLeftLong /> Back To Home
        </Link>
        <div className="flex items-center justify-center gap-[50px]">
          <div className="w-[500px] h-[450px]">
            <img
              src={"/images/washer.png"}
              alt="auth"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white max-w-[450px]">
            <h2 className="font-bold mb-6 text-left text-[35px]">Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-primaryTxt text-[18px] font-[600]">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-primaryTxt text-[18px] font-[600]">
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      className="mt-1 block w-full px-3 py-2 border border-borderColor rounded-md outline-none"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-fit px-[15px] center gap-[8px] bg-primaryMat text-white py-[12px] hover:bg-green-600 rounded-[5px]"
                  >
                    Login <LogIn />
                  </button>
                </Form>
              )}
            </Formik>
            <div className="mt-6 text-start">
              <p className="text-gray-700">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="text-primaryMat hover:underline"
                >
                  Create Account
                </Link>
              </p>
              <p className="text-gray-700">
                Dont remeber our password?
                <Link
                  to="/forgot-password"
                  className="text-primaryMat hover:underline"
                >
                  forgot password
                </Link>
              </p>
            </div>
            <p className="mt-4 text-gray-600 text-sm text-start">
              Note: Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
