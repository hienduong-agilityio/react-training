import { useState } from 'react';

// Logo
import logo from './assets/image/Logo.png';

// Components
import { Table, SearchInput, FormSubmit, FormValidate } from './components';
import { Navbar, Sidebar, SidebarItem } from './components/layouts';
import { ChartSvg, Popup, Button, AddSVG } from './components/common';

// Style
import './styles/index.css';
import styles from './index.module.css';

// Data
import LIST_PRODUCTS from '../database/products.json';

// Constants
import { TABLE_TITLE } from './constants/tableTitle';

// Type
import { IProductByCategory } from './interfaces/product';
import { IFormValue } from './interfaces/form';

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
  const [formValue, setFormValue] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
  });

  const [editFormValue, setEditFormValue] = useState({
    name: '',
    price: 0,
    description: '',
    category: '',
  });

  // State to manage form error message for validate
  const [validationMessages, setValidationMessages] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });

  const [currentProductList, setCurrentProductList] = useState<IProductByCategory[]>(listProducts);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  const [deleteProductId, setDeleteProductId] = useState<number | null>(null);

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
    if (!formValue.name.trim() || !/^[A-Za-z\s]+$/.test(formValue.name)) {
      errors.name = 'Name should be filled and contain only letters and spaces.';
    }

    // Price validation: Should be a valid number and must be filled
    if (!formValue.price || isNaN(Number(formValue.price)) || Number(formValue.price) <= 0) {
      errors.price = 'Price should be filled and be a valid number greater than 0.';
    }

    // Description validation: Should be at least 50 characters long
    if (formValue.description.length < 50) {
      errors.description = 'Description should be at least 50 characters long.';
    }

    // Category validation: Should be the same as Name and must be filled
    if (!formValue.category.trim() || !/^[A-Za-z\s]+$/.test(formValue.category)) {
      errors.category = 'Category should be filled and contain only letters and spaces.';
    }

    setValidationMessages(errors);

    // Return true if there are no errors, indicating a valid form
    return Object.values(errors).every((error) => !error);
  };

  const createNewProduct = () => {
    // Create a new product object from form data
    const newProduct: IProductByCategory = {
      id: currentProductList.length + 1,
      name: formValue.name,
      price: formValue.price,
      description: formValue.description,
      categoryName: formValue.category,
    };

    // Update the state to include the new product
    setCurrentProductList((prevList) => [...prevList, newProduct]);
  };

  const updateProduct = (productId: number) => {
    const updatedProducts = currentProductList.map((product) =>
      product.id === productId
        ? {
            ...product,
            name: editFormValue.name,
            description: formValue.description,
            categoryName: formValue.category,
          }
        : product,
    );
    setCurrentProductList(updatedProducts);
  };

  const handleFormValidation = (): void => {
    // Validate the form before submission
    const isValid: boolean = validateForm();

    if (isValid) {
      if (editingProductId !== null) {
        updateProduct(editingProductId);
      } else {
        createNewProduct();
      }

      setEditingProductId(null);

      // Clear form data and errors
      setFormValue({ name: '', price: 0, description: '', category: '' });
      setValidationMessages({ name: '', price: '', description: '', category: '' });

      // Close the popup
      setIsFormPopupOpen(false);
    }
  };

  const handleEditProduct = (id: number) => {
    const editingProduct = currentProductList.find((product) => product.id === id);

    if (editingProduct) {
      setEditingProductId(id);
      setIsFormPopupOpen(true);
      setFormValue({
        name: editingProduct.name,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.categoryName,
      });
    }
  };

  const handleDeleteProduct = (id: number) => {
    setDeleteProductId(id);
    setIsFormPopupOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (deleteProductId !== null) {
      const updatedProducts = currentProductList.filter((product) => product.id !== deleteProductId);
      setCurrentProductList(updatedProducts);
    }

    setIsFormPopupOpen(false);
    setDeleteProductId(null);
  };

  const handleCloseFormPopup = (): void => {
    setIsFormPopupOpen(false);
    setEditingProductId(null);
    setDeleteProductId(null);

    // Clear form data and errors
    setFormValue({ name: '', price: 0, description: '', category: '' });
    setValidationMessages({ name: '', price: '', description: '', category: '' });
  };

  const hanldeValueSubmit = (data: IFormValue) => {
    editingProductId ? setEditFormValue(data) : setFormValue(data);

    // Perform form validation and handle submission
    handleFormValidation();
  };

  return (
    <>
      <header className={styles.header}>
        <Navbar logoSrc={logo} altText="Loogo Logo" />
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
              <Button
                customClasses={styles.button}
                color="primary"
                onClick={handleCreateProductClick}
                startIcon={<AddSVG />}
              >
                Create Product
              </Button>
            </div>
            <div className={styles.searchAction}>
              <SearchInput title="Search Input:" onSearchInput={handleSearchKey} />
            </div>
          </div>
          <Table
            onToggleSort={handleSortingChange}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
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
              onClosePopup={handleCloseFormPopup}
            >
              {deleteProductId !== null ? (
                <FormSubmit
                  title="Confirm Delete"
                  text="Are you sure you want to delete this product?"
                  onConfirm={confirmDeleteProduct}
                  onCancel={handleCloseFormPopup}
                />
              ) : (
                <FormValidate
                  title={editingProductId ? 'Edit Product' : 'Create Product'}
                  formValue={formValue}
                  onSubmit={hanldeValueSubmit}
                  validationMessages={validationMessages}
                />
              )}
            </Popup>
          </section>
        )}
      </main>
    </>
  );
}

export default App;
