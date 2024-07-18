import { NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  Home: undefined;
  Post: { id: string; };
};
export type RootStackNavigationType = NavigationProp<RootStackParamList>;

export interface IPost {
  id: string;
  title: string;
  body: string;
}

export interface IComment {
  id: string;
  postId: string;
  text: string;
}
