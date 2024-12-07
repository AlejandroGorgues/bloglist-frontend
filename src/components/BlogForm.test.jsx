import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('onclick form calls the event handler with right details', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    const { container } = render(<BlogForm createBlog={createBlog}/>)
    const title = container.querySelector('#ftitle')
    const author = container.querySelector('#fauthor')
    const url = container.querySelector('#furl')
    const sendButton = screen.getByText('save')

    await user.type(title, 'Title')
    await user.type(author, 'Author')
    await user.type(url, 'URL')
    await user.click(sendButton)
    
    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Author')
    expect(createBlog.mock.calls[0][0].url).toBe('URL')
    expect(createBlog.mock.calls[0][0].likes).toBe(0)
})