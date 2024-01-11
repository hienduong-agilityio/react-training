import { SORT_NAMES } from '../../constants/productSortSetting';
import Button from '../common/Button/Button';
import SortSvg from '../common/icons/SortSvg';
import styles from './index.module.css';

export interface TableHeader {
  id: number;
  label: string;
  title: string;
}

interface IHeaderProps {
  tableHeader: TableHeader[];
  handleSorting?: (e: string) => void;
  updateSortStatus?: string;
}

// TODO: Add comments params for component
export const TableHeader = ({
  tableHeader,
  handleSorting = () => {},
  updateSortStatus,
}: IHeaderProps) => {
  return (
    <thead className={styles.tableHeader}>
      <tr className={styles.tableRow}>
        {tableHeader.map((header) => {
          const sortButton = SORT_NAMES.includes(header.label.toLowerCase());
          const handleSort = () => {
            handleSorting(header.title);
          };

          return (
            <th key={header.id} className={styles.tableTitle} data-header={header.label}>
              {sortButton ? (
                <Button
                  customClasses={styles.tableIcon}
                  endIcon={<SortSvg status={updateSortStatus} fillColor="gray" />}
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
