import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        console.log('Tasks:', response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'Completed';
    if (filter === 'incomplete') return task.status === 'Incomplete';
    return true;
  });

  const saveTask = async (task) => {
    if (task._id) {
      try {
        const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, task);
        setTasks(tasks.map(t => (t._id === task._id ? response.data : t)));
      } catch (error) {
        console.error('Error updating task:', error);
      }
    } else {
      try {
        const response = await axios.post('http://localhost:5000/api/tasks', task);
        setTasks([...tasks, response.data]);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
    setEditingTask(null);
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const completeTask = async (task) => {
    try {
      const updatedTask = { ...task, status: 'Completed' };
      const response = await axios.put(`http://localhost:5000/api/tasks/${task._id}`, updatedTask);
      setTasks(tasks.map(t => (t._id === task._id ? response.data : t)));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const getHeading = () => {
    switch (filter) {
      case 'completed':
        return 'Completed Tasks';
      case 'incomplete':
        return 'Pending Tasks';
      default:
        return 'Your Task List';
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <div className="w-full md:w-64 md:fixed md:h-full">
        <Sidebar setFilter={setFilter} />
      </div>
      <main className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0 md:ml-64">
        <h1 className="text-2xl font-semibold mb-6">{getHeading()}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task._id} task={task} onDelete={deleteTask} onEdit={setEditingTask} onView={setViewingTask} onComplete={completeTask} />
          ))}
          <div className="p-4 bg-gray-700 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-600" onClick={() => setEditingTask({})}>
            <span className="text-xl">+ Add New Task</span>
          </div>
        </div>
      </main>
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <TaskForm onSave={saveTask} taskToEdit={editingTask} onCancel={() => setEditingTask(null)} />
        </div>
      )}
      {viewingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-gray-800 p-4 rounded-lg text-white w-full max-w-lg overflow-auto">
            <h2 className="text-xl font-semibold mb-4">{viewingTask.title}</h2>
            <p className="mb-4 break-words">{viewingTask.description}</p>
            <p className="mb-4"><strong>Date:</strong> {viewingTask.date}</p>
            <p className="mb-4"><strong>Status:</strong> {viewingTask.status}</p>
            <button onClick={() => setViewingTask(null)} className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
