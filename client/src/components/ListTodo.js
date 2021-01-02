import React, { Fragment, useState, useEffect } from 'react';
import EditTodo from './EditTodo';

function ListTodo() {
  const [todos, setTodos] = useState([]);
  //console.log(todos);

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5000/todos');
      const data = await response.json(); // Parse json data
      setTodos(data);
      // console.log(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
    return () => {};
  }, [todos]);

  // Delete function
  const deleteTodo = async (todo_id) => {
    try {
      const deleteTodo = await fetch(`http://localhost:5000/todos/${todo_id}`, {
        method: 'DELETE',
      });
    //console.log(deleteTodo);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <table className='table table-hover mt-5 text-center'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos
            .map((todo) => {
              return (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td><EditTodo todo={todo} /></td>
                  <td>
                    <button className='btn btn-danger'
                      onClick={() => {
                        deleteTodo(todo.todo_id);
                      }}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
            }
        </tbody>
      </table>
    </Fragment>
  );
}

export default ListTodo;
