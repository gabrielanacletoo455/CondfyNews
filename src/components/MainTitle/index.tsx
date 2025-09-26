import { Text, StyleSheet } from "react-native";

export interface MainTitleProps {
    title: string;
}
const MainTitle = ({ title }: MainTitleProps) => {
    return (
        <Text style={styles.title}>{title}</Text>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6A5ACD',
        marginTop: 1,
        marginBottom: 15,
    }
})
export default MainTitle;