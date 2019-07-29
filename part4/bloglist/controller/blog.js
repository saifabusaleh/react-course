const blogRouter = require('express').Router()
const Blog = require('../models/blog')
blogRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (exception) {
    next(exception)
  }
})

blogRouter.post('/', async (request, response, next) => {
  const blog = new Blog(request.body)
  if(!blog.title && !blog.url) {
    response.status(400).end()
  } else  {
    if(!blog.likes) {
      blog.likes =0
    }
    try {
      const blogSaved = await blog.save()
      response.status(201).json(blogSaved)
    } catch (exception) {
      next(exception)
    }
  }
})

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = blogRouter