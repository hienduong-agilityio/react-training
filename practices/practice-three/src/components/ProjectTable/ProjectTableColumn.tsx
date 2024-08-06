// Constants
import { PROJECT_TABLE_COLUMN } from '@/constants/projectTableTitle';

/**
 * ProjectTableColumn Component
 *
 * @returns {JSX.Element} The table header containing the column titles.
 */
const ProjectTableColumn = (): JSX.Element => {
  return (
    <thead className='bg-gray-50'>
      <tr>
        {PROJECT_TABLE_COLUMN.map((column) => (
          <th key={column.id} scope='col' className='py-2 px-3 text-left'>
            <p className='uppercase font-medium text-gray-500'> {column.title}</p>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ProjectTableColumn;
