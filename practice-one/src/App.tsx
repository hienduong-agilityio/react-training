import { useState } from 'react';

import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';
import { Search } from './components/SearchInput/Search';
import { IProductByCategory } from './components/interfaces/product';
import ChartSvg from './components/common/icons/ChartSvg';
import Popup from './components/common/Popup/Popup';
import Form from './components/Form/Form';
import Button from './components/common/Button/Button';

import './styles/index.css';
import styles from './index.module.css';

import LIST_PRODUCTS from '../database/products.json';
import { TABLE_TITLE } from './constants/tableTitle';

function App() {
  const listProducts: IProductByCategory[] = LIST_PRODUCTS;

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [sortField, setSortField] = useState<keyof IProductByCategory>();

  const [sortStatus, setSortStatus] = useState('default');

  const [formData, setFormData] = useState({ name: '', price: '', description: '', category: '' });

  const [formErrors, setFormErrors] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const [currentProductList, setCurrentProductList] = useState<IProductByCategory[]>(listProducts);

  const handleInputChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreateProductClick = (): void => {
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
    const filteredProducts: IProductByCategory[] = currentProductList.filter((product) => {
      const productName: string = product.name.toLowerCase();
      const category: string = product.categoryName.toLowerCase();

      return (
        productName.includes(searchInput.toLowerCase()) || category.includes(searchInput.toLowerCase())
      );
    });

    const sorterModifier: number = sortStatus === 'ascending' ? 1 : -1;

    const sortedProducts: IProductByCategory[] = sortField
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

  const validateForm = () => {
    const errors = { name: '', price: '', description: '', category: '' };

    // Name validation: Should not contain numbers and must be filled
    if (!formData.name.trim() || !/^[A-Za-z\s]+$/.test(formData.name)) {
      errors.name = 'Name should be filled and contain only letters and spaces.';
    }

    // Price validation: Should be a valid number and must be filled
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      errors.price = 'Price should be filled and be a valid number greater than 0.';
    }

    // Description validation: Should be at least 50 characters long
    if (formData.description.length < 50) {
      errors.description = 'Description should be at least 50 characters long.';
    }

    // Category validation: Should be the same as Name and must be filled
    if (!formData.category.trim() || !/^[A-Za-z\s]+$/.test(formData.category)) {
      errors.category = 'Category should be filled and contain only letters and spaces.';
    }

    setFormErrors(errors);

    // Return true if there are no errors, indicating a valid form
    return Object.values(errors).every((error) => !error);
  };

  const createNewProduct = () => {
    // Create a new product object from form data
    const newProduct: IProductByCategory = {
      id: currentProductList.length + 1,
      name: formData.name,
      price: formData.price,
      description: formData.description,
      categoryName: formData.category,
    };

    // Update the state to include the new product
    setCurrentProductList((prevList) => [...prevList, newProduct]);
  };

  const handleFormSubmit = (): void => {
    // Validate the form before submission
    const isValid: boolean = validateForm();

    if (isValid) {
      // If the form is valid, create a new product and update the list
      createNewProduct();

      // Close the popup
      setIsPopupOpen(false);

      // Clear form data and errors
      setFormData({ name: '', price: '', description: '', category: '' });
      setFormErrors({ name: '', price: '', description: '', category: '' });
    }
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
            sortStatus={sortStatus}
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
            formErrors={formErrors}
          />
        </Popup>
      </main>
    </>
  );
}

export default App;
