import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@prisma/client";
import { ProductForm } from "../forms/product-form";

const EditProductDialogue = ({
  product,
  onCancel,
}: {
  product: Product | null;
  onCancel: () => void;
}) => {
  return (
    <Dialog
      open={product !== null}
      onOpenChange={(open) => !open && onCancel()}
    >
      <DialogContent className="sm:max-w-[600px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit product</DialogTitle>
          <DialogDescription>
            Make changes to the product. Click save when you're done.{" "}
          </DialogDescription>
        </DialogHeader>
        <ProductForm product={product} callback={() => onCancel()} />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialogue;
