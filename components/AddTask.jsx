import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

const AddTask = (props) => {
  const [task, setTask] = useState();

  const addTask = (task) => {
    if (task == null) return;
    props.newTask({ task: task, completed: false });
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.writeTaskWrapper}
    >
      <TextInput
        style={styles.input}
        placeholder={"Write a task"}
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TouchableOpacity onPress={() => {
        Keyboard.dismiss();
        addTask(task);
        setTask(null);
      }}>
        <View style={styles.addWrapper}>
          <Text style={{color: "#FFF"}}>+</Text>
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#AD03DE",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddTask;
