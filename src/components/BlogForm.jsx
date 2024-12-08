import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState(
    { title:'', author:'', url:'', likes:0 }
  )
  const addBLog = async (event) => {
    event.preventDefault()
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
      likes: 0,
    })
  }
  return (
    <form onSubmit={addBLog}>
      <div>
        <label htmlFor ="ftitle">title</label>
        <input
          data-testid='title'
          id={'ftitle'}
          name={'title'}
          onChange={event => setNewBlog((newBlog) => ({ ...newBlog, [event.target.name]:event.target.value }))}
        />
      </div>
      <div>
        <label htmlFor ="fauthor">author</label>
        <input
          data-testid='author'
          id={'fauthor'}
          name={'author'}
          onChange={event => setNewBlog((newBlog) => ({ ...newBlog, [event.target.name]:event.target.value }))}
        />
      </div>
      <div>
        <label htmlFor ="furl">url</label>
        <input
          data-testid='url'
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
  createBlog: PropTypes.func.isRequired
}
export default BlogForm