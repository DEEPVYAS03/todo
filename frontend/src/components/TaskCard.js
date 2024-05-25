import React from 'react';
import { format } from 'date-fns';

const TaskCard = ({ task, onDelete, onEdit, onView, onComplete }) => {
  // Format the date
  const formattedDate = task.date ? format(new Date(task.date), 'MMMM d, yyyy') : 'No date';

  return (
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
        <span className="text-xs">{formattedDate}</span>
        <span className={`text-xs px-2 py-1 rounded-full ${task.status === 'Completed' ? 'bg-green-600' : 'bg-red-600'}`}>
          {task.status || 'Incomplete'}
        </span>
      </div>
      <div className="mt-auto flex space-x-2">
        <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded">Edit</button>
        <button onClick={(e) => { e.stopPropagation(); onDelete(task._id); }} className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded">Delete</button>
        {task.status !== 'Completed' && (
          <button onClick={(e) => { e.stopPropagation(); onComplete(task); }} className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded">Add To Complete</button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
