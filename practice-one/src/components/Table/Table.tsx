import styles from './index.module.css';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { IProductByCategory } from '../interfaces/product';

interface ITableProps {
  tableHeader: TableHeader[];
  dataTable?: IProductByCategory[];
  onToggleSort?: (e: string) => void;
  updateSortStatus?: string;
}

// TODO: Add comments params for component
export const Table = ({
  tableHeader,
  dataTable,
  onToggleSort = () => {},
  updateSortStatus,
}: ITableProps) => (
  <table className={styles.table}>
    <TableHeader
      updateSortStatus={updateSortStatus}
      handleSorting={onToggleSort}
      tableHeader={tableHeader}
    />
    <TableBody tableData={dataTable} />
  </table>
);
