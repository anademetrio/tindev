import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        backgroundColor: '#fff',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 0
    },
    button: {
        height: 46,
        alignSelf: 'stretch',
        borderRadius: 4,
        marginTop: 20,
        backgroundColor: '#df4723',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default styles;