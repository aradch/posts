import { Path, Svg } from 'react-native-svg';

interface IProps {
  fill: string;
}

const ArrowUpIcon = ({ fill }: IProps): React.JSX.Element => {
  return (
    <Svg width="18" height="18" viewBox="0 0 16 16" fill={fill}>
      <Path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z" />
    </Svg>
  );
};

export default ArrowUpIcon;
