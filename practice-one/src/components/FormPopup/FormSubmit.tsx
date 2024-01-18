import styles from './index.module.css';

import Typography from '../common/Typography/Typography';
import { TEXT_SIZE } from '../../constants/common';
import Button from '../common/Button/Button';

interface IFormSubmit {
  title: string;
  text: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const FormSubmit = ({ title, text, onConfirm, onCancel }: IFormSubmit) => {
  return (
    <section>
      <Typography customClasses={styles.title} size={TEXT_SIZE.LARGE}>
        {title}
      </Typography>
      <Typography variant="p">{text}</Typography>
      <div className={styles.groupButton}>
        <Button color="primary" onClick={onConfirm}>
          Confirm Delete
        </Button>
        <Button variant="outline" color="light" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </section>
  );
};

export default FormSubmit;
