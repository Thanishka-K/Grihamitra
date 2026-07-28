import { useState, useEffect } from 'react';

const LedgerView = ({ t, lang, userKey }) => {
  const storageKey = `grihamitra_ledger_tasks_${userKey || 'default'}`;

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : [
      { id: 1, textKey: 'task_1', completed: false },
      { id: 2, textKey: 'task_2', completed: false },
      { id: 3, textKey: 'task_3', completed: false }
    ];
  });

  const [newTask, setNewTask] = useState('');

  // Save tasks securely whenever they change
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
  }, [tasks, storageKey]);

  // Sync state if userKey changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    setTasks(saved ? JSON.parse(saved) : [
      { id: 1, textKey: 'task_1', completed: false },
      { id: 2, textKey: 'task_2', completed: false },
      { id: 3, textKey: 'task_3', completed: false }
    ]);
  }, [storageKey]);

  const completedCount = tasks.filter(task => task.completed).length;

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id, e) => {
    e.stopPropagation();
    setTasks(tasks.filter(task => task.id !== id));
  };

  const activeTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  return (
    <div className="flex flex-col h-full overflow-y-auto no-scrollbar pb-4">
      <div className="brutal-box p-3 bg-white mb-4 shrink-0 text-center">
        <h1 className="font-extrabold text-xl text-teal-700 tracking-tight uppercase">
          {t.nav_ledger || "WORK LEDGER"}
        </h1>
      </div>

      <div className="brutal-box p-4 bg-yellow-400 mb-4 shrink-0">
        <p className="text-xs font-bold text-gray-800 uppercase mb-1">{t.daily_progress || "DAILY PROGRESS"}</p>
        <h2 className="text-2xl font-extrabold text-black">
          {completedCount} / {tasks.length} <span className="text-sm uppercase tracking-wide">{t.tasks_done || "TASKS DONE"}</span>
        </h2>
      </div>

      <div className="flex gap-2 mb-4 shrink-0">
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          placeholder={t.add_task || "Add a new task..."}
          className="flex-1 brutal-box mb-0 p-3 outline-none focus:bg-yellow-100 text-sm font-semibold"
        />
        <button 
          onClick={addTask}
          className="brutal-btn bg-black text-white px-5 font-bold text-xl flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="flex flex-col gap-3 mb-4">
        <h3 className="text-xs font-extrabold text-gray-600 uppercase tracking-wide">Active Tasks</h3>
        {activeTasks.length === 0 ? (
          <div className="brutal-box p-3 bg-gray-50 text-center text-gray-400 text-xs font-bold">
            No active tasks remaining! All done.
          </div>
        ) : (
          activeTasks.map(task => {
            const displayText = task.textKey ? (t[task.textKey] || task.textKey) : task.text;
            return (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="brutal-box mb-0 p-3 flex items-center justify-between cursor-pointer bg-white transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input 
                    type="checkbox" 
                    checked={false}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 border-2 border-black accent-teal-600 cursor-pointer"
                  />
                  <span className="font-bold text-sm text-black">
                    {displayText}
                  </span>
                </div>
                <button 
                  onClick={(e) => deleteTask(task.id, e)}
                  className="text-gray-400 hover:text-red-600 p-2 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            );
          })
        )}
      </div>

      {completedTasks.length > 0 && (
        <div className="flex flex-col gap-3 mb-4">
          <h3 className="text-xs font-extrabold text-teal-700 uppercase tracking-wide flex items-center gap-2">
            <i className="fa-solid fa-circle-check"></i> Completed Tasks ({completedTasks.length})
          </h3>
          {completedTasks.map(task => {
            const displayText = task.textKey ? (t[task.textKey] || task.textKey) : task.text;
            return (
              <div 
                key={task.id} 
                onClick={() => toggleTask(task.id)}
                className="brutal-box mb-0 p-3 flex items-center justify-between cursor-pointer bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input 
                    type="checkbox" 
                    checked={true}
                    onChange={() => toggleTask(task.id)}
                    className="w-5 h-5 border-2 border-black accent-teal-600 cursor-pointer"
                  />
                  <span className="font-bold text-sm line-through text-gray-400">
                    {displayText}
                  </span>
                </div>
                <button 
                  onClick={(e) => deleteTask(task.id, e)}
                  className="text-gray-400 hover:text-red-600 p-2 transition-colors"
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LedgerView;