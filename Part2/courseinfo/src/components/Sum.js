const Sum = ( { course }) => {
    const sumExercises = course.parts.reduce((sumExercises, part) => sumExercises + part.exercises,0)
    return (
        <div><strong>
        total of {sumExercises} exercises
        </strong></div>
    )
}

export default Sum