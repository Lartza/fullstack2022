const Notification = ({ message, type }) => {
  let style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (type === 'success') {
    style.color = 'green'
  } else if (type === 'error') {
    style.color = 'red'
  }

  if (message === null || message === '') {
    return null
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification