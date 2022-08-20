import React from 'react'
import TaskBody from './TaskBody'
import TaskFormBody from './TaskFormBody'
import axios from 'axios'
import getTasks from '../util/getTasks'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { MainContext } from '../contexts/MainContext'
import { toast } from 'react-toastify'

function Tasks({ tasks, setTasks }) {
  const [editOpen, setEditOpen] = useState([])
  const hostname = useContext(MainContext)

  useEffect(() => {
    getTasks(setTasks)
  }, [])

  function editTask(task) {
    setEditOpen((pre) => {
      if (editOpen.includes(task._id)) {
        return pre.filter((id) => id !== task._id)
      } else {
        return [...pre, task._id]
      }
    })
  }

  function deleteTask(task) {
    axios
      .delete(hostname + '/task/' + task._id)
      .then(function () {
        toast.success(`Task ${task.header} deleted successfully.`)

        setTasks((prev) =>
          prev.filter((targetTask) => targetTask._id !== task._id)
        )
      })
      .catch(function () {
        toast.error(`Something went wrong.`)
      })
  }
  return (
    <ul className="self-center">
      {tasks &&
        tasks.map((task) => {
          return (
            <li key={task._id} className="flex flex-col p-4 my-4 border-2">
              <div className="flex place-self-end">
                <button
                  className=" font-semibold text-red-500 cursor-pointer pb-2 hover:text-red-300 mr-4"
                  onClick={() => editTask(task)}
                >
                  Edit
                </button>
                <button
                  className="place-self-end font-semibold text-red-500 cursor-pointer pb-2 hover:text-red-300"
                  onClick={() => deleteTask(task)}
                >
                  Delete
                </button>
              </div>

              {editOpen.includes(task._id) ? (
                <TaskFormBody
                  task={task}
                  setEditOpen={setEditOpen}
                  setTasks={setTasks}
                />
              ) : (
                <TaskBody task={task} setTasks={setTasks} />
              )}
            </li>
          )
        })}
    </ul>
  )
}

export default Tasks
