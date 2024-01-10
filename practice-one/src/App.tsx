import { useEffect, useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';
import { Search } from './components/SearchInput/Search';
import IProductByCategory from './components/interfaces/productBYCategory';

function App() {
  const listProducts = LIST_PRODUCTS;

  const [searchInput, setSearchInput] = useState('');

  const [searchedProducts, setSearchedProducts] = useState<IProductByCategory[]>([]);

  const handleSearchKey = (text: string) => {
    setSearchInput(text);
  };

  useEffect(() => {
    const filteredProducts: IProductByCategory[] = listProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const category = product.categoryName.toLowerCase();

      return (
        productName.includes(searchInput.toLowerCase()) || category.includes(searchInput.toLowerCase())
      );
    });

    setSearchedProducts(filteredProducts);
  }, [searchInput, listProducts]);

  return (
    <>
      <header className={styles.header}>
        <Navbar logoSrc="./assets/image/Logo.png" altText="Loogo Logo"></Navbar>
      </header>
      <main className={styles.mainContent}>
        <Sidebar title="Menu">
          <SidebarItem title="Products">
            <span className={styles.linkIcon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="blue"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g className="chart">
                  <path
                    className="chart_1"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.75127 0.500305H11.857C14.4447 0.500305 15.9056 1.94706 15.9132 4.49781V11.5028C15.9132 14.0528 14.4447 15.5003 11.857 15.5003H4.75127C2.16355 15.5003 0.695831 14.0528 0.695831 11.5028V4.49781C0.695831 1.94706 2.16355 0.500305 4.75127 0.500305ZM8.34186 12.3953C8.6698 12.3953 8.94295 12.1553 8.97338 11.8328V4.1903C9.00382 3.9578 8.89045 3.72455 8.68501 3.5978C8.47121 3.4703 8.21251 3.4703 8.00784 3.5978C7.80164 3.72455 7.68827 3.9578 7.71034 4.1903V11.8328C7.74914 12.1553 8.02229 12.3953 8.34186 12.3953ZM11.8426 12.3953C12.1622 12.3953 12.4353 12.1553 12.4741 11.8328V9.37281C12.4962 9.13206 12.3828 8.90781 12.1766 8.78031C11.972 8.65281 11.7133 8.65281 11.5002 8.78031C11.294 8.90781 11.1807 9.13206 11.2111 9.37281V11.8328C11.2415 12.1553 11.5147 12.3953 11.8426 12.3953ZM5.4277 11.8328C5.39727 12.1553 5.12412 12.3953 4.79618 12.3953C4.46901 12.3953 4.19509 12.1553 4.16542 11.8328V6.6503C4.14259 6.41705 4.25596 6.1853 4.46216 6.0578C4.66683 5.9303 4.92629 5.9303 5.13172 6.0578C5.3364 6.1853 5.45129 6.41705 5.4277 6.6503V11.8328Z"
                  />
                </g>
              </svg>
            </span>
          </SidebarItem>
        </Sidebar>
        <section className={styles.productContent}>
          <Search title="Search product:" getValue={handleSearchKey} />
          <Table dataTable={searchedProducts} tableHeader={TABLE_TITLE}></Table>
        </section>
      </main>
    </>
  );
}

export default App;
