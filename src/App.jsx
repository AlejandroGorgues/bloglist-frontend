import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog.jsx'
import Login from './components/Login.jsx'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [inputMessage, setInputMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const addBLog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then( returnedBlog => {
        setBlogs(blogs.concat({ ...returnedBlog, user }))
        setInputMessage(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
        )
        setTimeout(() => {
          setInputMessage(null)
        }, 3000)

      })
      .catch(error => {
        console.log(error)

        setErrorMessage(
          error.response?.data?.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const addLike = (blogObject) => {
    blogService.update(blogObject)
      .then( returnedBlog => {
        setBlogs(blogs.map(blog => blog.id === blogObject.id ? blogObject:blog))
        setInputMessage(
          `blog ${returnedBlog.title} by ${returnedBlog.author} updated`
        )
        setTimeout(() => {
          setInputMessage(null)
        }, 3000)

      })
      .catch(error => {
        console.log(error)

        setErrorMessage(
          error.response?.data?.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (blogObject) => {
    blogService.remove(blogObject)
      .then( deletedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== deletedBlog.id))
        setInputMessage(
          `blog ${deletedBlog.title} by ${deletedBlog.author} deleted`
        )
        setTimeout(() => {
          setInputMessage(null)
        }, 3000)

      })
      .catch(error => {
        console.log(error)

        setErrorMessage(
          error.response?.data?.error
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBLog} />
    </Togglable>
  )

  return (
    <div>
      <Notification message={errorMessage} className='error'/>
      <Notification message={inputMessage} className='success'/>
      {user === null ?
        <div>
          <h2>Log in to application</h2>
          <Login setUser={setUser} setErrorMessage={setErrorMessage}/>
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          {blogForm()}
        </div>
      }
      <div>
        {blogs !== null? blogs.sort((ob1, ob2) => ob2.likes - ob1.likes).map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} deleteBlog={deleteBlog} user={user}/>
        ): <p>no data</p>}
      </div>
    </div>
  )
}

export default App