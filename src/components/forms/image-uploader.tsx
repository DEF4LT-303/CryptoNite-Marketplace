"use client";

import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useState, useTransition } from "react";
import Dropzone from "react-dropzone";
import { Progress } from "../ui/progress";

const ImageUploader = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(20);
  const [isPending, startTransition] = useTransition();
  const isUploading = false;

  const onDropRejected = () => {};
  const onDropAccepted = () => {
    console.log("accepted");
  };

  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-lg bg-accent/60 p-2 ring-1 ring-inset ring-gray-900/10 flex justify-center flex-col items-center",
        { "ring-blue-900/70 bg-blue-900/50": isDragOver }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="w-full flex-1 flex flex-col items-center justify-center min-h-[100px]"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="w-6 h-6 mb-2" />
              ) : isUploading || isPending ? (
                <Loader2 className="animate-spin w-6 h-6" />
              ) : (
                <Image className="w-6 h-6 mb-2 text-primary/50" />
              )}

              <div className="flex flex-col justify-center text-sm mb-2 text-primary">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className="mt-2 w-40" />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>
            </div>
          )}
        </Dropzone>
      </div>
    </div>
  );
};

export default ImageUploader;
