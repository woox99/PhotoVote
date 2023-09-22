import {useState, useEffect} from 'react';
import axios from 'axios';

const Form = props => {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const user = {
            firstName : firstName,
            lastName : lastName,
            email: email,
            password: password,
            confirmPassword: confirm
        }

        axios.post('http://localhost:8000/api/register', user)
            .then( res => console.log(res.data) )
            .catch( err => console.log(err))



    }

    return(
        <div>
            <form action="">
                <div>
                    First Name
                    <input type="text" onChange={e => setFirstname(e.target.value)}/>
                </div>
                <div>
                    Last Name
                    <input type="text" onChange={e => setLastName(e.target.value)}/>
                </div>
                <div>
                    Email
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </div>
                <div>
                    Password
                    <input type="text" onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    Confrim Password
                    <input type="text" onChange={e => setConfirm(e.target.value)}/>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default Form;