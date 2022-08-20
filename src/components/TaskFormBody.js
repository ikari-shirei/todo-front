import axios from 'axios'
import { useState } from 'react'
import { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'
import { toast } from 'react-toastify'
import getTasks from '../util/getTasks'
import Error from './Error'

function TaskFormBody({ task, setEditOpen, setTasks }) {
  const [description, setDescription] = useState(task.description)
  const [header, setHeader] = useState(task.header)
  const [errors, setErrors] = useState(false)

  const hostname = useContext(MainContext)

  function descriptionOnChange(e) {
    setDescription(e.target.value)
  }

  function headerOnChange(e) {
    setHeader(e.target.value)
  }

  function updateTask() {
    const newTask = {
      ...task,
      header: header,
      description: description,
    }

    axios
      .put(hostname + '/task/update/' + task._id, newTask)
      .then(function () {
        toast.success(`Task ${header} is updated.`)
        /* Set-up task */
        setTasks((prev) =>
          prev.map((targetTask) =>
            targetTask._id === task._id ? newTask : targetTask
          )
        )

        /* Save changed values for next edit */
        setHeader(newTask.header)
        setDescription(newTask.description)

        /* Final result */
        getTasks(setTasks)
        setErrors(false)

        /* Close editing */
        setEditOpen((pre) => pre.filter((id) => id !== task._id))
      })
      .catch(function (err) {
        toast.error(`Something went wrong.`)
        const errors = err.response.data.error

        setErrors(errors)
      })
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
      <input
        value={header}
        placeholder="Task name"
        onChange={headerOnChange}
        className="text-2xl border-emerald-500 border-2 border-collapse border-dashed mb-2 p-2"
      ></input>
      <textarea
        value={description}
        placeholder="Description"
        onChange={descriptionOnChange}
        className="border-emerald-500 border-2 border-collapse border-dashed p-2"
      ></textarea>

      {/* Buttons */}
      <div className="flex py-4">
        {/* Update task */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mr-4"
          onClick={updateTask}
        >
          Done
        </button>
        {/* Undo changes */}
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() =>
            setEditOpen((pre) => pre.filter((id) => id !== task._id))
          }
        >
          Undo changes
        </button>
      </div>
      {/* Errors */}
      {errors && <Error errors={errors} />}
    </form>
  )
}

export default TaskFormBody
