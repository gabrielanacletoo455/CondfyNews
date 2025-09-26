import { View, StyleSheet } from 'react-native';

interface RowContainerProps {
    children: React.ReactNode;
    justifyContent?: 'space-between' | 'center' | 'flex-start' | 'flex-end';
    alignItems?: 'center' | 'flex-start' | 'flex-end';
    marginVertical?: number;
    paddingHorizontal?: number;
}

const RowContainer = ({ children, justifyContent = 'space-between', alignItems = 'center', marginVertical = 0, paddingHorizontal = 0 }: RowContainerProps) => {
    return (
        <View style={[styles.container, { justifyContent, alignItems, marginVertical, paddingHorizontal }]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default RowContainer;