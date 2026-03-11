import TodoHeader from "./TodoHeader";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useState } from "react";
export default function Todo() {
   const [todoList,setTodoList]=useState([]);
   
   function addTask(input){
     if(input==="") return;
     setTodoList([
         ...todoList,
         {
           id: Date.now(),
           name: input,
           isCompleted: false
         }
       ]);
   }
   
   function deleteTask(task){
   const updatedList = todoList.filter(t => t.id !== task.id)
   setTodoList(updatedList)
   }
   
   function toggleTask(task){
     const message = task.isCompleted ? "do you want to mark " + task.name.toUpperCase() + " as not done?" : "do you want to mark " + task.name.toUpperCase() + " as done?"
          const response = window.confirm(message)
          if(!response) return;
           const updatedTodoList = todoList.map((t) =>
               t.id === task.id ? { ...t, isCompleted: !t.isCompleted } : t
           )
           setTodoList(updatedTodoList)
   }
    return (
         <ul>
    <TodoHeader />
      <TodoInput addTask={addTask} />
   <TodoList todoList={todoList} setTodoList={setTodoList} deleteTask={deleteTask} toggleTask={toggleTask}/>
    
  </ul>
    )
}