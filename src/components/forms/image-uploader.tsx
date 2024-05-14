"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { cn } from "@/lib/utils";
import { Image, Loader2, MousePointerSquareDashed, X } from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { toastFunction } from "../toastfunction";
import { Progress } from "../ui/progress";

interface PreviewFile extends File {
  preview: string; // Adding the preview property to the File interface
}

interface ImageUploaderProps {
  form: any; // Type according to your form library
}

const ImageUploader = forwardRef<any, ImageUploaderProps>(({}, ref) => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [files, setFiles] = useState<PreviewFile[]>([]);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const url = data.serverData.url;
      return url;
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);

    toastFunction(
      `${file.file.type} is not supported!`,
      "destructive",
      "Select a .png, .jpeg, or .jpg file."
    );
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ),
      ]);
    }

    // startUpload(acceptedFiles, { configId: undefined });
    setIsDragOver(false);
  };

  const removeFile = (name: String) => {
    setFiles((files) => files.filter((file) => file.name !== name));
  };

  const removeAllFiles = () => {
    setFiles([]);
  };

  const uploadImage = async () => {
    if (files.length && files.length <= 4) {
      const uploadedFiles = await startUpload(files, { configId: undefined }); // Get all metadatas
      const uploadUrls = uploadedFiles?.map((file) => file.url); // Get all urls as an array

      removeAllFiles();

      return { uploadUrls };
    } else if (files.length > 4) {
      return { error: "You can only upload 4 images at a time!" };
    } else {
      return { error: "No files to upload!" };
    }
  };

  useImperativeHandle(ref, () => ({
    uploadImage,
  }));

  return (
    <div>
      <div
        className={cn(
          "relative h-full flex-1 my-5 w-full rounded-lg bg-accent/60 p-2 ring-1 ring-inset ring-gray-900/10 flex justify-center flex-col items-center",
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
                ) : isUploading ? (
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
                  ) : isDragOver ? (
                    <p>
                      <span className="font-semibold">Drop file</span> to upload
                    </p>
                  ) : (
                    <div className="flex flex-col justify-center items-center">
                      <p>
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Image formate should be .png, .jpg or .jpeg
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Dropzone>
        </div>
      </div>
      {files.length > 0 && <p>Preview</p>}
      <div className="mt-5 flex flex-row flex-wrap gap-4">
        {files.map((file) => (
          <div key={file.name} className="relative h-32 w-32 my-2 ">
            <img
              src={file.preview}
              alt={file.name}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="object-fill rounded-lg"
            />
            <button
              type="button"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full border border-red-400 bg-red-500 transition-colors hover:bg-red-300"
              onClick={() => removeFile(file.name)}
            >
              <X className="h-5 w-5 " />
            </button>
            {/* <p className="text-[12px] font-medium mb-2">{file.name}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
});

export default ImageUploader;
