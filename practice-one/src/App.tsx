import { useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';
import { Search } from './components/SearchInput/Search';
import { IProductByCategory } from './components/interfaces/product';
import ChartSvg from './components/common/icons/ChartSvg';

function App() {
  const listProducts: IProductByCategory[] = LIST_PRODUCTS;

  const [searchInput, setSearchInput] = useState('');

  const [sortField, setSortField] = useState<keyof IProductByCategory>();

  const [sortStatus, setSortStatus] = useState('default');

  const handleSearchKey = (text: string) => {
    setSearchInput(text);
  };

  const handleSortingChange = (title: string) => {
    setSortField(title as keyof IProductByCategory);

    const sortOrder: string =
      title === sortField && sortStatus === 'ascending' ? 'descending' : 'ascending';

    setSortStatus(sortOrder);
  };

  const filterAndSortProducts = () => {
    const filteredProducts: IProductByCategory[] = listProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const category = product.categoryName.toLowerCase();

      return (
        productName.includes(searchInput.toLowerCase()) || category.includes(searchInput.toLowerCase())
      );
    });

    const sorterModifier = sortStatus === 'ascending' ? 1 : -1;

    const sortedProducts = sortField
      ? [...filteredProducts].sort(
          (productAfter: IProductByCategory, productBefore: IProductByCategory) => {
            const tableDataValueAfter: string | number = productAfter[sortField];
            const tableDataValueBefore: string | number = productBefore[sortField];

            if (tableDataValueAfter < tableDataValueBefore) return -1 * sorterModifier;
            if (tableDataValueAfter > tableDataValueBefore) return 1 * sorterModifier;

            return 0;
          },
        )
      : filteredProducts;

    return sortedProducts;
  };

  const resultProductsOfFilterAndSort = filterAndSortProducts();

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
          <Search title="Search product:" onSearchInput={handleSearchKey} />
          <Table
            onToggleSort={handleSortingChange}
            updateSortStatus={sortStatus}
            dataTable={resultProductsOfFilterAndSort}
            tableHeader={TABLE_TITLE}
          />
        </section>
      </main>
    </>
  );
}

export default App;
