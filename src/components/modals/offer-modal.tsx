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
import { useBiddingTimer } from "@/hooks/use-bidding-timer";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

// tried to update this page adasdasdasdasdasdasdasdas
interface DialogDemoProps {
  isOpen: boolean;
  productId: string;
  offers: any;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export function OfferDialogue({
  isOpen,
  productId,
  offers,
  onClose,
  onSubmitSuccess,
}: DialogDemoProps) {
  const user = useCurrentUser();
  const [bidAmount, setBidAmount] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const intervalRef = useRef(null);

  const { timeStamps, setTimer, clearProductTimer } = useBiddingTimer();
  const defaultSeconds = 60;
  const [seconds, setSeconds] = useState(defaultSeconds);

  useEffect(() => {
    const timer = timeStamps[productId];

    if (timer?.isRunning) {
      setSeconds(() => {
        const now = Date.now();
        const diffInMs = now - timer.timestamp;
        const remainingSeconds = defaultSeconds - Math.floor(diffInMs / 1000);
        if (remainingSeconds > 0) {
          return remainingSeconds;
        }
        clearProductTimer(productId);
        return defaultSeconds;
      });

      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            clearProductTimer(productId);
            return defaultSeconds;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [timeStamps, productId, clearProductTimer]);

  const handleChange = (e) => {
    const { value } = e.target;
    const floatValue = parseFloat(value);

    setDisabled(isNaN(floatValue) || floatValue <= offers[0]?.bidAmount);
    setBidAmount(floatValue || 0);
  };

  const submitBid = async () => {
    if (!user) return;

    const bid = { userId: user.id, productId, bidAmount };

    try {
      const { data } = await axios.post("/api/offers", bid);
      setTimer(productId, Date.now());
      onSubmitSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = () => {
    submitBid();
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
            </DialogDescription>
          )}
          <DialogDescription>
            {Math.floor(seconds / 60)}:{seconds % 60}
          </DialogDescription>
          <Button type="submit" onClick={handleSubmit} disabled={disabled}>
            Place Bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
