import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

export default function App() {
  const [taskItem, setTaskItem] = useState([]);

  const handleNewTask = (task) => {
    setTaskItem([...taskItem, task]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.taskWrapper}>
          <Text style={styles.title}>Your Tasks</Text>
          <View style={styles.items}>
            {taskItem.map((item) => {
              return <Task text={item} />;
            })}
          </View>
        </View>
      </ScrollView>
      <AddTask newTask={(task) => handleNewTask(task)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
});
