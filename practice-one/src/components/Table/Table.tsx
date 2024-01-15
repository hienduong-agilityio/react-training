import styles from './index.module.css';
import { ITableHeader, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { IProductByCategory } from '../interfaces/product';

interface ITableProps {
  tableHeader: ITableHeader[];
  dataTable?: IProductByCategory[];
  onToggleSort?: (e: string) => void;
  sortStatus?: string;
}

// TODO: Add comments params for component
export const Table = ({
  tableHeader,
  dataTable,
  onToggleSort = () => {},
  sortStatus,
}: ITableProps) => (
  <table className={styles.table}>
    <TableHeader
      sortStatus={sortStatus}
      onSorting={onToggleSort}
      tableHeader={tableHeader}
    />
    <TableBody tableData={dataTable} />
  </table>
);
