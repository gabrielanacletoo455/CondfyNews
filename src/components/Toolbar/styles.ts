import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1D1D1D',
        height: 60,
        
    },
    logo: {
        width: 50,
        height: 50,
    },
    iconSearch: {
        width: 20,
        height: 20,
        marginRight: 15,
    },
    text: {
        color: '#fff',
        marginHorizontal: 5,
        fontWeight: 'bold',
    },
    textLogin: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 15,
    },
    contentToolbar:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    textActive: {
        borderBottomWidth: 1,        
        borderBottomColor:  '#6A5ACD', 
        color: '#c2bebe',        
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
    menuIcon: {
        width: 22,
        height: 22,
        marginRight: 15,
    },

})

export default styles;