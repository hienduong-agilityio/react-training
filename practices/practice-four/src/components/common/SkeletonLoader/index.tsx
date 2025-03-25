export interface ISkeletonLoaderProps {
  // Defines the width of the skeleton loader.
  width?: string;
  // Defines the height of the skeleton loader.
  height?: string;
  // Custom class for skeletonLoader.
  customClassName?: string;
  //  will apply standard rounded corners.
  rounded?: boolean;
}

/**
 * SkeletonLoader is a reusable component used to display a loading placeholder.
 *
 * @returns A styled div element that simulates the loading state.
 */
export const SkeletonLoader = ({
  width = '100%',
  height = '20px',
  customClassName = '',
  rounded = false
}: ISkeletonLoaderProps) => {
  return (
    <div
      role='status'
      className={`animate-pulse bg-gray-300 ${rounded ? 'rounded-full' : 'rounded'} ${customClassName}`}
      style={{ width, height }}
    />
  );
};
