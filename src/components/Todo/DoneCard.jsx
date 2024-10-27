/* eslint-disable react/prop-types */
import { useState } from "react";
import { formatDate } from "../../utils/formateDate";
import Bin from "../svg/Bin";
import Pencil from "../svg/Pencil";
import EditTodo from "./EditTodo";

const DoneCard = (props) => {
  const { task, deleteTask } = props;
  const [showAddModal, setShowAddModal] = useState(false);

  // edit task
  const handleModalClose = () => {
    setShowAddModal(false);
  };
  const handleModalOpen = () => {
    setShowAddModal(true);
  };
  return (
    <>
      {showAddModal && <EditTodo task={task} onClose={handleModalClose} />}
      <div className="mb-4 rounded-lg bg-gray-800 p-4">
        <div className="flex justify-between">
          <h4 className="mb-2 font-semibold text-teal-500">
            {props?.task?.taskName}
          </h4>
          <div className="flex gap-2 items-start ">
            <button onClick={() => deleteTask(props?.task?.id)}>
              <Bin />
            </button>
            <button onClick={() => handleModalOpen(props.task)}>
              <Pencil />
            </button>
          </div>
        </div>
        <p className="mb-2 text-sm text-zinc-200">{props?.task?.description}</p>

        <p className="mt-6 text-xs text-zinc-400">
          {formatDate(props?.task?.dueDate)}
        </p>
      </div>
    </>
  );
};

export default DoneCard;
