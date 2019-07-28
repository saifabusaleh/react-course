const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  blogs.forEach((blog) => {
    totalLikes += blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  if(!blogs || blogs.length===0) return []
  const favBlog = blogs.reduce(function(prev, current) {
    return (prev.likes > current.likes) ? prev : current
  }) //returns object
  return favBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}