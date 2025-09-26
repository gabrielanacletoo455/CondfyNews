import { StyleSheet, Dimensions } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: '#FFF',
  },
  inputContent: {
    backgroundColor: '#2a2a2a',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  inputField: {
    color: '#FFF',
    fontSize: 16,
    padding: 0,
    textAlignVertical: 'top',
  },
  inlineImageContainer: {
  },
  inlineImage: {
    width: screenWidth - 200, 
    height: 250, 
  },
});

export default styles;