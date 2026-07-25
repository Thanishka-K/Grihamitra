import { useState } from 'react';

const LedgerView = ({ t, lang }) => {
  // Use textKey for default translations, and plain text for newly added items
  const [tasks, setTasks] = useState([
    { id: 1, textKey: 'task_1', completed: false },
    { id: 2, textKey: 'task_2', completed: false },
    { id: 3, textKey: 'task_3', completed: false }
  ]);
  const [newTask, setNewTask] = useState('');
  const [isListening, setIsListening] = useState(false);

  const completedCount = tasks.filter(task => task.completed).length;

  const addTask = () => {
    if (newTask.trim() !== '') {
      // New tasks don't have a translation key, just the raw text
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice features.");
      return;
    }

    const recognition = new SpeechRecognition();
    const langCodes = { 'hi': 'hi-IN', 'te': 'te-IN', 'kn': 'kn-IN', 'bn': 'bn-IN', 'ta': 'ta-IN', 'ml': 'ml-IN', 'en': 'en-IN' };
    recognition.lang = langCodes[lang] || 'en-US';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setNewTask(spokenText);
      setIsListening(false);
    };
    
    recognition.onerror = () => setIsListening(false);
    recognition.onspeechend = () => {
      recognition.stop();
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex flex-col h-full">
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
          onClick={handleVoiceInput}
          className={`brutal-btn px-4 flex items-center justify-center transition-colors ${isListening ? 'mic-active' : 'bg-teal-600 text-white'}`}
          title="Speak to add task"
        >
          <i className={`fa-solid fa-microphone ${isListening ? 'fa-fade' : ''}`}></i>
        </button>

        <button 
          onClick={addTask}
          className="brutal-btn bg-black text-white px-5 font-bold text-xl flex items-center justify-center"
        >
          +
        </button>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 pb-2">
        {tasks.map(task => {
          // If the task has a textKey, translate it. Otherwise, render the custom text.
          const displayText = task.textKey ? t[task.textKey] : task.text;

          return (
            <label 
              key={task.id} 
              className={`brutal-box mb-0 p-3 flex items-center gap-3 cursor-pointer transition-colors ${task.completed ? 'bg-gray-100' : 'bg-white'}`}
            >
              <input 
                type="checkbox" 
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="w-5 h-5 border-2 border-black accent-teal-600 cursor-pointer"
              />
              <span className={`font-bold text-sm ${task.completed ? 'line-through text-gray-400' : 'text-black'}`}>
                {displayText}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default LedgerView;