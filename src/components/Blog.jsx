import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, addLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showIfSameUser = { display: user.userId === blog.user.id ? '' : 'none' }
  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const updateBLog = async (event) => {
    event.preventDefault()
    blog.likes +=1
    addLike(blog)
  }

  const removeBlog = async (event) => {
    if(window.confirm(`Remove ${blog.title} by ${blog.author} ?`)){
      event.preventDefault()
      deleteBlog(blog)
    }
  }
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisibility}>{buttonLabel}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <div>likes {blog.likes} <button onClick={updateBLog}>like</button> </div>
        {blog.user.username}
        <div><button style={showIfSameUser} onClick={removeBlog}>remove</button></div>
      </div>
    </div>
  )
}
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
}
export default Blog