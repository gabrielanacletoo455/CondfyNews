import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#121212',
      paddingTop: 20,
      paddingHorizontal: 10,
    },
    card: {
      backgroundColor: '#121212',
      paddingHorizontal: 20,
      paddingVertical: 16,
      
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
    },
    comments: {
      fontSize: 10,
      color: '#666',
      marginRight: 5,
    },
    tags: {
      fontSize: 10,
      color: '#666',
    },
    containerNotFound: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#121212',
      borderWidth: 1,
    },
    textNotFound: {
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      fontSize: 14,
      color: '#FFF',
    },
  });
  

  export default styles;