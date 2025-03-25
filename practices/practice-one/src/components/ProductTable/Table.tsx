// Type and components
import { ITableHeader, TableHeader } from './ProductTableHeader';
import { TableBody } from './ProductTableBody';
import { IProductByCategory } from '../../interfaces/product';

// Style
import styles from './index.module.css';

interface ITableProps {
  tableHeader: ITableHeader[];
  dataTable?: IProductByCategory[];
  onToggleSort?: (e: string) => void;
  onEditProduct?: (id: number) => void;
  onDeleteProduct?: (id: number) => void;
  sortStatus?: string;
}

// TODO: Add comments params for component
export const Table = ({
  tableHeader,
  dataTable,
  onToggleSort = () => {},
  onEditProduct = () => {},
  onDeleteProduct = () => {},
  sortStatus,
}: ITableProps) => (
  <table className={styles.table}>
    <TableHeader sortStatus={sortStatus} onSorting={onToggleSort} tableHeader={tableHeader} />
    <TableBody tableData={dataTable} onEditing={onEditProduct} onDeleting={onDeleteProduct} />
  </table>
);
