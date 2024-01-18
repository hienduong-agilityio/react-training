import { IFormValue, IValidationMessages } from '../../interfaces/form';
import styles from './index.module.css';

interface IForm {
  title?: string;
  formValue: IFormValue;
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
  validationMessages: IValidationMessages;
}

const FormValidate = ({
  title,
  formValue = { name: '', price: 0, description: '', category: '' },
  onSubmit,
  validationMessages,
}: IForm) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
    const data = new FormData(event.target as HTMLFormElement);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const formData = Object.fromEntries(data.entries());
  };

  return (
    <section className={styles.card}>
      <span className={styles.title}>{title}</span>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* ... Existing code ... */}

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="text"
            id="name"
            name="name"
            value={formValue.name}
          />
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <span className={styles.messInvalid}>{validationMessages.name}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="number"
            id="price"
            name="price"
            value={formValue.price}
          />
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <span className={styles.messInvalid}>{validationMessages.price}</span>
        </div>

        <div className={styles.group}>
          {/* ... Existing code ... */}
          <textarea
            className={styles.textarea}
            placeholder=""
            id="description"
            name="description"
            value={formValue.description}
          ></textarea>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <span className={styles.messInvalid}>{validationMessages.description}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="text"
            id="category"
            name="category"
            value={formValue.category}
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

export default FormValidate;
