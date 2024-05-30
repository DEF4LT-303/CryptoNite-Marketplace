import { Card, Skeleton } from "@nextui-org/react";

const CardSkeletonLoader = () => {
  return (
    <Card className="p-4 my-5 space-y-5 h-[330px]" radius="sm">
      <Skeleton className="rounded-lg">
        <div className="h-[240px] rounded-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default CardSkeletonLoader;
