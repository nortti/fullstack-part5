import React from 'react'

import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      deleted: false,
      visible: false,
      likes: this.props.blog.likes
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  like = async () => {
    const likes = this.state.likes + 1
    this.props.blog.likes = likes
    try {
      await blogService.update(this.props.blog._id, this.props.blog)
      this.setState({ likes })
    } catch (exception) {

    }
  }

  delete = async () => {
    if (!window.confirm(`delete '${this.props.blog.title}' by ${this.props.blog.author}?`)) {
      return
    }
    try {
      await blogService.remove(this.props.blog._id)
      this.setState({ deleted: true })
    }
    catch (exception) {

    }
  }

  render() {
    if (this.state.deleted) {
      return (<div></div>)
    }
    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }
    const blog = this.props.blog
    return (
      <div>
        <div style={Object.assign(hideWhenVisible, blogStyle)} className="titleAndAuthor">
          <span className="toggleSpan" onClick={this.toggleVisibility}>{blog.title} {blog.author}</span>
        </div>
        <div style={Object.assign(showWhenVisible, blogStyle)} className="fullBlogInfo">
          <div onClick={this.toggleVisibility}>{blog.title} {blog.author}</div>
          <div><a href={blog.url}>{blog.url}</a></div>
          <div>{blog.likes} likes <button type="submit" onClick={this.like}>like</button></div>
          <div>added by {blog.user.name}</div>
          {this.props.canRemove ? <button type="submit" onClick={this.delete}>delete</button> : null}
        </div>
      </div>
    )

  }
}

export default Blog
