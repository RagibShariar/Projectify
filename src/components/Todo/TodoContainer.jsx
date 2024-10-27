import { useState } from "react";

import { useTodo } from "../../hooks/useTodo";
import PlusIcon from "../svg/PlusIcon";
import AddTodo from "./AddTodo";
import Done from "./Done";
import OnProgress from "./OnProgress";
import Revise from "./Revise";
import Todo from "./Todo";

const TodoContainer = () => {
  const { tasks, addTask, editTask, deleteTask } = useTodo();

  const [showAddModal, setShowAddModal] = useState(false);

  const handleModalClose = () => {
    setShowAddModal(false);
  };
  const handleModalOpen = () => {
    setShowAddModal(true);
  };

  return (
    <>
      {showAddModal && <AddTodo onClose={handleModalClose} />}
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Projectify</h2>
          <div className="flex space-x-2">
            <button
              onClick={handleModalOpen}
              className="flex items-center rounded-md bg-gray-700 px-4 py-2 text-white"
            >
              <PlusIcon />
              Add
            </button>
          </div>
        </div>

        <div className="-mx-2 mb-6 flex flex-wrap">
          {/* <!-- Todo --> */}
          <Todo />
          {/* <!-- On Progress --> */}
          <OnProgress />
          {/* <!-- Done --> */}
          <Done />
          {/* <!-- Revised --> */}
          <Revise />
        </div>
      </div>
    </>
  );
};

export default TodoContainer;
