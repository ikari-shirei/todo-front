import axios from 'axios'

const getTasks = (setTasks) => {
  axios
    .get('https://ikari-shirei-todo-api.glitch.me/api/tasks')
    .then(function (response) {
      let tasks = response.data.tasks

      /* Make the date readable */
      tasks = tasks.map((task) => {
        const date = new Date(task.createdAt)
        task.createdAt =
          date.getDate() +
          '/' +
          (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) +
          '/' +
          date.getFullYear()
        return task
      })

      setTasks(tasks.reverse())
    })
    .catch(function (error) {
      console.error(error)
    })
}

export default getTasks
