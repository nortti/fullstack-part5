import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

const blog = {
  title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
  author: 'Matti Luukkainen',
  likes: 14
}


describe.skip('<SimpleBlog />', () => {
  it('renders content', () => {

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={() => null} />)

    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')
    const likesDiv = blogComponent.find('.likes')

    expect(titleAndAuthorDiv.text()).toContain(blog.title)
    expect(titleAndAuthorDiv.text()).toContain(blog.author)
    expect(likesDiv.text()).toContain(blog.likes)
  })

  it('reacts to clicks on like', () => {
    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

    const likeButton = blogComponent.find('.likeButton')
    likeButton.simulate('click')
    likeButton.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
