import { View, StyleSheet } from "react-native";


const MainContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 30,
        paddingBottom: 50,
    }
})
export default MainContainer;