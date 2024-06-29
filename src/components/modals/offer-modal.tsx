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
import { Loader2 } from "lucide-react";
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
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

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
        setIsRunning(false); // Stop running when timer is cleared
        return defaultSeconds;
      });

      setIsRunning(true); // Timer is running
      intervalRef.current = window.setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            if (intervalRef.current !== null) {
              clearInterval(intervalRef.current);
            }
            clearProductTimer(productId);
            setIsRunning(false); // Stop running when timer reaches zero
            return defaultSeconds;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timeStamps, productId, clearProductTimer]);

  const handleChange = (e: any) => {
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
      setBidAmount(0);
      setDisabled(true);
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
          {isRunning ? (
            <DialogDescription className="text-destructive">
              Please wait before placing another bid.
            </DialogDescription>
          ) : disabled ? (
            <DialogDescription className="text-destructive">
              Your bid should be higher than the current bid.
            </DialogDescription>
          ) : null}
          {isRunning && (
            <DialogDescription>
              {Math.floor(seconds / 60)}:{seconds % 60}
            </DialogDescription>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={disabled || isRunning}
            className="min-w-[120px]"
          >
            {isRunning ? (
              <Loader2 className="animate-spin" size={16} />
            ) : (
              "Submit"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
