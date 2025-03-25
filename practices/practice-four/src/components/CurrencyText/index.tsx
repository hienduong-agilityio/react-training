export interface ICurrencyTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  // Currency: Optional estimated cost of the project, displayed as a financial estimate.
  currency?: number;
}

/**
 * CurrencyText component
 *
 * @returns {JSX.Element} - CurrencyItem element
 */
export const CurrencyText = ({ currency = 0, className = '' }: ICurrencyTextProps): JSX.Element => {
  return <p className={`${className}`}>{currency ? `US$ ${currency}k` : '-'}</p>;
};
