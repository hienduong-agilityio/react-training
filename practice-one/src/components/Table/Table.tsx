import styles from './index.module.css';
import { ITableHeader, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { IProductByCategory } from '../interfaces/product';

interface ITableProps {
  tableHeader: ITableHeader[];
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
      sortStatus={updateSortStatus}
      onSorting={onToggleSort}
      tableHeader={tableHeader}
    />
    <TableBody tableData={dataTable} />
  </table>
);
