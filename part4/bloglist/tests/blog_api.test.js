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

describe('all blogs tests', () => {
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
} )


describe('addition of a blog', () => {
  test('a valid blog can be added, and it have id property', async () => {
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
    expect(blogsAtEnd[0].id).toBeDefined()
  })

  test('likes property should default to 0 if not specified in request', async () => {
    const newBlog = {
      title: 'blog special title',
      author: 'blog author',
      url: 'blogurl'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
    const blogsAtEnd = await testHelper.blogsInDb()
    const addedBlog = blogsAtEnd.find((blog) => blog.title === 'blog special title')
    expect(addedBlog.likes).toEqual(0)
  })

  test('should return bad request if title and url is missing', async () => {
    const newBlog = {
      author: 'blog author',
      likes: 99
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('blog should be deleted', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogTodelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogTodelete.id}`).expect(204)
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd.length).toBe(testHelper.listWithMultiBlogs.length - 1)
  })

  test('blog should not be deleted for non existing ID', async () => {
    await api.delete(`/api/blogs/${testHelper.nonExistingID}`).expect(500)
    const blogsAtEnd = await testHelper.blogsInDb()
    expect(blogsAtEnd.length).toBe(testHelper.listWithMultiBlogs.length)
  })
})

describe('update of a blog', () => {
  test('blog likes should be updated', async () => {
    const blogsAtStart = await testHelper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlogLikes = {
      likes: 99
    }
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlogLikes).expect(200)
    const blogsAtEnd = await testHelper.blogsInDb()

    expect(blogsAtEnd[0].likes).toEqual(99)
  })

  test('blog likes should not be updated for non existing ID', async () => {
    const newBlogLikes = {
      likes: 99
    }
    await api.put(`/api/blogs/${testHelper.nonExistingID}`).send(newBlogLikes).expect(500)
  })
})

afterAll(() => {
  mongoose.connection.close()
})