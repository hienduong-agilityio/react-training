import { memo } from 'react';
import { RegisterIcon } from '../../icons';

// Icon

interface FormLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const FormLayout = ({ title, subtitle, children }: FormLayoutProps) => (
  <div className='w-full max-w-[95%] sm:w-[420px] lg:w-[585px] px-6 sm:px-8 md:px-10 lg:px-0 py-8 flex flex-col items-center bg-white shadow-lg rounded-md'>
    <div className='flex flex-col items-center gap-4 mb-4'>
      <a href='/'>
        <RegisterIcon size={64} />
      </a>
      <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold text-indigo text-center'>{title}</h2>
      <span className='text-xs sm:text-sm lg:text-base text-secondary-500'>{subtitle}</span>
    </div>
    {children}
  </div>
);

export default memo(FormLayout);
