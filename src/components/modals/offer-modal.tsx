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
  productId: String;
  offers: any;
  onClose: () => void;
  onSubmitSuccess: () => void;
  lastBid:Number | String
}

export function OfferDialogue({
  isOpen,
  productId,
  offers,
  onClose,
  onSubmitSuccess,
  lastBid
}: DialogDemoProps) {
  const user = useCurrentUser();

  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const floatValue = parseFloat(value);

    if (
      (!isNaN(floatValue) && floatValue <= offers[0].bidAmount) ||
      value === ""
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }

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
      // console.log("done");
      
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
              className="col-span-3"
              defaultValue={bidAmount}
              onChange={handleChange}
            />
          </div>
        </div>
        <DialogFooter>
          {disabled && (
            <DialogDescription className="text-destructive">
              Your bid should be higher than the current bid.
              {lastBid}
            </DialogDescription>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={isPending || disabled}
          >
            Place Bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
