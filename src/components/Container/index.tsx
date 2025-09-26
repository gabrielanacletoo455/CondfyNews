import { View, StyleSheet } from "react-native";


const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a1a1a',
        padding: 10,
    },
});

export default Container;