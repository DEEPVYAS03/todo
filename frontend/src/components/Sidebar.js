import React from 'react';

const Sidebar = ({ setFilter }) => (
  <div className="w-full md:w-64 bg-gray-900 text-white p-4 space-y-4 md:flex md:flex-col md:fixed">
    <div className="flex items-center space-x-3">
    <img src="https://static.vecteezy.com/system/resources/previews/003/529/153/non_2x/business-to-do-list-flat-icon-modern-style-vector.jpg" alt="User" class="rounded-full w-10 h-10 object-cover"/>

      <span className="font-semibold">Todo List</span>
    </div>
    <nav className="space-y-2 flex flex-col">
      <button onClick={() => setFilter('all')} className="block py-2 px-4 bg-gray-800 rounded w-full text-left md:text-center">All Tasks</button>
      <button onClick={() => setFilter('completed')} className="block py-2 px-4 hover:bg-gray-700 rounded w-full text-left md:text-center">Completed</button>
      <button onClick={() => setFilter('incomplete')} className="block py-2 px-4 hover:bg-gray-700 rounded w-full text-left md:text-center">Incomplete</button>
    </nav>
  </div>
);

export default Sidebar;
