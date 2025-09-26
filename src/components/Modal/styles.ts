import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 50,
      paddingRight: 15,
    },
    container: {
      borderRadius: 8,
      width: 200,
      borderWidth: 1,
      borderColor: '#222',
      paddingVertical: 15,
      paddingHorizontal: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    iconModal: {
      width: 15,
      height: 15,
      marginRight: 9,
    },
    text: {
      color: '#FFF',
    },
    textContent: {
      color: '#FFF',
    },
    modalContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    modalContentMiddle: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 13,
    },
    containerLogout: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    textLogout: {
      color: '#E70C0C',
    },
    textInput: {
      color: '#FFF',
      fontSize: 14,
      marginLeft: 5,
    },
  });

  
  export default styles;