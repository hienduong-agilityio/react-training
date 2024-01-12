import { useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';
import { Search } from './components/SearchInput/Search';
import { IProductByCategory, IProductWithoutId } from './components/interfaces/product';
import ChartSvg from './components/common/icons/ChartSvg';
import Popup from './components/common/Popup/Popup';
import Form from './components/Form/Form';
import Button from './components/common/Button/Button';

function App() {
  let listProducts: IProductByCategory[] = LIST_PRODUCTS;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [sortField, setSortField] = useState<keyof IProductByCategory>();

  const [sortStatus, setSortStatus] = useState('default');

  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '' });

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreateProductClick = () => {
    // Toggle the state to open/close the popup
    setIsPopupOpen(!isPopupOpen);
  };
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

  const handleFormSubmit = () => {
    // Create a new product with the form data
    const newProduct: IProductWithoutId = {
      name: formData.name,
      price: formData.price,
      description: formData.description,
      categoryName: formData.category,
    };

    // Add the new product to the list of products
    listProducts = [...listProducts, newProduct];


    // Close the popup
    setIsPopupOpen(false);
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
          <Search title="Search product:" onSearchInput={handleSearchKey} />
          <Button color="primary" onClick={handleCreateProductClick}>
            Create Product
          </Button>
          <Table
            onToggleSort={handleSortingChange}
            updateSortStatus={sortStatus}
            dataTable={resultProductsOfFilterAndSort}
            tableHeader={TABLE_TITLE}
          />
        </section>
        <Popup
          isFixed={true}
          closeButton={false}
          isOpen={isPopupOpen}
          onClosePopup={handleCreateProductClick}
        >
          <Form
            title="Create Products "
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleFormSubmit}
          />
        </Popup>
      </main>
    </>
  );
}

export default App;
