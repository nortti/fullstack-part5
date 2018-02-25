import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

const blog = {
  title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
  author: 'Matti Luukkainen',
  likes: 14,
  user: {
    name: 'mluukkai'
  }
}

describe.skip('<Blog />', () => {
  it('is only shown partially before click, and fully after', () => {
    const blogComponent = shallow(<Blog blog={blog} canRemove={false} />)

    const titleAndAuthor = blogComponent.find('.titleAndAuthor')
    const fullBlogInfo = blogComponent.find('.fullBlogInfo')

    expect(titleAndAuthor.getElement().props.style.display).toEqual('')
    expect(fullBlogInfo.getElement().props.style.display).toEqual('none')

    blogComponent.find('.toggleSpan').simulate('click')

    const titleAndAuthorAfterClick = blogComponent.find('.titleAndAuthor')
    const fullBlogInfoAfterClick = blogComponent.find('.fullBlogInfo')

    expect(titleAndAuthorAfterClick.getElement().props.style.display).toEqual('none')
    expect(fullBlogInfoAfterClick.getElement().props.style.display).toEqual('')
  })
})
