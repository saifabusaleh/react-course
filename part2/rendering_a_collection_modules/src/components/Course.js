import React from 'react'

const Header = ({course}) =>
  <h1>{course}</h1>

const Total = ({parts}) => {
  const total = parts.reduce( (sum, element) => sum + element.exercises ,0 );

  return <p>Total of {total} exercises</p>
}
  

const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({parts}) => {
    const partsFunction = () => parts.map(part =>
        <Part 
          key={part.id}
          part={part}
        />
      )
return (
  <div>
  {partsFunction()}
  </div>
)
}

const Course = ({course}) => {

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course
