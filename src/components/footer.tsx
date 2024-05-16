import { LucideFacebook, TwitterIcon, YoutubeIcon } from "lucide-react";
import Link from "next/link";
import MaxWidthWrapper from "./max-width-wrapper";

const Footer = () => {
  return (
    <div className="bg-background py-8 border-t border-gray-500 mt-auto">
      <MaxWidthWrapper>
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="#">
              <YoutubeIcon className="h-6 w-6 text-muted-foreground hover:text-[#FF0000]" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link href="#">
              <LucideFacebook className="h-6 w-6 text-muted-foreground hover:text-[#4267B2]" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#">
              <TwitterIcon className="h-6 w-6 text-muted-foreground hover:text-[#1DA1F2]" />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
          <p className="mt-4 md:mt-0 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Digital Market. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Footer;
