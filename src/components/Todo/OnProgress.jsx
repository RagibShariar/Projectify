import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import SortIcon from "../svg/SortIcon";
import OnProgressCard from "./OnProgressCard";

const OnProgress = () => {
  const { tasks, deleteTask, sortTasksByDate, searchTerm } = useTodo();
  const [sortOrder, setSortOrder] = useState("asc");

  // Toggle sort order and sort tasks
  const handleSortToggle = (category) => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newOrder);
    sortTasksByDate(newOrder, category);
  };

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mb-4 w-full px-2 sm:w-1/2 md:w-1/4">
        <div className="rounded-lg bg-yellow-500 p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              On Progress (
              {
                filteredTasks.filter((task) => task.category === "onprogress")
                  .length
              }
              )
            </h3>
            <button onClick={() => handleSortToggle("onprogress")}>
              <SortIcon />
            </button>
          </div>

          <div>
            {filteredTasks.filter((task) => task.category === "onprogress")
              .length === 0
              ? "Task List is empty!"
              : filteredTasks
                  .filter((task) => task.category === "onprogress")
                  .map((task) => (
                    <OnProgressCard
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      sortTasksByDate={sortTasksByDate}
                    />
                  ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OnProgress;
