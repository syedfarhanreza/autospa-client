import { TriangleAlertIcon } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center text-white bg-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <TriangleAlertIcon className="mx-auto h-12 w-12 text-primary text-red-400" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight  sm:text-4xl">
          Oops, page not found!
        </h1>
        <p className="mt-4 text-slate-300">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to={"/"}
            className="inline-flex items-center rounded-md text-black bg-primaryMat border-2 border-black hover:bg-black hover:border-2 hover:border-primaryMat hover:text-primaryMat px-4 py-2 text-sm font-medium shadow-sm transition-colors  focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
