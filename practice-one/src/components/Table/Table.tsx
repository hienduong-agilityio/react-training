import styles from './index.module.css';
import { TableHeader } from './TableHeader';
import { TableBody } from './TableBody';

interface ITableProps {
  tableHeader: TableHeader[];
  dataTable?: [];
}

// TODO: Add comments params for component
export const Table = ({ tableHeader, dataTable }: ITableProps) => (
  <table className={styles.table}>
    <TableHeader tableHeader={tableHeader} />
    <TableBody tableData={dataTable} />
  </table>
);
