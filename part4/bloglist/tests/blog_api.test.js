const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const testHelper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = testHelper.listWithMultiBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})
test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(testHelper.listWithMultiBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'blog title',
    author: 'blog author',
    url: 'blogurl',
    likes: 55
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await testHelper.blogsInDb()
  expect(blogsAtEnd.length).toBe(testHelper.listWithMultiBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'blog title'
  )
})
describe('deletion of a blog', () => {
  test('blog should be deleted', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogTodelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogTodelete._id}`).expect(204)
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd.length).toBe(testHelper.listWithMultiBlogs.length - 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})