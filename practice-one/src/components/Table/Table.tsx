// Type and components
import { ITableHeader, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { IProductByCategory } from '../interfaces/product';

// Style
import styles from './index.module.css';

interface ITableProps {
  tableHeader: ITableHeader[];
  dataTable?: IProductByCategory[];
  onToggleSort?: (e: string) => void;
  onEditProduct?: (id: number) => void;
  sortStatus?: string;
}

// TODO: Add comments params for component
export const Table = ({
  tableHeader,
  dataTable,
  onToggleSort = () => {},
  onEditProduct = () => {},
  sortStatus,
}: ITableProps) => (
  <table className={styles.table}>
    <TableHeader sortStatus={sortStatus} onSorting={onToggleSort} tableHeader={tableHeader} />
    <TableBody tableData={dataTable} onEditing={onEditProduct} />
  </table>
);
