import axios from 'axios'
import { useContext, useState } from 'react'
import { MainContext } from '../contexts/MainContext'
import getTasks from '../util/getTasks'
import Error from './Error'
import { toast } from 'react-toastify'

function AddTask({ setTasks }) {
  const [header, setHeader] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState(false)

  const hostname = useContext(MainContext)

  function addNewTask() {
    axios
      .post(hostname + '/task', {
        header: header,
        description: description,
      })
      .then(function () {
        toast.success(`Task added successfully.`)
        getTasks(setTasks)

        /* Clear input */
        setHeader('')
        setDescription('')

        setErrors(false)
      })
      .catch(function (err) {
        toast.error(`Something went wrong.`)
        const errors = err.response.data.error

        setErrors(errors)
      })
  }

  return (
    <div>
      <form className="flex flex-col my-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col mb-2">
          <label className="font-bold w-32">Task Name</label>
          <input
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            className="w-full border mt-2"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label className="font-bold w-32">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-32 border mt-2"
          ></textarea>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={addNewTask}
        >
          Add
        </button>
      </form>

      {/* Errors */}
      {errors && <Error errors={errors} />}
    </div>
  )
}

export default AddTask
