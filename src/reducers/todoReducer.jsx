/* eslint-disable react/prop-types */
import { createContext, useReducer } from "react";

// Task actions
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const SORT_TASKS = "SORT_TASKS";
const SET_SEARCH_TERM = "SET_SEARCH_TERM";

// Initial state
const initialState = {
  tasks: [
    {
      id: 1,
      taskName: "Learn React JS",
      description: "Complete the official React documentation tutorial.",
      dueDate: "2024-11-01",
      category: "todo",
    },
    {
      id: 2,
      taskName: "Finish Next.js project",
      description: "Deploy the Next.js application to Vercel.",
      dueDate: "2024-10-15",
      category: "todo",
    },
    {
      id: 3,
      taskName: "Explore React Native",
      description: "Build a simple mobile app using React Native.",
      dueDate: "2024-11-20",
      category: "todo",
    },
    {
      id: 4,
      taskName: "Implement Redux",
      description: "Integrate Redux for state management in the React app.",
      dueDate: "2024-10-30",
      category: "onprogress",
    },
    {
      id: 11,
      taskName: "Update Documentation",
      description: "Revise the project documentation for clarity.",
      dueDate: "2024-11-17",
      category: "onprogress",
    },
    {
      id: 5,
      taskName: "Write Unit Tests",
      description: "Create unit tests for the React components.",
      dueDate: "2024-10-25",
      category: "done",
    },
    {
      id: 6,
      taskName: "Refactor Code",
      description:
        "Refactor the codebase for better readability and performance.",
      dueDate: "2024-11-05",
      category: "done",
    },
    {
      id: 7,
      taskName: "Gather Feedback",
      description: "Collect feedback from users on the latest app version.",
      dueDate: "2024-11-02",
      category: "revised",
    },
    {
      id: 8,
      taskName: "Update Documentation",
      description: "Revise the project documentation for clarity.",
      dueDate: "2024-11-10",
      category: "revised",
    },
    {
      id: 9,
      taskName: "Plan Next Sprint",
      description: "Organize tasks and goals for the next sprint.",
      dueDate: "2024-11-15",
      category: "revised",
    },
    {
      id: 10,
      taskName: "Learn TypeScript",
      description: "Start learning TypeScript for better type safety.",
      dueDate: "2024-12-01",
      category: "todo",
    },
  ],
  searchTerm: "",
};

// Reducer function
const todoReducer = (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, id: Date.now() }],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? { ...task, ...action.payload } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload.id),
      };
    case SORT_TASKS:
      return {
        ...state,
        tasks: [
          // Sort tasks within the selected category
          ...state.tasks
            .filter((task) => task.category === action.payload.category)
            .sort((a, b) =>
              action.payload.order === "asc"
                ? new Date(a.dueDate) - new Date(b.dueDate)
                : new Date(b.dueDate) - new Date(a.dueDate)
            ),
          // Keep tasks from other categories as they are
          ...state.tasks.filter(
            (task) => task.category !== action.payload.category
          ),
        ],
      };
    case SET_SEARCH_TERM: // Handle search term updates
      return {
        ...state,
        searchTerm: action.payload, // Update the search term
      };
    default:
      return state;
  }
};

// Create context
export const TodoContext = createContext();

// Context provider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  // Add task action
  const addTask = (task) => {
    dispatch({ type: ADD_TASK, payload: task });
  };

  // Edit task action
  const editTask = (task) => {
    dispatch({ type: EDIT_TASK, payload: task });
  };

  // Delete task action
  const deleteTask = (id) => {
    dispatch({ type: DELETE_TASK, payload: { id } });
  };
  // Sort tasks by date
  const sortTasksByDate = (order = "asc", category) => {
    dispatch({ type: SORT_TASKS, payload: { order, category } });
  };
  // Set search term
  const setSearchTerm = (term) => {
    dispatch({ type: SET_SEARCH_TERM, payload: term });
  };

  return (
    <TodoContext.Provider
      value={{
        tasks: state.tasks,
        searchTerm: state.searchTerm,
        addTask,
        editTask,
        deleteTask,
        sortTasksByDate,
        setSearchTerm,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
