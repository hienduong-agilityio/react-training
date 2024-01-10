import styles from './index.module.css';
export interface TableHeader {
  id: number;
  label: string;
}

interface IHeaderProps {
  tableHeader: TableHeader[];
}

export const TableHeader = ({ tableHeader }: IHeaderProps) => (
  <thead className={styles.tableHeader}>
    <tr className={styles.tableRow}>
      {tableHeader.map((title) => (
        <th key={title.id} className={styles.tableTitle} data-title={title.label.toLowerCase()}>
          {title.label}
        </th>
      ))}
    </tr>
  </thead>
);
