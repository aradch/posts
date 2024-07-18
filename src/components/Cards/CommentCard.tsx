import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../hooks';
import { IComment } from '../../types/typings';
import { deleteComment } from '../../store/commentsSlice';
import CrossIcon from '../Icons/CrossIcon';
import EditIcon from '../Icons/EditIcon';

interface IProps {
  comment: IComment;
  onEdit: (comment: IComment) => void;
}

export const CommentCard = ({ comment, onEdit }: IProps): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const onDelete = () => {
    dispatch(deleteComment(comment.id));
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.content}>
        <Text>{comment.text}</Text>
      </View>
      <View style={styles.controlButtons}>
        <TouchableOpacity onPress={() => onEdit(comment)}>
          <EditIcon width={14} height={14} fill="gray" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <CrossIcon width={16} height={16} fill="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: '#171717',
    backgroundColor: 'white',
    padding: 10,
    marginRight: 20,
    marginLeft: 50,
    marginBottom: 10,
    borderRadius: 10
  },
  content: {
    width: '85%'
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6
  },
  editButtonText: {
    color: '#2688eb'
  },
  deleteButtonText: {
    color: 'red'
  }
});
