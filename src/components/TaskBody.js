import axios from 'axios'
import { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'
import { toast } from 'react-toastify'

function TaskBody({ task, setTasks }) {
  const hostname = useContext(MainContext)

  function completeTask() {
    /* Quickly change the button */
    setTasks((prev) =>
      prev.map((targetTask) =>
        targetTask._id === task._id
          ? { ...task, isCompleted: true }
          : targetTask
      )
    )

    axios
      .put(hostname + '/task/status/' + task._id, {
        isCompleted: true,
      })
      .then(function () {
        toast.success(`Task ${task.header} is completed.`)

        /* Final result */
        setTasks((prev) =>
          prev.map((targetTask) =>
            targetTask._id === task._id
              ? { ...task, isCompleted: true }
              : targetTask
          )
        )
      })
      .catch(function () {
        toast.error(`Something went wrong.`)
      })
  }

  function undoTask() {
    /* Quickly change the button */
    setTasks((prev) =>
      prev.map((targetTask) =>
        targetTask._id === task._id
          ? { ...task, isCompleted: false }
          : targetTask
      )
    )

    axios
      .put(hostname + '/task/status/' + task._id, {
        isCompleted: false,
      })
      .then(function () {
        toast.info(`Task ${task.header} is restored.`)

        /* Final result */
        setTasks((prev) =>
          prev.map((targetTask) =>
            targetTask._id === task._id
              ? { ...task, isCompleted: false }
              : targetTask
          )
        )
      })
      .catch(function () {
        toast.error(`Something went wrong.`)
      })
  }

  return (
    <div>
      <h1
        className={
          task.isCompleted
            ? 'line-through opacity-50 text-2xl mb-2'
            : 'text-2xl mb-2'
        }
      >
        {task.header}
      </h1>
      <p className={task.isCompleted ? 'line-through opacity-50' : ''}>
        {task.description}
      </p>
      <div className="py-4 flex justify-between items-center">
        {!task.isCompleted ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={completeTask}
          >
            Complete
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={undoTask}
          >
            Restore
          </button>
        )}
        <p className="opacity-50 italic">{task.createdAt}</p>
      </div>
    </div>
  )
}

export default TaskBody
