import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login.jsx'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [inputMessage, setInputMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
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
          <BlogForm blogs={blogs} 
                    setBlogs={setBlogs} 
                    setInputMessage={setInputMessage}
                    setErrorMessage={setErrorMessage}/>
          </div>
      }
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App