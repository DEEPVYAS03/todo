import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const TaskForm = ({ onSave, taskToEdit, onCancel }) => {
  const [task, setTask] = useState({
    _id: null,
    title: '',
    description: '',
    date: '',
    status: 'Incomplete',
  });

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        ...taskToEdit,
        date: taskToEdit.date ? format(new Date(taskToEdit.date), 'yyyy-MM-dd') : '',
        status: taskToEdit.status || 'Incomplete',
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(task);
    setTask({
      _id: null,
      title: '',
      description: '',
      date: '',
      status: 'Incomplete',
    });
  };

  return (
    <div className="p-4 bg-gray-800 rounded-lg text-white w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">{task._id ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={task.date}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white"
          >
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div className="flex space-x-2">
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">
            Save
          </button>
          <button type="button" onClick={onCancel} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
