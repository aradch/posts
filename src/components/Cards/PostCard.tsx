import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IPost, RootStackNavigationType } from '../../types/typings';
import { PostCardContent } from './PostCardContent';

interface IProps {
  post: IPost;
  commentsCount: number;
  onEdit: (post: IPost) => void;
}

export const PostCard = ({ post, commentsCount, onEdit }: IProps): React.JSX.Element => {
  const navigation: RootStackNavigationType = useNavigation();

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Post', { id: post.id })}
      >
        <PostCardContent
          post={post}
          commentsCount={commentsCount}
          onEdit={onEdit}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: '#171717',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 10
  }
});
