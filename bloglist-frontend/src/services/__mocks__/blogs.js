let token = null;

const blogs = [
  {
    _id: "12345",
    title: "Title 1",
    author: "Author 1",
    url: "https://google.com/",
    likes: 6,
    __v: 0,
    user: {
      _id: "54321",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs);
};

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

export default { getAll, blogs, setToken };
