
import { useState } from "react";
function TodoInput({addTask}){
    const [input,setInput]=useState("");

    function handleAdd(){
            addTask(input);
            setInput("");
    }
    return (
        <>
        <input
        type="text"
        placeholder="Add a new task"
       value={input}
       onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleAdd}>add</button>
      </>

    )
}

export default TodoInput;