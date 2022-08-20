function Error({ errors }) {
  return (
    <div>
      {errors && (
        <ul>
          {errors.map((error) => (
            <li key={error.msg}>{error.msg}</li>
          ))}
        </ul>
      )}

      {!errors && (
        <ul>
          <li>Header must exists.</li>
          <li>Header must be under 50 characters.</li>
          <li>Description must be under 500 characters.</li>
          <li>Check your connection.</li>
        </ul>
      )}
    </div>
  )
}

export default Error
