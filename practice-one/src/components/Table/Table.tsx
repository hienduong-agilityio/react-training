import styles from './index.module.css';
import { ITableHeader, TableHeader } from './TableHeader';
import { TableBody } from './TableBody';
import { IProductByCategory } from '../interfaces/product';

interface ITableProps {
  tableHeader: ITableHeader[];
  dataTable?: IProductByCategory[];
  onToggleSort?: (e: string) => void;
  onEditProduct?: (id: number) => void;
  onDeleteProduct?: (id: number) => void;
  updateSortStatus?: string;
}

// TODO: Add comments params for component
export const Table = ({
  tableHeader,
  dataTable,
  onToggleSort = () => {},
  onEditProduct = () => {},
  onDeleteProduct = () => {},
  updateSortStatus,
}: ITableProps) => (
  <table className={styles.table}>
    <TableHeader sortStatus={updateSortStatus} onSorting={onToggleSort} tableHeader={tableHeader} />
    <TableBody tableData={dataTable} onEditing={onEditProduct} onDeleting={onDeleteProduct} />
  </table>
);
