import React, { useState, useEffect, Suspense } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import { DragDropContext } from "react-beautiful-dnd";
import LazyTask from "./../Tasks/LazyTask";

const initialData = {
  tasks: {
    1: { id: 1, content: "There are users" },
    2: { id: 2, content: "Users can create boards" },
    3: { id: 3, content: "Boards have stages like Todo" },
    4: { id: 4, content: "Stages have tasks" },
    5: { id: 5, content: "There are users" },
    6: { id: 6, content: "Users can create boards" },
    7: { id: 7, content: "Boards have stages like Todo" },
    8: { id: 8, content: "Stages have tasks" },
    9: { id: 9, content: "There are users" },
    10: { id: 10, content: "Users can create boards" },
    11: { id: 11, content: "Boards have stages like Todo" },
    12: { id: 12, content: "Stages have tasks" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: [1, 2, 11, 7],
    },
    "column-2": {
      id: "column-2",
      title: "Doing",
      taskIds: [5, 6, 8, 3, 4],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [9, 10, 12],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

const reorderColumnList = (sourceCol, startIndex, endIndex) => {
  const newTaskIds = Array.from(sourceCol.taskIds);
  const [removed] = newTaskIds.splice(startIndex, 1);
  newTaskIds.splice(endIndex, 0, removed);

  const newColumn = {
    ...sourceCol,
    taskIds: newTaskIds,
  };

  return newColumn;
};
const Home = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceCol = data.columns[source.droppableId];
    const destinationCol = data.columns[destination.droppableId];

    if (sourceCol.id === destinationCol.id) {
      const newColumn = reorderColumnList(
        sourceCol,
        source.index,
        destination.index
      );

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };
      setData(newState);
      return;
    }
    const startTaskIds = Array.from(sourceCol.taskIds);
    const [removed] = startTaskIds.splice(source.index, 1);
    const newStartCol = {
      ...sourceCol,
      taskIds: startTaskIds,
    };

    const endTaskIds = Array.from(destinationCol.taskIds);
    endTaskIds.splice(destination.index, 0, removed);
    const newEndCol = {
      ...destinationCol,
      taskIds: endTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      },
    };

    setData(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.wholeHomePage}>
        <Navbar />
        <div>
          <div
            style={{
              margin: "20px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {data &&
              data?.columnOrder?.map((columnId) => {
                const column = data.columns[columnId];
                const tasks = column?.taskIds?.map(
                  (taskId) => data.tasks[taskId]
                );
                return (
                  <LazyTask
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    data={data}
                    setData={setData}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Home;
