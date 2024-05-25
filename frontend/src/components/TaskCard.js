import React from 'react';

const TaskCard = ({ task, onDelete, onEdit, onView }) => (
  <div
    className={`p-4 rounded-lg shadow-md ${task.status === 'Completed' ? 'bg-gray-800' : 'bg-gray-700'} text-white w-full flex flex-col cursor-pointer`}
    onClick={() => onView(task)}
  >
    <div className="mb-2">
      <h3 className="text-xl font-semibold">{task.title}</h3>
    </div>
    <div className="mb-4 overflow-hidden overflow-ellipsis">
      <p className="text-sm">{task.description}</p>
    </div>
    <div className="flex justify-between items-center mb-4">
      <span className="text-xs">{task.date}</span>
      <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'Completed' ? 'bg-green-600' : 'bg-red-600'}`}>
        {task.status || 'Incomplete'}
      </span>
    </div>
    <div className="mt-auto flex space-x-2">
      <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded">Edit</button>
      <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
    </div>
  </div>
);

export default TaskCard;
