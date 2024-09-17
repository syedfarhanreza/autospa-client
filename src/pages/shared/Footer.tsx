import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitchIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="bg-muted py-12 w-full carbon_fiber"
      style={{ clipPath: "polygon(0 8%, 100% 1%, 100% 100%, 0% 100%)" }}
    >
      <div className="container max-w-5xl mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-2">
          <img className="w-[130px]" src={"/images/logo.png"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="mb-2 text-primaryMat text-[17px] font-[600]">
              Location
            </h4>
            <p className="text-white">123 Main St, Anytown USA 12345</p>
          </div>
          <div>
            <h4 className="mb-2 text-[17px] font-[600] text-primaryMat">
              Contact
            </h4>
            <p className="text-white">
              Phone: (123) 456-7890
              <br />
              Email: info@acme.com
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-primaryMat">Follow Us</h4>
            <div className="flex justify-center gap-4">
              <Link to="#" aria-label="Twitter">
                <TwitchIcon className="h-5 w-5 text-white hover:text-muted-foreground transition" />
              </Link>
              <Link to="#" aria-label="Facebook">
                <FacebookIcon className="h-5 w-5 text-white hover:text-muted-foreground transition" />
              </Link>
              <Link to="#" aria-label="Instagram">
                <InstagramIcon className="h-5 w-5 text-white hover:text-muted-foreground transition" />
              </Link>
              <Link to="#" aria-label="LinkedIn">
                <LinkedinIcon className="h-5 w-5 text-white hover:text-muted-foreground transition" />
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-[15px] text-white">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/" className="hover:underline">
            Booking
          </Link>
          <Link to="#" className="hover:underline">
            Services
          </Link>
          <Link to="#" className="hover:underline">
            Dashboard
          </Link>
          <Link to="#" className="hover:underline">
            Faq
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 text-xs text-white">
          <Link to="#" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="#" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="#" className="hover:underline">
            Cookie Policy
          </Link>
          <Link to="#" className="hover:underline">
            Sitemap
          </Link>
        </div>
        <p className="text-xs text-white">
          &copy; 2024 Acme Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
