import { Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";

interface CancelSaveButtonsProps {
    cancelButton: string;
    saveButton: string;
    onCancel: () => void;
    onSave: () => void;
    isLoading: boolean;
}


const CancelSaveButtons = ({ cancelButton, saveButton, onCancel, onSave, isLoading }: CancelSaveButtonsProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onCancel}  style={styles.cancelButton} disabled={isLoading}>
              <Text style={styles.textButton}>{cancelButton}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} style={styles.saveButton} disabled={isLoading}>
              <Text style={styles.textButton}>{ isLoading ? <ActivityIndicator size="small" color="#FFF" /> : saveButton}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    cancelButton:{
        backgroundColor: '#666',
        borderWidth: 1,
        borderColor: '#222',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        marginRight: 10,
        paddingHorizontal: 20,
    },
    saveButton: {
        backgroundColor: '#6A5ACD',
        borderWidth: 1,
        borderColor: '#222',
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 20,
    },
    textButton: {
        color: '#FFF',
        textAlign: 'center',
    },
});


export default CancelSaveButtons;