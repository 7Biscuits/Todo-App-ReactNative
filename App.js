import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "./components/Task";
import AddTask from "./components/AddTask";

export default function App() {
  const [taskItem, setTaskItem] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem("tasks");
      if (savedTasks !== null) {
        setTaskItem(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error("Error loading todos from AsyncStorage:", error);
    }
  };

  const handleNewTask = (task) => {
    setTaskItem([...taskItem, task]);
    saveTask(taskItem);
  };

  const saveTask = async (task) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(task));
    } catch (error) {
      console.error("Error saving todos to AsyncStorage:", error);
    }
  };

  const deleteTask = async (taskToDelete) => {
    const updatedTaskItem = taskItem.filter((task) => task !== taskToDelete);
    setTaskItem(updatedTaskItem);
    saveTask(updatedTaskItem);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTaskItem = [...taskItem];
    updatedTaskItem[index].completed = !updatedTaskItem[index].completed;
    setTaskItem(updatedTaskItem);
    saveTask(updatedTaskItem);
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
            {taskItem.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item.task}
                  toggleTaskCompleted={() => toggleTaskCompletion(index)}
                  taskCompleted={taskItem[index].completed}
                />
              );
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
