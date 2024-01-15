import styles from './index.module.css';

interface IForm {
  title?: string;
  formInputData: {
    name: string;
    price: string;
    description: string;
    category: string;
  };
  onInputChange: (name: string, value: string) => void;
  onSubmit: () => void;
  formErrorMessages: {
    name: string;
    price: string;
    description: string;
    category: string;
  };
}

const FormValidate = ({
  title,
  formInputData = { name: '', price: '', description: '', category: '' },
  onInputChange = () => {},
  onSubmit,
  formErrorMessages,
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
            value={formInputData.name}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="name">
            Name
          </label>
          <span className={styles.messInvalid}>{formErrorMessages.name}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="number"
            id="price"
            name="price"
            value={formInputData.price}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="price">
            Price
          </label>
          <span className={styles.messInvalid}>{formErrorMessages.price}</span>
        </div>

        <div className={styles.group}>
          {/* ... Existing code ... */}
          <textarea
            className={styles.textarea}
            placeholder=""
            id="description"
            name="description"
            value={formInputData.description}
            onChange={handleChange}
          ></textarea>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <span className={styles.messInvalid}>{formErrorMessages.description}</span>
        </div>

        <div className={styles.group}>
          <input
            className={styles.input}
            placeholder=""
            type="text"
            id="category"
            name="category"
            value={formInputData.category}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="category">
            Category
          </label>
          <span className={styles.messInvalid}>{formErrorMessages.category}</span>
        </div>

        <button className={styles.button} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormValidate;
