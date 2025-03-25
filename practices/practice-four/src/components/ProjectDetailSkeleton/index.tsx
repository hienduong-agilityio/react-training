import { SkeletonLoader } from '@/components';

/**
 * ProjectDetailSkeleton components
 */
export const ProjectDetailSkeleton = () => {
  return (
    <div className='flex items-center p-8 h-full gap-36 space-y-6 flex-row'>
      <div className='flex-shrink-0 w-5/12 h-full flex flex-col items-center'>
        {/* Placeholder for Avatar */}
        <SkeletonLoader width='75%' height='300px' customClassName='mb-4' />
        <SkeletonLoader width='50%' height='20px' />
      </div>

      <div className='flex-grow lg:w-7/12 h-full space-y-6'>
        <SkeletonLoader width='70%' height='30px' customClassName='mb-4' />
        <SkeletonLoader width='20%' height='20px' customClassName='mb-2' />
        <SkeletonLoader width='100px' height='30px' customClassName='mb-4 rounded-md' />

        <SkeletonLoader width='40%' height='20px' customClassName='mb-2' />
        <SkeletonLoader width='60%' height='20px' customClassName='mb-4' />

        <SkeletonLoader width='40%' height='20px' customClassName='mb-2' />
        <SkeletonLoader width='60%' height='20px' customClassName='mb-4' />

        <SkeletonLoader width='40%' height='20px' customClassName='mb-2' />
        <SkeletonLoader width='100px' height='20px' customClassName='mb-4' />

        <SkeletonLoader width='40%' height='20px' customClassName='mb-2' />
        <SkeletonLoader width='100px' height='20px' />
      </div>
    </div>
  );
};
