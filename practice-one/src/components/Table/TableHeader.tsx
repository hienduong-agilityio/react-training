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
    <tr className="table__row">
      {tableHeader.map((title) => (
        <th key={title.id} className="table__title" data-title={title.label.toLowerCase()}>
          {title.label}
        </th>
      ))}
    </tr>
  </thead>
);
