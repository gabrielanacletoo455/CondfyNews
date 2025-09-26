import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingHorizontal: 10,
    },
    title: {
      fontSize: 35,
      fontWeight: '400',
      color: '#FFF',
    },
    inputContainer: {
      marginTop: 20,
    },
    fieldContainer: {
      marginBottom: 10,
    },
    fieldLabel: {
      fontSize: 14,
      color: '#FFF',
      marginLeft: 5,
      marginBottom: 5,
    },
    input: {
      backgroundColor: '#000',
      borderWidth: 1,
      borderColor: '#222',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      color: '#FFF',
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#222',
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 16,
      backgroundColor: '#000',
    },
    passwordInput: {
      flex: 1,
      color: '#FFF',
      paddingVertical: 12,
      backgroundColor: '#000',
      
    },
    eyeButton: {
      padding: 5,
    },
    eyeIcon: {
      fontSize: 18,
    },
    containerBottom: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 20,
    },
    textBottom: {
      fontSize: 12,
      color: '#FFF',
      textAlign: 'center',
      marginTop: 20,
    },
    buttonBottom: {
      marginHorizontal: 10,
      marginTop: 20,
    },
    textButton: {
      fontSize: 14,
      color: '#6A5ACD',
      textAlign: 'center',
    },
    textYear: {
      fontSize: 12,
      color: '#FFF',
      textAlign: 'center',
      marginTop: 20,
    },
    multilineInput: {
      minHeight: 120,
      textAlignVertical: 'top',
      paddingTop: 12,
    },
  });

  
  export default styles;