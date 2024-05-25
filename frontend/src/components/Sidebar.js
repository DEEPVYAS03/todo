import React, { useState } from 'react';

const Sidebar = ({ setFilter }) => {
  const [activeFilter, setActiveFilter] = useState('all');

  const handleFilterClick = (filter) => {
    setFilter(filter);
    setActiveFilter(filter);
  };

  const buttonClasses = (filter) => (
    `block py-2 px-4 rounded w-full text-left md:text-center ${
      activeFilter === filter ? 'bg-gray-800' : 'hover:bg-gray-700'
    }`
  );

  return (
    <div className="w-full md:w-64 bg-gray-900 text-white p-4 space-y-4 md:flex md:flex-col md:fixed">
      <div className="flex items-center space-x-3">
        <img src="https://static.vecteezy.com/system/resources/previews/003/529/153/non_2x/business-to-do-list-flat-icon-modern-style-vector.jpg" alt="User" className="rounded-full w-10 h-10 object-cover" />
        <span className="font-semibold">Todo List</span>
      </div>
      <nav className="space-y-2 flex flex-col">
        <button onClick={() => handleFilterClick('all')} className={buttonClasses('all')}>All Tasks</button>
        <button onClick={() => handleFilterClick('completed')} className={buttonClasses('completed')}>Completed</button>
        <button onClick={() => handleFilterClick('incomplete')} className={buttonClasses('incomplete')}>Incomplete</button>
      </nav>
    </div>
  );
};

export default Sidebar;
