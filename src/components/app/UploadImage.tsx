import { useDropzone } from "react-dropzone";
import { UseUploadImage } from "@/hooks/use-upload-image";
import { Button } from "../ui/button";
import { Trash2, Upload } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  uploadImage: UseUploadImage;
}

function UploadImage({ uploadImage }: Props) {
  const { isDragActive, getRootProps, getInputProps, open } = useDropzone({
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        uploadImage.handleImageUpload(acceptedFiles[0]);
      }
    },
  });

  const uploadShow = uploadImage.state === null || uploadImage.preview === null;

  return (
    <div className="min-w-32 min-h-32 aspect-square w-3/12">
      {uploadShow && (
        <div
          {...getRootProps()}
          className={cn(
            "border rounded-lg flex items-center justify-center",
            {
              "border-blue-400": isDragActive,
            }
          )}
        >
          <input {...getInputProps()} className="hidden" />
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              open();
            }}
          >
            <Upload />
          </Button>
        </div>
      )}

      {uploadImage.preview && (
        <div className="relative bg-accent rounded-lg overflow-hidden border">
          <div className="w-full h-full absolute hover:bg-black/40 flex items-center justify-center group">
            <Button
              variant="secondary"
              size="icon"
              className="invisible group-hover:visible"
              onClick={uploadImage.removeImage}
            >
              <Trash2 />
            </Button>
          </div>
          <img
            src={uploadImage.preview}
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
export default UploadImage;
