import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

const Task = (props) => {

  return (
    <View>
      <TouchableOpacity onPress={() => props.toggleTaskCompleted()} onLongPress={() => props.deleteTask()}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>{props.text}</Text>
          </View>
          <View style={props.taskCompleted ? styles.circularFilled : styles.circularEmpty}></View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: "#AD03DE",
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: "80%",
  },
  circularEmpty: {
    width: 12,
    height: 12,
    borderColor: "#AD03DE",
    borderWidth: 2,
    borderRadius: 5,
  },
  circularFilled: {
    width: 12,
    height: 12,
    borderColor: "#AD03DE",
    backgroundColor: "#AD03DE",
    borderWidth: 2,
    borderRadius: 5,
  }
});

export default Task;
