import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock("./services/blogs");
import blogService from './services/blogs'

describe('<App />', () => {
  let app


  describe('when user is not logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
    })
    it('renders no blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(0)
    })
  })

  describe('when users is logged in', () => {
    beforeEach(() => {
      app = mount(<App />)
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('user', JSON.stringify(user))
    })
    it('renders all blogs', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toEqual(1)
    })
  })
})
