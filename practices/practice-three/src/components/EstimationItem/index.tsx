interface IEstimationProps {
  // estimation: Optional estimated cost of the project, displayed as a financial estimate.
  estimation?: string;
}

/**
 * EstimationItem component
 *
 * @returns {JSX.Element} - EstimationItem element
 */
const EstimationItem = ({ estimation }: IEstimationProps): JSX.Element => {
  return <p>{estimation ? `US$ ${estimation}k` : '-'}</p>;
};

export default EstimationItem;
