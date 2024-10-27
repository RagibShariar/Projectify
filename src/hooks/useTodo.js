import { useContext } from "react";

// ... rest of the code ...import { useContext } from 'react';
import { TodoContext } from "../reducers/todoReducer";

export const useTodo = () => useContext(TodoContext);
