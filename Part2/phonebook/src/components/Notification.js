const Notification = ( { isError, message }) => (
    message !== "" ? (isError ? <div className="errorMessage">{message}</div>: <div className="approvalMessage">{message}</div>) : <div>{message}</div>
)

export default Notification