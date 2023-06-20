// src/App.tsx

import React, { useState } from "react";
import { Input, Button, List } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  addTask,
  updateTask,
  deleteTask,
  markTaskComplete,
  // reorderTasks,
} from "./redux/toDoSlice";
import { RootState } from "./redux/store";

const App: React.FC = () => {
  const [taskInput, setTaskInput] = useState("");
  const tasks = useSelector((state: RootState) => state.todo.tasks);
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (taskInput.trim() !== "") {
      dispatch(addTask(taskInput));
      setTaskInput("");
    }
  };

  const handleUpdateTask = (
    taskId: number,
    title: string,
    completed: boolean
  ) => {
    dispatch(updateTask({ id: taskId, title, completed }));
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  const handleMarkTaskComplete = (taskId: number) => {
    dispatch(markTaskComplete(taskId));
  };
  

  // const handleReorderTasks = (
  //   sourceIndex: number,
  //   destinationIndex: number
  // ) => {
  //   dispatch(reorderTasks({ sourceIndex, destinationIndex }));
  // };

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-[60%] mt-[10vh]">
        <Input
          placeholder="Add Task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-[80%]"
        />
        <Button className="ml-[20px]" onClick={handleAddTask}>
          Add
        </Button>
      </div>
      <div className="w-[40%]">
        <List
          dataSource={tasks}
          renderItem={(task) => (
            <List.Item>
              <Input
                value={task.title}
                onChange={(e) =>
                  handleUpdateTask(task.id, e.target.value, task.completed)
                }
                disabled={task.completed}
              />
              <Button className="ml-[20px]" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              <Button
                onClick={() => handleMarkTaskComplete(task.id)}
                className="ml-[20px]"
              >
                {task.completed ? "Incomplete" : "Complete"}
              </Button>
            </List.Item>
          )}
          // onDragEnd={({ source, destination }) => {
          //   if (destination) {
          //     handleReorderTasks(source.index, destination.index);
          //   }
          // }}
          // draggable
        />
      </div>
    </div>
  );
};

export default App;
