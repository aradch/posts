import React, { useCallback, useEffect, useState }  from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';
import { IPost } from '../types/typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPosts } from '../store/postsSlice';
import { getComments } from '../store/commentsSlice';
import { ActionsModal } from '../components/ActionsModal';
import { PostCard } from '../components/Cards/PostCard';
import WriteIcon from '../components/Icons/WriteIcon';

export const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.posts);
  const { comments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, []);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [postId, setPostId] = useState<string>('');

  const [postTitleValue, setPostTitleValue] = useState<string>('');
  const [postContentValue, setPostContentValue] = useState<string>('');

  const onEdit = useCallback((post: IPost) => {
    setPostId(post.id);
    setPostTitleValue(post.title);
    setPostContentValue(post.body);
    setModalVisible(true);
  }, []);

  const onCreate = () => {
    setPostId('');
    setModalVisible(true);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={onCreate}>
          <View style={styles.createPostSection}>
            <View style={styles.createPostButton}>
              <WriteIcon width={18} height={18} fill="#2688eb" />
              <Text style={styles.createPostButtonText}>What’s new?</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <FlatList
          data={posts}
          renderItem={({ item }) =>
            <PostCard
              post={item}
              commentsCount={comments.reduce((acc, comment) => item.id === comment.postId ? acc += 1 : acc, 0)}
              onEdit={onEdit}
            />
          }
          keyExtractor={item => item.id.toString()}
          style={styles.flatList}
        />
      </View>
      <ActionsModal
        isOpen={isModalVisible}
        setOpen={setModalVisible}
        postId={postId}
        postTitle={postTitleValue}
        postContent={postContentValue}
        setPostTitle={setPostTitleValue}
        setPostContent={setPostContentValue}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
  createPostSection: {
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
    backgroundColor: 'white',
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10
  },
  createPostButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f3f3f2',
    padding: 10,
    borderRadius: 6
  },
  createPostButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2688eb'
  },
  flatList: {
    paddingTop: 10
  }
});
