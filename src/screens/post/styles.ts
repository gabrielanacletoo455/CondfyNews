import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    keyboardContainer: {
      flex: 1,
      backgroundColor: '#121212',
    },
    scrollContainer: {
      flex: 1,
    },
    scrollContent: {
      flexGrow: 1,
      padding: 10,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    containerComment: {
      backgroundColor: '#121212',
      padding: 10,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },
    authorHeader: {
      fontSize: 10,
      color: '#6A5ACD',
      fontWeight: 'bold',
      borderRadius: 4,
     backgroundColor: 'rgba(178, 171, 219, 0.2)',
      padding: 2,
      paddingHorizontal: 8,
      borderBottomWidth: 1,
    },
    timer: {
      fontSize: 10,
      textAlign: 'right',
      color: '#FFF',
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 10,
    },
    content: {
      color: '#FFF',
    },
    postImage: {
      alignSelf: 'center',
      width: 500,
      height: 420,
      marginVertical: 10,
    },
    author: {
      fontSize: 16,
      color: '#FFF',
    },
    createdAt: {
      fontSize: 14,
      color: '#FFF',
    },
    inputComment: {
      borderWidth: 1,
      borderColor: '#666',
      borderRadius: 10,
      marginTop: 20,
      padding: 10,
      minHeight: 80,
      color: '#FFF',
    },
    closeComment: {
      fontSize: 35,
      color: 'red',
      marginRight: 10,
    },
    commentsSection: {
      marginTop: 30,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#333',
    },
    commentsTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#FFF',
      marginBottom: 15,
    },
    commentItem: {
      backgroundColor: '#1a1a1a',
      padding: 15,
      borderRadius: 8,
      marginBottom: 10,
      borderLeftWidth: 3,
      
      borderLeftColor: '#6A5ACD',
    },
    commentHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
      paddingBottom: 20,
    },
    commentAuthor: {
      
      fontSize: 14,
      fontWeight: 'bold',
      color: '#6A5ACD',
      backgroundColor: 'rgba(178, 171, 219, 0.2)',
      padding: 1,
      paddingHorizontal: 8,
      borderRadius: 4,
    },
    commentDate: {
      fontSize: 12,
      color: '#999',
    },
    commentText: {
      fontSize: 14,
      color: '#FFF',
      lineHeight: 20,
    },
    noComments: {
      fontSize: 14,
      color: '#666',
      textAlign: 'center',
      fontStyle: 'italic',
      marginTop: 20,
    },
    rowItens: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    
    // ✅ Adicionar estilos para edição
    editContainer: {
      backgroundColor: '#1a1a1a',
      padding: 20,
      borderRadius: 12,
      marginVertical: 15,
      borderWidth: 1,
      borderColor: '#6A5ACD',
    },
    editTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#6A5ACD',
      marginBottom: 15,
      textAlign: 'center',
    },
    fieldContainer: {
      marginBottom: 15,
    },
    fieldLabel: {
      fontSize: 16,
      fontWeight: '600',
      color: '#FFF',
      marginBottom: 8,
    },
    editInput: {
      backgroundColor: '#2a2a2a',
      borderWidth: 1,
      borderColor: '#444',
      borderRadius: 8,
      padding: 12,
      color: '#FFF',
      fontSize: 16,
    },
    multilineInput: {
      minHeight: 120,
      textAlignVertical: 'top',
    },
    editButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      gap: 10,
    },
    
  });

  export default styles;