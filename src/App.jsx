import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import EditTodo from "./components/EditTodo";

function App() {
  const [allTodos, setAllTodos] = useState(null);
  const [addTodo, setAddTodo] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:5005/todos/");
      setAllTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const newTodo = (e) => {
    e.preventDefault();
    const todo = {
      todoName: addTodo,
    };
    const sendData = async () => {
      try {
        await axios.post("http://localhost:5005/todos/", todo);
        setAddTodo("");
        getData();
      } catch (error) {
        console.log(error);
      }
    };
    sendData();
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/todos/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1>Añadir Tarea:</h1>
      <form>
        <input
          type="text"
          value={addTodo}
          onChange={(e) => setAddTodo(e.target.value)}
        />
        <button onClick={newTodo}>Añadir</button>
      </form>
      <h2>Lista de Tareas:</h2>
      {allTodos ? (
        allTodos.map((eachTodo) => (
          <div key={eachTodo._id}>
            <h4>- {eachTodo.name}</h4>
            <button onClick={() => deleteTodo(eachTodo._id)}>Eliminar</button>
            <EditTodo todo={eachTodo} getData={getData} />
          </div>
        ))
      ) : (
        <h6>...Buscando</h6>
      )}
    </>
  );
}

export default App;
