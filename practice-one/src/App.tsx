import { useEffect, useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';
import { Search } from './components/SearchInput/Search';
import IProductByCategory from './components/interfaces/productBYCategory';
import Svg from './components/common/icons/Svg';

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
              <Svg fillColor="gray" />
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
