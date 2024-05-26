"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCurrentUser } from "@/hooks/currentUser";
import axios from "axios";
import { useState, useTransition } from "react";

interface DialogDemoProps {
  isOpen: boolean;
  onClose: () => void;
  productId: string;
  onSubmitSuccess: () => void;
}

export function OfferDialogue({
  isOpen,
  onClose,
  productId,
  onSubmitSuccess,
}: DialogDemoProps) {
  const user = useCurrentUser();

  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const floatValue = parseFloat(value);

    if (!isNaN(floatValue)) {
      setBidAmount(floatValue);
    }
  };

  const submitBid = async () => {
    if (!user) {
      return;
    }

    const bid = {
      userId: user.id,
      productId,
      bidAmount: bidAmount,
    };

    try {
      await axios.post("/api/offers", bid);
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    startTransition(() => {
      submitBid();
    });

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place Bid</DialogTitle>
          <DialogDescription>
            Offer your bid for this product.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Bid Amount (ETH)</Label>
            <Input
              id="amount"
              type="number"
              defaultValue={0}
              className="col-span-3"
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} disabled={isPending}>
            Place Bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
