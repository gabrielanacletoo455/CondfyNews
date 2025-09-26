import { View, StyleSheet } from "react-native";
export interface DividerProps {
    color?: string;
    height?: number;
    marginBottom?: number;
    marginTop?: number;
    width?: string | number;
}
const Divider = ({ color, height = 1, marginBottom = 0 , marginTop = 0, width = '100%' }: DividerProps) => {
    return (
        <View style={[styles.divider, { backgroundColor: color, height, marginBottom, marginTop, width: width as number }]} />
    )
}

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: '#222',
    },
})


export default Divider;