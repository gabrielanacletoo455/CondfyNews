import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 14,
      color: '#FFF',
    },
    infoPostContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 5,
    },
    author: {
      fontSize: 10,
      color: '#666',
    },
    comments: {
      fontSize: 10,
      color: '#666',
      marginRight: 5,
    },
    card: {
      backgroundColor: '#121212',
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: '#222',
      borderRadius: 10,
    },
  
    iconLink: {
      width: 15,
      height: 15,
      marginRight: 5,
    },
  });


  export default styles;