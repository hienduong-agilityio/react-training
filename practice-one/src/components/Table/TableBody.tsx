import Button from '../common/Button/Button';
import { IProductByCategory } from '../interfaces/product';
import styles from './index.module.css';

interface ITableBodyProps {
  tableData?: IProductByCategory[];
  onEditing?: (id: number) => void;
  onDeleting?: (id: number) => void;
}

// TODO: Add comments params for component
export const TableBody = ({
  tableData,
  onEditing = () => {},
  onDeleting = () => {},
}: ITableBodyProps) => {
  const handleEdit = (id: number) => {
    onEditing(id);
  };

  const handleDelete = (id: number) => {
    onDeleting(id);
  };

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
          <td className={styles.tableData}>
            <Button variant="text" onClick={() => handleEdit(product.id)}>
              Edit
            </Button>
            <Button variant="text" onClick={() => handleDelete(product.id)}>
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};
