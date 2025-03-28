import { IFormValue, IValidationMessages } from '../../interfaces/form';
import styles from './index.module.css';

interface IForm {
  title?: string;
  formValue: IFormValue;
  onSubmit: (data: IFormValue) => void;
  validationMessages: IValidationMessages;
}

interface IFormElement extends HTMLFormControlsCollection {
  name: HTMLInputElement;
  price: HTMLInputElement;
  description: HTMLInputElement;
  confirmPassword: HTMLInputElement;
  category: HTMLInputElement;
}

interface IFormData extends HTMLFormElement {
  readonly elements: IFormElement;
}

const ProductUpdateForm = ({
  title,
  formValue = { name: '', price: 0, description: '', category: '' },
  onSubmit,
  validationMessages,
}: IForm) => {
  const handleSubmit = (event: React.FormEvent<IFormData>) => {
    event.preventDefault();
    const formEvent = event.currentTarget.elements;

    const formData: IFormValue = {
      name: formEvent.name.value,
      price: parseFloat(formEvent.price.value),
      description: formEvent.description.value,
      category: formEvent.category.value,
    };
    onSubmit(formData);
  };

  return (
    <section className={styles.card}>
      <span className={styles.title}>{title}</span>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ... Existing code ... */}

        <div className={styles.group}>
          <input
            className={styles.input}
            defaultValue={formValue.name}
            placeholder=""
            type="text"
            id="name"
            name="name"
          />
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <span className={styles.messInvalid}>{validationMessages.name}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            defaultValue={formValue.price}
            placeholder=""
            type="number"
            id="price"
            name="price"
          />
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <span className={styles.messInvalid}>{validationMessages.price}</span>
        </div>

        <div className={styles.group}>
          {/* ... Existing code ... */}

          <textarea
            defaultValue={formValue.description}
            className={styles.textarea}
            placeholder=""
            id="description"
            name="description"
          ></textarea>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <span className={styles.messInvalid}>{validationMessages.description}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            defaultValue={formValue.category}
            placeholder=""
            type="text"
            id="category"
            name="category"
          />
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <span className={styles.messInvalid}>{validationMessages.category}</span>
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default ProductUpdateForm;
