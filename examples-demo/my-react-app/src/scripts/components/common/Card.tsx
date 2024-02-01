import { ButtonHTMLAttributes, memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

// Components
import { Heading } from 'components';
import { Button } from 'components/commons';

// Styles
import styles from './card.module.css';

// Assets
import default_image from 'assets/images/product-1.jpg';

type CardProps = Omit<LinkProps, 'to'> &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    imageURL?: string;
    title: string;
    category: string;
    price: number;
    href: string;
  };

const Card = (props: CardProps) => {
  const {
    imageURL = default_image,
    title,
    category,
    price,
    href,
    onClick,
    ...rest
  } = props;

  return (
    <Link to={href} {...rest} className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={imageURL} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardBody}>
        <Heading description={title} size="sm" className={styles.heading} />
        <p className={styles.cardText}>{category}</p>
        <p className={styles.cardText}>${price}</p>
      </div>
      <Button
        description="add to cart"
        variant="primary"
        className={styles.btn}
        onClick={onClick}
      />
    </Link>
  );
};

export default memo(Card);
