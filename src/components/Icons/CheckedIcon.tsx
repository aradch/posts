import { Path, Svg } from 'react-native-svg';

interface IProps {
  fill: string;
}

const CheckedIcon = ({ fill }: IProps): React.JSX.Element => {
  return (
    <Svg width="18" height="18" viewBox="0 0 16 16" fill={fill}>
      <Path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
    </Svg>
  );
};

export default CheckedIcon;
