import { Path, Svg } from 'react-native-svg';

interface IProps {
  width: number;
  height: number;
  fill: string;
}

const CrossIcon = ({ width, height, fill }: IProps): React.JSX.Element => {
  return (
    <Svg width={width} height={height} viewBox="0 0 18 18" fill={fill}>
      <Path d="M12.7123 13.7726L4.22702 5.28728C3.93711 4.99737 3.93711 4.51653 4.22702 4.22662C4.51694 3.93671 4.99777 3.93671 5.28768 4.22662L13.773 12.7119C14.0629 13.0018 14.0629 13.4826 13.773 13.7726C13.4831 14.0625 13.0022 14.0625 12.7123 13.7726Z"/>
      <Path d="M4.22703 13.7726C3.93712 13.4826 3.93712 13.0018 4.22703 12.7119L12.7123 4.22662C13.0022 3.93671 13.4831 3.93671 13.773 4.22662C14.0629 4.51653 14.0629 4.99737 13.773 5.28728L5.28769 13.7726C4.99778 14.0625 4.51695 14.0625 4.22703 13.7726Z"/>
    </Svg>
  );
};

export default CrossIcon;
