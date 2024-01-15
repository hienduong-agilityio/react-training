import { IProductByCategory } from '../interfaces/product';
import styles from './index.module.css';

interface ITableBodyProps {
  tableData?: IProductByCategory[];
}

// TODO: Add comments params for component
export const TableBody = ({ tableData }: ITableBodyProps) => {
  if (!tableData || tableData.length === 0) {
    return (
      <tbody className={styles.tableContent}>
        <tr className={styles.tableRow}>
          <td className={(styles.tableData, styles.tableMessage)} colSpan={5}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={styles.tableContent}>
      {tableData.map((product) => (
        <tr key={product.id} className={styles.tableRow}>
          <td className={styles.tableData}>{product.id}</td>
          <td className={styles.tableData}>{product.name}</td>
          <td className={styles.tableData}>{product.price}</td>
          <td className={styles.tableData}>{product.description}</td>
          <td className={styles.tableData}>{product.categoryName}</td>
        </tr>
      ))}
    </tbody>
  );
};
