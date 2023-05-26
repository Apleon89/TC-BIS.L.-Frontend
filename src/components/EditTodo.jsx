import axios from "axios";
import { useEffect, useState } from "react";

function EditTodo(props) {
  const [editTodo, setEditTodo] = useState("");

  useEffect(() => {
    setEditTodo(props.todo.name);
  }, []);

  const updateTodo = async () => {
    try {
      await axios.patch(`http://localhost:5005/todos/${props.todo._id}`, {
        todoName: editTodo,
      });
      props.getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={editTodo}
        onChange={(e) => setEditTodo(e.target.value)}
      />
      <button onClick={updateTodo}>Editar</button>
    </div>
  );
}

export default EditTodo;
