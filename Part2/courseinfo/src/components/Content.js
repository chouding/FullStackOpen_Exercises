const Content = ( { course }) => {
    return (
        <>
            {course.parts.map(course => 
                <div key={course.id}>
                    {course.name} {course.exercises}
                </div>
            )}
        </>
    )}

export default Content