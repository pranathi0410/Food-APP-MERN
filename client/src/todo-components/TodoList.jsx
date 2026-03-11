import "../App.css";
import { useState } from "react";
function TodoList({ todoList, setTodoList, deleteTask, toggleTask }) {
    const [isEditing, setIsEditing] = useState(null);
    const [input,setInput] = useState("");
    function handleToggleTask(task) {
        toggleTask(task);
    }
    function handleEditTask(task) {
        setIsEditing(task);
    }

    function handleSaveTask(task) {
        if (input === "") return;
        const updatedList = todoList.map((t) =>
            t.id === task.id ? { ...t, name: input } : t)
        setTodoList(updatedList)
        setIsEditing(null);
        setInput("");
    }

    function handleDeleteTask(task) {
        deleteTask(task);
    }
    return (
        todoList.length === 0 ? <p>No tasks available.</p> :
            <ul>
                {todoList.map((task) => (
                    <li className="list-item" key={task.id}>

                        {  isEditing?.id === task.id ? (
                            <>
                                {
                                    <>
                                    <input type="text" onChange={(e) => setInput(e.target.value)} value={input}/>
                                    <button onClick={()=> handleSaveTask(task)}>Save</button>
                                    <button onClick={()=> setIsEditing(null)}>Cancel</button>
                                    </>
                                }
                            </>) : (
                            <>
                                <span style={{ textDecoration: task.isCompleted ? "line-through" : "none" }} onClick={() => handleToggleTask(task)}> {task.name}</span>
                                <button onClick={() => handleEditTask(task)}>Edit</button>
                                <button onClick={() => handleDeleteTask(task)}>delete</button>
                            </>

                        )

                        }
                    </li>
                ))}
            </ul>
    )
}

export default TodoList;