import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Modal from 'react-native-modal';
import uuid from 'react-native-uuid';
import { useAppDispatch } from '../hooks';
import { createPost, updatePost } from '../store/postsSlice';
import CrossIcon from './Icons/CrossIcon';

const deviceHeight = Dimensions.get('window').height;

interface IProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  postId: string;
  postTitle: string;
  postContent: string;
  setPostTitle: (postTitle: string) => void;
  setPostContent: (postContent: string) => void;
}

export const ActionsModal = ({ isOpen, setOpen, postId, postTitle, postContent, setPostTitle, setPostContent }: IProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    setPostTitle('');
    setPostContent('');
    setOpen(false);
  };

  const onSubmit = () => {
    const payload = {
      id: postId || uuid.v4() as string,
      title: postTitle,
      body: postContent
    };

    const action = postId ? updatePost : createPost;
    dispatch(action(payload));
    onClose();
  };

  return (
    <View>
      <Modal
        isVisible={isOpen}
        onBackdropPress={onClose}
        style={styles.modal}
      >
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>
              {postId ? 'Edit' : 'Create'} post
            </Text>
            <TouchableOpacity style={styles.crossButton} onPress={onClose}>
              <CrossIcon width={24} height={24} fill="gray" />
            </TouchableOpacity>
          </View>
          <View style={styles.formContent}>
            <TextInput
              style={styles.input}
              placeholder="Enter your title..."
              value={postTitle}
              onChangeText={setPostTitle}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="What's new?"
              value={postContent}
              onChangeText={setPostContent}
              multiline
            />
            <TouchableOpacity onPress={onSubmit} disabled={!postTitle || !postContent}>
              <View style={styles.submitContainer}>
                <Text style={styles.submitText}>
                  {postId ? 'Save' : 'Create'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    marginTop: deviceHeight * 0.4
  },
  container: {
    flex: 1,
    padding: 20,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: 'white'
  },
  titleText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20
  },
  crossButton: {
    position: 'absolute',
    right: 0
  },
  formContent: {
    flex: 1,
    gap: 14
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 5
  },
  textArea: {
    flexGrow: 1
  },
  submitContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#2688EB',
    borderRadius: 10
  },
  submitText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
