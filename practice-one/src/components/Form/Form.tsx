import styles from './index.module.css';

interface IForm {
  title?: string;
  formData: {
    name: string;
    price: string;
    description: string;
    category: string;
  };
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
  formErrors: {
    name: string;
    price: string;
    description: string;
    category: string;
  };
}

const Form = ({
  title,
  formData = { name: '', price: '', description: '', category: '' },
  onInputChange = () => {},
  onSubmit,
  formErrors,
}: IForm) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    onInputChange(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <div className={styles.card}>
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
            value={formData.name}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <div className={styles.error}>{formErrors.name}</div>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <div className={styles.error}>{formErrors.price}</div>
        </div>

        <div className={styles.group}>
          {/* ... Existing code ... */}
          <textarea
            className={styles.textarea}
            placeholder=""
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <div className={styles.error}>{formErrors.description}</div>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <div className={styles.error}>{formErrors.category}</div>
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
