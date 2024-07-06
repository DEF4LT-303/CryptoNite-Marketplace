"use client";
import { Mouse } from "lucide-react";
import { StickyScroll } from "./ui/sticky-scroll-reveal";

const content = [
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center">
        <img
          src="https://coinstats.app/blog/wp-content/uploads/2023/06/The-Rise-of-NFTs-How-Will-AI-Impact-the-NFT-Art-Ecosystem-copy-1.webp"
          // width={300}
          // height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center">
        <img
          src="https://cdn.prod.website-files.com/5ed6d638efc8309f25745844/5f9a539f88c28f1360ec47a8_DigitalAssetManagement_Newsletter.png"
          // width={300}
          // height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "Real time changes",
    description:
      "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
    content: (
      <div className="h-full w-full  flex items-center justify-center">
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2020/09/20/Stock-trading-illustration-concept-Graphics-5575751-1.jpg"
          // width={300}
          // height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
];
export function StickyScrollReveal() {
  return (
    <div className="p-10">
      <div className="flex justify-center items-center gap-10">
        <Mouse className="animate-bounce h-10 w-10" />
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
