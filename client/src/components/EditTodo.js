import React, { Fragment, useState } from 'react';

function EditTodo({ todo }) {
  // console.log(todo);
  const [description, setDescription] = useState(todo.description);

  const onDescriptionChange = (e) => {
      setDescription(e.target.value);
  }

  // Update Description function
  const updateDescription = async (e) => {
      e.preventDefault();
      try {
          const body = { description };
          const response = await fetch(`http://localhost:5000/todos/${todo.todo_id}`, {
              method: "PUT",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
          })
          console.log(response);

      } catch (err) {
          console.error(err.message);
      }
  }

  return (
    <Fragment>
      <button
        type='button'
        class='btn btn-warning'
        data-bs-toggle='modal'
        // Change to unique id
        data-bs-target={`#id${todo.todo_id}`}>
        Edit
      </button>

      <div
        class='modal fade'
        // Change to unique id
        id={`id${todo.todo_id}`}
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
        // Resets the description when you click outside the modal
        onClick={() => setDescription(todo.description)}>
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Edit Todo
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                // Resets the description when you click on X
                onClick={() => setDescription(todo.description)}></button>
            </div>
            <div class='modal-body'>
              <input
                type='text'
                className='form-control'
                value={description}
                onChange={onDescriptionChange}
              />
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-warning'
                onClick={(e) => updateDescription(e)}>
                Edit
              </button>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
                // Resets the description when you click on Close button
                onClick={() => setDescription(todo.description)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default EditTodo;
