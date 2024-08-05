interface ICurrencyTextProps {
  // Currency: Optional estimated cost of the project, displayed as a financial estimate.
  currency?: string;
}

/**
 * CurrencyText component
 *
 * @returns {JSX.Element} - CurrencyItem element
 */
const CurrencyText = ({ currency }: ICurrencyTextProps): JSX.Element => {
  return <p className='text-gray-700'>{currency ? `US$ ${currency}k` : '-'}</p>;
};

export default CurrencyText;
