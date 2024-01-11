import { useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';
import { Search } from './components/SearchInput/Search';
import IProductByCategory from './components/interfaces/productByCategory';
import ChartSvg from './components/common/icons/ChartSvg';

function App() {
  const listProducts: IProductByCategory[] = LIST_PRODUCTS;

  const [searchInput, setSearchInput] = useState('');

  const handleSearchKey = (text: string) => {
    setSearchInput(text);

    filteredProducts(listProducts);
  };

  const filteredProducts = (products: IProductByCategory[]) => {
    const resultFilterProducts = products.filter((product) => {
      const productName = product.name.toLowerCase();
      const category = product.categoryName.toLowerCase();

      return (
        productName.includes(searchInput.toLowerCase()) || category.includes(searchInput.toLowerCase())
      );
    });

    return resultFilterProducts;
  };

  return (
    <>
      <header className={styles.header}>
        <Navbar logoSrc="./assets/image/Logo.png" altText="Loogo Logo" />
      </header>
      <main className={styles.mainContent}>
        <Sidebar title="Menu">
          <SidebarItem title="Products">
            <span className={styles.linkIcon}>
              <ChartSvg fillColor="gray" />
            </span>
          </SidebarItem>
        </Sidebar>
        <section className={styles.productContent}>
          <Search title="Search product:" getValue={handleSearchKey} />
          <Table
            dataTable={!searchInput ? listProducts : filteredProducts(listProducts)}
            tableHeader={TABLE_TITLE}
          />
        </section>
      </main>
    </>
  );
}

export default App;
