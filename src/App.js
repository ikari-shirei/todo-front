import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import { useState } from 'react'
import { MainContext } from './contexts/MainContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [tasks, setTasks] = useState()
  const [addStatus, setAddStatus] = useState(false)

  return (
    <MainContext.Provider value={'https://ikari-shirei-todo-api.glitch.me/api'}>
      <div className="App flex flex-col">
        {/* Header and add task button */}
        <div className="flex flex-wrap items-center justify-between bg-green-500 h-auto w-full px-8 py-4">
          <h1 className="text-2xl text-white font-sans">FULLSTACK TODO APP</h1>

          {/* If couldn't connect */}
          {!tasks && <div className="text-white">Connecting...</div>}

          <button
            className="cursor-pointer text-white hover:text-gray-500"
            onClick={() => setAddStatus((prev) => !prev)}
          >
            {addStatus ? 'Close' : 'Add new task'}
          </button>
        </div>

        {/* Add Task */}
        <div className="mx-4 md:mx-44 lg:mx-96">
          {addStatus && <AddTask setTasks={setTasks} />}
        </div>

        {/* Tasks */}
        <div className="mx-4 md:mx-44 lg:mx-96">
          <Tasks tasks={tasks} setTasks={setTasks} />
        </div>
        <ToastContainer />
      </div>
    </MainContext.Provider>
  )
}

export default App
