import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { IPost, RootStackNavigationType } from '../../types/typings';
import { useAppDispatch } from '../../hooks';
import { deletePost } from '../../store/postsSlice';

interface IProps {
  post: IPost;
  commentsCount: number;
  onEdit: (post: IPost) => void;
}

export const PostCardContent = ({ post, commentsCount, onEdit }: IProps): React.JSX.Element => {
  const route = useRoute();
  const navigation: RootStackNavigationType = useNavigation();

  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deletePost(post.id));

    if (route.name === 'Post')
      navigation.navigate('Home');
  };

  return (
    <>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.body}</Text>
      <View style={styles.bottomBlock}>
        <Text style={styles.blueText}>
          {commentsCount} {commentsCount === 1 ? 'comment' : 'comments'}
        </Text>
        <View style={styles.controlButtons}>
          <TouchableOpacity onPress={() => onEdit(post)}>
            <Text style={styles.blueText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  postContent: {
    fontSize: 16
  },
  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 16
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12
  },
  blueText: {
    color: '#2688eb'
  },
  deleteButtonText: {
    color: 'red'
  }
});
