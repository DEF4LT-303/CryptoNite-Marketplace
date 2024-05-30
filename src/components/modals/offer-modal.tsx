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
import { useEffect, useRef, useState, useTransition } from "react";

interface DialogDemoProps {
  isOpen: boolean;
  productId: String;
  offers: any;
  onClose: () => void;
  onSubmitSuccess: () => void;
  // lastBid:number | null
}

export function OfferDialogue({
  isOpen,
  productId,
  offers,
  onClose,
  onSubmitSuccess,
  // lastBid
}: DialogDemoProps) {
  const user = useCurrentUser();

  const [bidAmount, setBidAmount] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [disabled, setDisabled] = useState(true);



  const [seconds, setSeconds] = useState(() => {
    const timeStamp = localStorage.getItem('timeStamp');
    const now: Date = new Date();
    const offerDate: Date = new Date(timeStamp);
    const diffInMs = now.getTime() - offerDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    if (seconds<=60){
      return 60 - seconds
    }
    return 60; // Default or stored value
  });
  const [isRunning, setIsRunning] = useState(() => {
    const storedIsRunning = localStorage.getItem('watchIsRunning');
    return storedIsRunning === 'true'; // Parse boolean value from string
  });
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          // clearInterval(intervalRef.current); // Stop timer when it reaches 0
          // setIsRunning(false); // Set isRunning to false after reaching 0
          setSeconds(60);
          setIsRunning(false);
          clearInterval(intervalRef.current); // Ensure interval is cleared
        }
      }, 1000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, seconds]);

  useEffect(() => {
    // localStorage.setItem('watchSeconds', seconds);
    localStorage.setItem('watchIsRunning', isRunning); // Store isRunning state
  }, [seconds, isRunning]);

  const timeForTimer = (time: Date) => {
    const now: Date = new Date();
    const offerDate: Date = new Date(time);
    const diffInMs = now.getTime() - offerDate.getTime();

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let timeDifference;
    if (days > 0) {
      timeDifference = "ok"
    } else if (hours > 0) {
      timeDifference = "ok"
    } else if (minutes > 0) {
      timeDifference = "ok"
    } else {
      return timeDifference = seconds
    }
    return timeDifference;
  };

  const formattedTime = `${Math.floor(seconds / 60)}:${seconds % 60}`; // Format time
  

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
      console.log("started");
      
      const {data} = await axios.post("/api/offers", bid);
      localStorage.setItem('timeStamp', data.message);
      // const timeDiff = timeForTimer(data.message)
      // console.log(timeDiff);
      
      setIsRunning(true);
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
            </DialogDescription>
          )}
          <DialogDescription>
              {formattedTime}
          </DialogDescription>
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
