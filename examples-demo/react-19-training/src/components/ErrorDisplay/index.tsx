// Libraries
import { Link } from 'react-router-dom';
import { ROUTE } from '../../constants';

interface IErrorDisplayProps {
  errorMessage: string;
  linkText?: string;
  linkRoute?: string;
}

/**
 * ErrorDisplay component
 *
 * @param errorMessage - The message when component has error.
 * @param linkText - The text for the link button (default: "Go Home").
 * @param linkRoute - The route for the link (default: ROUTE.ROOT).
 * @returns JSX.Element
 */
export const ErrorDisplay = ({
  errorMessage,
  linkText = 'Go to Homepage',
  linkRoute = ROUTE.ROOT
}: IErrorDisplayProps) => {
  return (
    <div className='flex min-h-[50vh] flex-col items-center justify-center bg-background'>
      <div className='mx-auto max-w-md text-center'>
        <div className='mx-auto' />
        <p className='mt-4 text-3xl font-bold text-primary-600'>{errorMessage}</p>
        <p className='mt-4'>
          We're sorry, but an unexpected error has occurred. Please try again later or contact support if the issue
          persists.
        </p>
        <div className='mt-6'>
          <Link to={linkRoute} className='px-4 py-2 font-medium text-white bg-primary-500 rounded-xl'>
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};
