import { Card } from "../Card/Card";
import {
  skeleton,
  skeletonCard,
  skeletonText,
  skeletonTitle,
} from "./SkeletonLoader.css";

interface SkeletonCardLoaderProps {
  count?: number;
}

export function SkeletonCardLoader({ count = 3 }: SkeletonCardLoaderProps) {
  const cardArray = new Array(count).fill(0);
  return (
    <>
      {cardArray.map((value, index) => (
        <Card key={`${value}-${index}`} styles={[skeletonCard]} data-testid="skeleton-card">
          <div className={`${skeleton} ${skeletonTitle}`} />
          <div className={`${skeleton} ${skeletonText}`} />
          <div className={`${skeleton} ${skeletonText}`} />
          <div className={`${skeleton} ${skeletonText}`} />
          <div className={`${skeleton} ${skeletonText}`} />
        </Card>
      ))}
    </>
  );
}
