interface FormLayoutProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const FormLayout = ({ title, subtitle, children }: FormLayoutProps) => (
  <section>
    <div className='flex rounded-t-xl items-center bg-white justify-between p-4'>
      <p className='text-xl font-semibold text-gray-900'>{title}</p>
    </div>
    {subtitle && <p className='text-gray-600 mt-1 mb-4'>{subtitle}</p>}
    {children}
  </section>
);
