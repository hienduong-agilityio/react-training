import '../../styles/index.css';

export interface Props {
  children: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

const Text = ({ children, fontSize = '', fontWeight = '', color = '' }: Props) => {
  return <p className={`font-size-${fontSize} font-weight-${fontWeight} color-${color}`}>{children}</p>;
};

export default Text;
