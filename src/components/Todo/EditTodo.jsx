/* eslint-disable react/prop-types */
import { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

const EditTodo = (props) => {
  const { task, onClose } = props;
  const [errors, setErrors] = useState({});
  const { editTask } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const taskName = form.taskName.value.trim();
    const description = form.description.value.trim();
    const dueDate = form.dueDate.value;
    const category = form.category.value;
    const id = task.id;

    const updatedTask = { id, taskName, description, dueDate, category };

    const newErrors = {};

    if (!taskName) newErrors.taskName = "Task name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!dueDate) newErrors.dueDate = "Due date is required.";
    if (!category) newErrors.category = "Category is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    editTask(updatedTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50">
      <div className="w-full max-w-md rounded-lg bg-gray-800 shadow-xl">
        <div className="p-6">
          <h2 className="mb-6 text-2xl font-bold text-green-400">
            Update Task
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="taskName"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Task Name
              </label>
              <input
                type="text"
                id="taskName"
                name="taskName"
                defaultValue={task.taskName}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.taskName && (
                <p className="text-red-500 text-sm mt-1">{errors.taskName}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={task.description}
                rows="3"
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                defaultValue={task.dueDate}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.dueDate && (
                <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="category"
                className="mb-1 block text-sm font-medium text-gray-300"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                defaultValue={task.category}
                className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white shadow-sm focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select a category</option>
                <option value="todo">To-Do</option>
                <option value="onprogress">On Progress</option>
                <option value="done">Done</option>
                <option value="revised">Revised</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={onClose}
                type="button"
                className="rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTodo;
