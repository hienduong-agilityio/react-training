import IProductByCategory from '../interfaces/productBYCategory';
import styles from './index.module.css';

interface ITableBodyProps {
  tableData?: IProductByCategory[];
}

export const TableBody = ({ tableData }: ITableBodyProps) => {
  if (!tableData || tableData.length === 0) {
    return (
      <tbody className={styles.tableContent}>
        <tr className="table__row">
          <td className="table__data table__message" colSpan={5}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={styles.tableContent}>
      {tableData.map((product) => (
        <tr key={product.id} className="table__row">
          <td className="table__data">{product.id}</td>
          <td className="table__data">{product.name}</td>
          <td className="table__data">{product.price}</td>
          <td className="table__data">{product.description}</td>
          <td className="table__data">{product.categoryName}</td>
        </tr>
      ))}
    </tbody>
  );
};
