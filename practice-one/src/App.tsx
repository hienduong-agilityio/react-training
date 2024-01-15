import { useState } from 'react';

// Components
import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { Table } from './components/Table/Table';
import { SearchInput } from './components/SearchInput/SearchInput';
import { IProductByCategory } from './components/interfaces/product';
import ChartSvg from './components/common/icons/ChartSvg';
import Popup from './components/common/Popup/Popup';
import FormValidate from './components/FormValidate/FormValidate';
import Button from './components/common/Button/Button';
import AddSVG from './components/common/icons/AddSVG';

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

  // State to manage form popup action
  const [isFormPopupOpen, setIsFormPopupOpen] = useState(false);

  // State to manage the search input
  const [searchInput, setSearchInput] = useState('');

  // State to manage sorting field
  const [sortField, setSortField] = useState<keyof IProductByCategory>();

  // State to manage sorting status (ascending or descending)
  const [sortStatus, setSortStatus] = useState('default');

  // State to manga form input data
  const [formInputData, setFormInputData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  // State to manage form error message for validate
  const [formErrorMessages, setFormErrorMessages] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const [currentProductList, setCurrentProductList] = useState<IProductByCategory[]>(listProducts);

  const handleInputChange = (name: string, value: string) => {
    setFormInputData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleCreateProductClick = (): void => {
    // Toggle the state to open/close the popup
    setIsFormPopupOpen(!isFormPopupOpen);
  };
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
    const filteredProducts: IProductByCategory[] = currentProductList.filter((product) => {
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

  // Function to validate form
  const validateForm = () => {
    const errors = { name: '', price: '', description: '', category: '' };

    // Name validation: Should not contain numbers and must be filled
    if (!formInputData.name.trim() || !/^[A-Za-z\s]+$/.test(formInputData.name)) {
      errors.name = 'Name should be filled and contain only letters and spaces.';
    }

    // Price validation: Should be a valid number and must be filled
    if (
      !formInputData.price.trim() ||
      isNaN(Number(formInputData.price)) ||
      Number(formInputData.price) <= 0
    ) {
      errors.price = 'Price should be filled and be a valid number greater than 0.';
    }

    // Description validation: Should be at least 50 characters long
    if (formInputData.description.length < 50) {
      errors.description = 'Description should be at least 50 characters long.';
    }

    // Category validation: Should be the same as Name and must be filled
    if (!formInputData.category.trim() || !/^[A-Za-z\s]+$/.test(formInputData.category)) {
      errors.category = 'Category should be filled and contain only letters and spaces.';
    }

    setFormErrorMessages(errors);

    // Return true if there are no errors, indicating a valid form
    return Object.values(errors).every((error) => !error);
  };

  const createNewProduct = () => {
    // Create a new product object from form data
    const newProduct: IProductByCategory = {
      id: currentProductList.length + 1,
      name: formInputData.name,
      price: formInputData.price,
      description: formInputData.description,
      categoryName: formInputData.category,
    };

    // Update the state to include the new product
    setCurrentProductList((prevList) => [...prevList, newProduct]);
  };

  const handleSubmitForm = (): void => {
    // Validate the form before submission
    const isValid: boolean = validateForm();

    if (isValid) {
      // If the form is valid, create a new product and update the list
      createNewProduct();

      // Close the popup
      setIsFormPopupOpen(false);

      // Clear form data and errors
      setFormInputData({ name: '', price: '', description: '', category: '' });
      setFormErrorMessages({ name: '', price: '', description: '', category: '' });
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
          <div className={styles.productAction}>
            <div className={styles.createAction}>
              <Button color="primary" onClick={handleCreateProductClick} startIcon={<AddSVG />}>
                Create Product
              </Button>
            </div>
            <div className={styles.searchAction}>
              <SearchInput title="SearchInput product:" onSearchInput={handleSearchKey} />
            </div>
          </div>
          <Table
            onToggleSort={handleSortingChange}
            sortStatus={sortStatus}
            dataTable={resultProductsOfFilterAndSort}
            tableHeader={TABLE_TITLE}
          />
        </section>
        {isFormPopupOpen && (
          <section className={styles.fixed}>
            <Popup
              isFixed={true}
              closeButton={false}
              customClasses={styles.popup}
              isOpen={isFormPopupOpen}
              onClosePopup={handleCreateProductClick}
            >
              <FormValidate
                title="Create Products "
                formInputData={formInputData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmitForm}
                formErrorMessages={formErrorMessages}
              />
            </Popup>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
