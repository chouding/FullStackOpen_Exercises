const Form = ({ value, onChange }) => (
    <form>
        <div>
        find countries<input value={value} onChange={onChange}/>
        </div>
    </form>
)

export default Form