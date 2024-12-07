import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createNote }) => {
  const [newBlog, setNewBlog] = useState(
    { title:'', author:'', url:'', likes:0 }
  )
  const addBLog = async (event) => {
    event.preventDefault()
    createNote(newBlog)
    setNewBlog('')
  }
  return (
    <form onSubmit={addBLog}>
      <div>
        <label htmlFor ="ftitle">title</label>
        <input
          id={'ftitle'}
          name={'title'}
          onChange={event => setNewBlog((newBlog) => ({ ...newBlog, [event.target.name]:event.target.value }))}
        />
      </div>
      <div>
        <label htmlFor ="fauthor">author</label>
        <input
          id={'fauthor'}
          name={'author'}
          onChange={event => setNewBlog((newBlog) => ({ ...newBlog, [event.target.name]:event.target.value }))}
        />
      </div>
      <div>
        <label htmlFor ="furl">url</label>
        <input
          id={'furl'}
          name={'url'}
          onChange={event => setNewBlog((newBlog) => ({ ...newBlog, [event.target.name]:event.target.value }))}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

BlogForm.propTypes = {
  createNote: PropTypes.func.isRequired
}
export default BlogForm