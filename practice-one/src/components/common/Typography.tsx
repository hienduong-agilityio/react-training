import '../../styles/index.css';

export interface Props {
  content: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
}

const Text = ({ content, fontSize = '', fontWeight = '', color = '' }: Props) => {
	return <p className={`font-size-${fontSize} font-weight-${fontWeight} color-${color}`}>{content}</p>;
};

export default Text;
