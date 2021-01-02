import React, { Fragment, useState } from 'react';

function InputTodo() {
  const [description, setDescription] = useState('');

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
    //console.log(description);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      //window.location = '/';
      console.log(response);
      setDescription('');
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className='text-center mt-5'>PERN Todo List</h1>
      <form onSubmit={onSubmitForm} className='d-flex'>
        <div className='input-group mb-3 my-5'>
          <input
            type='text'
            className='form-control'
            placeholder='Add Todo'
            aria-label="Add Todo"
            aria-describedby='button-addon2'
            value={description}
            onChange={onChangeDescription}
          />
          <button className='btn btn-success' type='submit'>
            Add
          </button>
        </div>
      </form>
    </Fragment>
  );
}

export default InputTodo;
