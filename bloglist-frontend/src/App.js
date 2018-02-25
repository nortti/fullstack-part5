import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
      user: null,
      notification: '',
      notificationType: ''
    }
  }

  async componentDidMount() {
    const blogs = await blogService.getAll()
    this.setState({ blogs })
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  showThenRemoveNotification = (notification, notificationType) => {
    this.setState({
      notification,
      notificationType
    })
    setTimeout(() => {
      this.setState({ notification: null })
    }, 2000)
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      this.setState({ username: '', password: '', user })
      this.showThenRemoveNotification(`logged in as ${user.name}`, 'notification')
    } catch (exception) {
      this.showThenRemoveNotification('wrong username or password', 'error')
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('user');
    this.setState({ user: null })
    this.showThenRemoveNotification('logged out', 'notification')
  }

  createBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url,
      userId: this.state.user.id
    }
    try {
      await blogService.create(blog)
      const blogs = await blogService.getAll()
      this.setState({
        blogs,
        title: '',
        author: '',
        url: '',
      })
      this.showThenRemoveNotification(`a new blog '${blog.title}' by ${blog.author} added`, 'notification')
    } catch (exception) {
      this.showThenRemoveNotification(`${exception}`, 'error')
    }
  }

  render() {
    return (
      <div>
        <Notification message={this.state.notification} type={this.state.notificationType} />
        {this.state.user === null ?
          <LoginForm
            handleSubmit={this.login}
            handleChange={this.handleFieldChange}
            username={this.state.username}
            password={this.state.password} />
          :
          <div>
            <h2>blogs</h2>

            <p>{this.state.user.name} logged in <button type="submit" onClick={this.logout}>logout</button></p>
            {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog._id} blog={blog} canRemove={!blog || blog.user._id === this.state.user.id} />
            )}
            <Togglable buttonLabel="add blog">
              <h3>create new</h3>
              <form onSubmit={this.createBlog}>
                title<input name="title" value={this.state.title} onChange={this.handleFieldChange} /><br />
                author<input name="author" value={this.state.author} onChange={this.handleFieldChange} /><br />
                url<input name="url" value={this.state.url} onChange={this.handleFieldChange} /><br />
                <button type="submit">create</button>
              </form>
            </Togglable>
          </div>
        }
      </div>
    )
  }
}


export default App;
