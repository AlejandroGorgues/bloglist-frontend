import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders title and author but no url and likes', () => {
    const blog = {
    title: 'Title',
    author: 'Author',
    url: 'URL',
    likes: 7,
    user: {id:'userId'}
    }

    const user = {
    userId: 'userId',
    token:'abcdefg',
    username:'username'
    }

    const { container } = render(<Blog key={blog.id} blog={blog} user={user}/>)
    const divBlog = container.querySelector('.blog')
    expect(divBlog).toHaveTextContent(
    'Title'
    )

    expect(divBlog).toHaveTextContent(
    'Author'
    )

    const divExtra = container.querySelector('.extraInfo')
    expect(divExtra).toHaveStyle('display: none')
    expect(screen.queryByText(/url: URL/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/likes: 7/i)).not.toBeInTheDocument();
})

test('url and likes on click', async () => {
    const blog = {
    title: 'Title',
    author: 'Author',
    url: 'URL',
    likes: 7,
    user: {id:'userId'}
    }

    const user = {
    userId: 'userId',
    token:'abcdefg',
    username:'username'
    }

    render(<Blog key={blog.id} blog={blog} user={user}/>)
    const userE = userEvent.setup()
    const button = screen.getByText('view')
    await userE.click(button)
    expect(screen.queryByText(/URL/i)).toBeInTheDocument()
    expect(screen.queryByText(/7/i)).toBeInTheDocument()
})

test('clicking twice on likes button is called twice', async () => {
    const blog = {
    title: 'Title',
    author: 'Author',
    url: 'URL',
    likes: 7,
    user: {id:'userId'}
    }

    const user = {
    userId: 'userId',
    token:'abcdefg',
    username:'username'
    }
    const mockHandler = vi.fn()
    render(<Blog key={blog.id} blog={blog} user={user} addLike={mockHandler}/>)
    const userE = userEvent.setup()
    const buttonView = screen.getByText('view')
    await userE.click(buttonView)

    const buttonLike = screen.getByText('like')
    await userE.click(buttonLike)
    await userE.click(buttonLike)
    expect(mockHandler.mock.calls).toHaveLength(2)
})