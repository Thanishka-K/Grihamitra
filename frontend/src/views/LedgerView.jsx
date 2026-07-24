import { useState } from 'react';

const LedgerView = () => {
  // Initial task state for the hackathon demo
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Clean kitchen countertops', completed: false },
    { id: 2, text: 'Run the washing machine', completed: false },
    { id: 3, text: 'Sweep and mop living room', completed: false },
  ]);

  const [newTask, setNewTask] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask('');
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', paddingBottom: '20px' }}>
      
      {/* Header */}
      <div className="brutal-box" style={{ cursor: 'default', backgroundColor: '#fff', textAlign: 'center' }}>
        <h2 style={{ fontSize: '24px', fontWeight: '1000', color: '#047857', textTransform: 'uppercase' }}>
          WORK LEDGER
        </h2>
      </div>

      {/* Progress Summary */}
      <div className="brutal-box" style={{ 
        backgroundColor: completedCount === tasks.length && tasks.length > 0 ? '#bbf7d0' : '#fef08a', 
        borderWidth: '5px',
        borderColor: 'black'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: '900', marginBottom: '8px' }}>DAILY PROGRESS</h3>
        <p style={{ fontSize: '24px', fontWeight: '1000' }}>
          {completedCount} / {tasks.length} <span style={{ fontSize: '16px', fontWeight: '800' }}>TASKS DONE</span>
        </p>
      </div>

      {/* Add New Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ 
            flex: 1, padding: '16px', border: '4px solid black', 
            fontSize: '16px', fontWeight: '700', outline: 'none' 
          }}
        />
        <button type="submit" style={{ 
          padding: '16px 24px', backgroundColor: 'black', color: 'white', 
          border: 'none', fontWeight: '900', fontSize: '20px', cursor: 'pointer' 
        }}>
          +
        </button>
      </form>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {tasks.map((task) => (
          <div 
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px', border: '4px solid black',
              backgroundColor: task.completed ? '#e5e7eb' : 'white',
              cursor: 'pointer',
              boxShadow: task.completed ? 'none' : '4px 4px 0px black',
              transform: task.completed ? 'translate(4px, 4px)' : 'none',
              transition: 'all 0.1s ease'
            }}
          >
            {/* Custom Checkbox */}
            <div style={{
              width: '24px', height: '24px', border: '3px solid black',
              backgroundColor: task.completed ? '#047857' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              {task.completed && <span style={{ color: 'white', fontWeight: '900' }}>✓</span>}
            </div>

            {/* Task Text */}
            <span style={{ 
              fontSize: '18px', fontWeight: '800',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#6b7280' : 'black',
              wordBreak: 'break-word'
            }}>
              {task.text}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

export default LedgerView;