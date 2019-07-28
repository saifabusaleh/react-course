const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {


  it('empty list should return 0 likes', () => {
    const blogs=[]
    const likes = listHelper.totalLikes(blogs)
    expect(likes).toBe(0)
  })

  it('list with one blog should return the blog likes', () => {
    const likes = listHelper.totalLikes(testHelper.listWithOneBlog)
    expect(likes).toBe(5)
  })

  it('list with multiple blogs should return correct blogs number', () => {
    const likes = listHelper.totalLikes(testHelper.listWithMultiBlogs)
    expect(likes).toBe(34)
  })
})

describe('favoriteBlog', () => {
  it('empty list should return empty', () => {
    const blogs= []
    const favBlog = listHelper.favoriteBlog(blogs)
    expect(favBlog).toEqual([])
  })
  it('list with one blog should return itself', () => {
    const favBlog = listHelper.favoriteBlog(testHelper.listWithOneBlog)
    expect(favBlog).toEqual(favBlog)
  })
  it('list with multiple blogs should return the favorite blog', () => {
    const favBlog = listHelper.favoriteBlog(testHelper.listWithMultiBlogs)
    expect(favBlog).toEqual(testHelper.listWithMultiBlogs[2])
  })
})