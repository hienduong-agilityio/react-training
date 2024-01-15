// Components
import Button from '../common/Button/Button';
import SortSvg from '../common/icons/SortSvg';

// Styles
import styles from './index.module.css';

export interface ITableHeader {
  id: number;
  label: string;
  title: string;
  sortable: boolean;
}

interface IHeaderProps {
  tableHeader: ITableHeader[];
  onSorting?: (e: string) => void;
  sortStatus?: string;
}

export const TableHeader = ({ tableHeader, onSorting = () => {}, sortStatus }: IHeaderProps) => {
  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.tableRow}>
        {tableHeader.map((header) => {
          const sortButton = header.sortable;

          const handleSort = () => {
            onSorting(header.title);
          };

          return (
            <th key={header.id} className={styles.tableTitle} data-header={header.label}>
              {sortButton ? (
                <Button
                  customClasses={styles.tableIcon}
                  endIcon={<SortSvg status={sortStatus} fillColor="gray" />}
                  onClick={handleSort}
                >
                  {header.label}
                </Button>
              ) : (
                header.label
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
