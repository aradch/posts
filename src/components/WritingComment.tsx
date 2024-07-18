import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ArrowUpIcon, CheckedIcon, CrossIcon } from './Icons';

interface IProps {
  isEdit: boolean;
  value: string;
  setValue: (value: string) => void;
  onCancel: () => void;
  onSend: () => void;
}

export const WritingComment = ({ isEdit, value, setValue, onCancel, onSend }: IProps): React.JSX.Element => {
  return (
    <View style={styles.wrapper}>
      {isEdit && (
        <TouchableOpacity onPress={onCancel}>
          <View style={styles.buttonContainer}>
            <CrossIcon width={18} height={18} fill="gray" />
          </View>
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.input}
        placeholder="Write a comment..."
        value={value}
        onChangeText={setValue}
      />
      <TouchableOpacity onPress={onSend} disabled={!value}>
        <View style={[styles.buttonContainer, styles.sendButtonContainer]}>
          {isEdit ? (
            <CheckedIcon fill="white" />
          ) : (
            <ArrowUpIcon fill="white" />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    paddingTop: 12,
    paddingBottom: 22,
    paddingHorizontal: 20
  },
  buttonContainer: {
    paddingVertical: 6
  },
  sendButtonContainer: {
    paddingHorizontal: 6,
    backgroundColor: '#2688eb',
    borderRadius: 16
  },
  input: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    borderRadius: 5
  }
});
