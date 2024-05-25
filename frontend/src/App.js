import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import { v4 as uuidv4 } from 'uuid';

const initialTasks = [
  { id: uuidv4(), title: "Hello World", description: "Hello World here...", date: "2023-11-03", status: "Completed" },
  { id: uuidv4(), title: "Update Passwords", description: "Review online accounts and update passwords for better security. Use a password manager to keep track.", date: "2023-10-13", status: "Completed" },
  { id: uuidv4(), title: "Watch a video from Fireship", description: "Enroll in That Weird JavaScript Course by Fireship.io", date: "2023-11-10", status: "Incomplete" },
  { id: uuidv4(), title: "Attend Yoga Class", description: "Join the local yoga studio's session this weekend to relax and improve flexibility.", date: "2023-10-27", status: "Incomplete" },
  { id: uuidv4(), title: "Dentist Appointment", description: "Schedule a 6-month check-up with the dentist.", date: "2023-10-25", status: "Completed" },
];

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [viewingTask, setViewingTask] = useState(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return task.status === 'Completed';
    if (filter === 'incomplete') return task.status === 'Incomplete';
    return true;
  });

  const saveTask = (task) => {
    if (task.id) {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
    } else {
      task.id = uuidv4();
      setTasks([...tasks, task]);
    }
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      <div className="w-full md:w-64 md:fixed md:h-full">
        <Sidebar setFilter={setFilter} />
      </div>
      <main className="flex-1 p-6 overflow-y-auto mt-16 md:mt-0 md:ml-64">
        <h1 className="text-2xl font-semibold mb-6">All Tasks</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onEdit={setEditingTask} onView={setViewingTask} />
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
