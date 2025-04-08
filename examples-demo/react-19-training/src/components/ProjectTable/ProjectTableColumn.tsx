import { JSX } from 'react';

/**
 * ProjectTableColumn Component
 *
 * @returns {JSX.Element} The table header containing the column titles.
 */
const ProjectTableColumn = (): JSX.Element => {
  const commonColClass = 'font-medium text-gray-500';

  return (
    <thead className='bg-gray-50'>
      <tr className='h-9 uppercase'>
        <th className={`pl-3 ${commonColClass}`}>Id</th>
        <th className={`${commonColClass}`}>Project Name</th>
        <th className={`text-center ${commonColClass}`}>PM</th>
        <th className={`${commonColClass}`}>Status</th>
        <th className={`${commonColClass}`}>Last update</th>
        <th className={`text-center ${commonColClass}`}>Resources</th>
        <th className={`${commonColClass}`}>Project timeline</th>
        <th className={`${commonColClass}`}>Estimation</th>
      </tr>
    </thead>
  );
};

export default ProjectTableColumn;
