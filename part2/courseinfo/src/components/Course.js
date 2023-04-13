const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p style={{fontWeight: "bold"}}>total of {sum} excercises</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}

    <Total sum={parts.reduce((sum, part) => sum + part.exercises, 0)} />
  </div>

const Course = ({ course }) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
  </div>

export default Course