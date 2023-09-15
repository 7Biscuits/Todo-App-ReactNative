import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

const Header = (props) => {
    return (
        <View style={styles.headerWrapper}>
            <Text style={styles.title}>Your Tasks</Text>
            <TouchableOpacity onPress={() => props.clearTasks()} style={styles.clearButton}>
                <Text style={{ color: "#AD03DE" }}>Clear Tasks</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    headerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    title: {
        fontSize: 35,
        fontWeight: "bold",
        color: "#FFF"
    },
    clearButton: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
    },
});

export default Header;
