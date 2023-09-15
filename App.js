import { StyleSheet, View, ScrollView, Alert } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
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
      Alert.alert("Error loading tasks from AsyncStorage:", error);
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
      Alert.alert("Error saving tasks to AsyncStorage:", error);
    }
  };

  const deleteTask = async (index) => {
    Alert.alert("Delete task", "Do you want to delete this task?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          const updatedTaskItem = [...taskItem];
          updatedTaskItem.splice(index, 1);
          setTaskItem(updatedTaskItem);
          saveTask(updatedTaskItem);
        },
      },
    ]);
  };

  const clearTasks = () => {
    if (taskItem.length == 0) {
      Alert.alert("No tasks to clear", "You haven't added any task");
      return;
    }
    Alert.alert("Clear all tasks", "Do you want to clear all tasks?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setTaskItem([]);
          saveTask([]);
        },
      },
    ]);
  }

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
          <Header clearTasks={() => clearTasks()} />
          <View style={styles.items}>
            {taskItem.map((item, index) => {
              return (
                <Task
                  key={index}
                  text={item.task}
                  toggleTaskCompleted={() => toggleTaskCompletion(index)}
                  taskCompleted={taskItem[index].completed}
                  deleteTask={() => deleteTask(index)}
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
    backgroundColor: "#000",
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
