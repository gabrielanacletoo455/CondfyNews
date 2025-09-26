import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CommonButtonProps } from "./types";
import styles from "./styles";


const CommonButton = ({ text, onPress, disabled, loading }: CommonButtonProps) => {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                disabled && styles.disabledButton ,
                
            ]} 
            onPress={onPress} 
            disabled={disabled}
        >
            <Text style={[
                styles.textButton,
                disabled && styles.disabledText
            ]}>
                {loading ? <ActivityIndicator size="small" color="#FFF" /> : text}
            </Text>
        </TouchableOpacity>
    )
}




export default CommonButton;