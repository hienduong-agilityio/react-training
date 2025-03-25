// Libraries
import { Suspense } from 'react';

// Components
import { Spinner } from '@/components';

/**
 * SuspenseLoader with a custom fallback.
 *
 * @param Component - The component to wrap in Suspense.
 * @param fallback - Optional fallback UI element.
 * @returns Component wrapped in Suspense with a custom fallback.
 */
export const SuspenseLoader =
  <P extends object>(
    Component: React.ComponentType<P>,
    fallback: React.ReactNode = (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    )
  ) =>
  (props: P) => (
    <Suspense fallback={fallback}>
      <Component {...props} />
    </Suspense>
  );
