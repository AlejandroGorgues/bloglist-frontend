import { useState } from "react"
import blogService from '../services/blogs.js'

const BlogForm = ({blogs, setBlogs,setInputMessage, setErrorMessage}) =>{
    const [newBlog, setNewBlog] = useState(
        {title:'', author:'', url:'', likes:0}
    )
    const addBLog = async (event) => {
        event.preventDefault()
        
        try{
          const returnedBlog = await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog ))
            setNewBlog('')
            setInputMessage(
              `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
              )
              setTimeout(() => {
              setInputMessage(null)
              }, 3000)
        }catch(exception) {             
          setErrorMessage(
            exception.response?.data?.error
          )
          setTimeout(() => {
          setErrorMessage(null)
          }, 5000)
      }
        
    }
    
    const handleBlogChange = (event) => {
        setNewBlog((newBlog) => ({...newBlog, [event.target.name]:event.target.value}))
    }
    
    
    
    return (
      <form onSubmit={addBLog}>
        <div>
          <label htmlFor ="ftitle">title</label>
          <input
            id={"ftitle"}
            name={"title"}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor ="fauthor">author</label>
          <input
            id={"fauthor"}
            name={"author"}
            onChange={handleBlogChange}
          />
        </div>
        <div>
          <label htmlFor ="furl">url</label>
          <input
            id={"furl"}
            name={"url"}
            onChange={handleBlogChange}
          />
        </div>
        <button type="submit">save</button>
      </form>  
    )
}
export default BlogForm