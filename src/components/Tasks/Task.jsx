import React, { useState } from "react";
import styles from "./task.module.css";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Todo = ({ column, tasks, data, setData }) => {
  const [newTask, setNewTask] = useState("");
  const [input, setInput] = useState("")

  const handleAddTask = () => {
    const newTaskid = Object.keys(data.tasks).length + 1;

    setData((prev) => {
      const newData = {
        ...prev,
      }
      const newTask = {
        id: newTaskid,
        content: input
      }
      newData.tasks[newTaskid] = newTask
      newData.columns[`${column.id}`].taskIds.push(newTaskid)
      return newData
    });
    document.getElementById("inputBox").value = "";
    setInput(null)
  }

  return (
    <div className={styles.taskFull}>
      <div className={styles.taskUpperText}>{column.title}</div>
      <Droppable droppableId={column.id}>
        {(droppableProvided, droppableSnapshot) => (
          <div
            className={styles.taskList}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks &&
              tasks.map((task, index) => (
                <Draggable
                  key={task.id}
                  draggableId={`${task.id}`}
                  index={index}
                >
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      className={styles.particularTask}
  
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                    >
                      {task.content}
                    </div>
                  )}
                </Draggable>
              ))}
            <div>
              <div className={styles.inputTask}>
                <input
                id="inputBox"
                onChange={(e) => setInput(e.target.value)}
                  style={{
                    width: "94%",
                    outline: "none",
                    borderRadius: "4px",
                    padding: "10px",
                    border: "1px solid var(--border-border-subtle, #EBEBEB)",
                  }}
                  placeholder="Add Task..."
                />
              </div>
              <div style={{display:"flex", float:"right", margin:"5px 0px 5px 0px"}}>
                <button onClick={handleAddTask} style={{padding:"6px 20px 6px 20px", borderRadius:"4px", border:"none", backgroundColor:"Black", color:"white"}}>Add</button>
              </div>
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Todo;
