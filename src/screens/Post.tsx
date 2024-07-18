import React, { useCallback, useEffect, useState}  from 'react';
import {
  View,
  FlatList,
  StyleSheet
} from 'react-native';
import uuid from 'react-native-uuid';
import { RouteProp, useRoute } from '@react-navigation/native';
import { IComment, IPost } from '../types/typings';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getPosts } from '../store/postsSlice';
import { createComment, getComments, updateComment } from '../store/commentsSlice';
import { PostCardContent } from '../components/Cards/PostCardContent';
import { CommentCard } from '../components/Cards/CommentCard';
import { WritingComment } from '../components/WritingComment';
import { ActionsModal } from '../components/ActionsModal';

type TRoutePost = {
  params: {
    id: string;
  };
}

export const Post = (): React.JSX.Element => {
  const route = useRoute<RouteProp<TRoutePost>>();
  const dispatch = useAppDispatch();

  const { posts } = useAppSelector((state) => state.posts);
  const { comments: allComments } = useAppSelector((state) => state.comments);

  useEffect(() => {
    dispatch(getPosts());
    dispatch(getComments());
  }, []);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [postTitleValue, setPostTitleValue] = useState<string>('');
  const [postContentValue, setPostContentValue] = useState<string>('');

  const onEditPost = useCallback((post: IPost) => {
    setPostTitleValue(post.title);
    setPostContentValue(post.body);
    setModalVisible(true);
  }, []);

  const [selectedCommentId, setSelectedCommentId] = useState<string>('');
  const [commentValue, setCommentValue] = useState<string>('');

  const post = posts.find((post) => post.id === route.params.id);

  const onEditComment = (comment: IComment) => {
    setSelectedCommentId(comment.id);
    setCommentValue(comment.text);
  };

  const onCancelComment = () => {
    setSelectedCommentId('');
    setCommentValue('');
  };

  const onSendComment = () => {
    const payload = {
      id: selectedCommentId || uuid.v4() as string,
      postId: post!.id,
      text: commentValue
    };

    const action = selectedCommentId ? updateComment : createComment;

    dispatch(action(payload));
    onCancelComment();
  };

  const postComments = allComments
    .reduce(
      (obj, comment) => {
        if (comment.postId === post!.id)
          return {
            ...obj,
            data: [...obj.data, comment],
            count: ++obj.count
          };

        return obj;
      },
      { data: [], count: 0 } as { data: IComment[], count: number }
    );

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.postCard}>
          <PostCardContent
            post={post!}
            commentsCount={postComments.count}
            onEdit={onEditPost}
          />
        </View>
        <FlatList
          data={postComments.data}
          renderItem={({ item }) =>
            <CommentCard
              comment={item}
              onEdit={onEditComment}
            />
          }
          keyExtractor={comment => comment.id.toString()}
          style={styles.flatList}
        />
        <WritingComment
          isEdit={!!selectedCommentId}
          value={commentValue}
          setValue={setCommentValue}
          onCancel={onCancelComment}
          onSend={onSendComment}
        />
      </View>
      <ActionsModal
        isOpen={isModalVisible}
        setOpen={setModalVisible}
        postId={post!.id}
        postTitle={postTitleValue}
        postContent={postContentValue}
        setPostTitle={setPostTitleValue}
        setPostContent={setPostContentValue}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 10
  },
  postCard: {
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
    backgroundColor: 'white',
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10
  },
  flatList: {
    paddingBottom: 8
  }
});
