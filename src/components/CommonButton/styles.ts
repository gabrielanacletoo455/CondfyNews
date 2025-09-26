import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#6A5ACD',
        borderWidth: 1,
        borderColor: '#222',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    disabledButton: {
        backgroundColor: '#666', 
        opacity: 0.5, 
    },
    textButton: {
        fontSize: 14,
        color: '#FFF',
        textAlign: 'center',
    },
    disabledText: {
        color: '#999', 
    },
})

export default styles;