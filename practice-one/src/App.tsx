import { useState } from 'react';

// Components
import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';
import { Search } from './components/SearchInput/Search';
import { IProductByCategory } from './components/interfaces/product';
import ChartSvg from './components/common/icons/ChartSvg';

// Style
import './styles/index.css';
import styles from './index.module.css';

// Data
import LIST_PRODUCTS from '../database/products.json';

// Constants
import { TABLE_TITLE } from './constants/tableTitle';

function App() {
  // Initial list of products from the imported JSON file
  const listProducts: IProductByCategory[] = LIST_PRODUCTS;

  // State to manage the search input
  const [searchInput, setSearchInput] = useState('');

  // State to manage sorting field
  const [sortField, setSortField] = useState<keyof IProductByCategory>();

  // State to manage sorting status (ascending or descending)
  const [sortStatus, setSortStatus] = useState('default');

  // Handler function for updating search input state
  const handleSearchKey = (text: string) => {
    setSearchInput(text);
  };

  // Handler function for updating sorting state based on table header click
  const handleSortingChange = (title: string) => {
    setSortField(title as keyof IProductByCategory);

    // Toggle sorting order
    const sortOrder: string =
      title === sortField && sortStatus === 'ascending' ? 'descending' : 'ascending';

    setSortStatus(sortOrder);
  };

  // Function to filter and sort products based on search input and sorting preferences
  const filterAndSortProducts = () => {
    // Filter products based on search input
    const filteredProducts: IProductByCategory[] = listProducts.filter((product) => {
      const productName = product.name.toLowerCase();
      const category = product.categoryName.toLowerCase();

      return (
        productName.includes(searchInput.toLowerCase()) || category.includes(searchInput.toLowerCase())
      );
    });

    // Define sorting modifier based on ascending or descending order
    const sorterModifier = sortStatus === 'ascending' ? 1 : -1;

    // Sort filtered products based on selected sorting field
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

  // Retrieve the result of filtered and sorted products
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
            sortStatus={sortStatus}
            dataTable={resultProductsOfFilterAndSort}
            tableHeader={TABLE_TITLE}
          />
        </section>
      </main>
    </>
  );
}

export default App;
