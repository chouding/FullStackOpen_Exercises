import Header from './Header'
import Content from './Content'
import Sum from './Sum'

const Course = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <>
                    <Header title = {course.name}></Header>
                    <Content course = {course}></Content>
                    <Sum course = {course}></Sum>
                </>
            ))}
        </div>
    )
}

export default Course