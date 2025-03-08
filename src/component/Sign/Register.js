import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/userService';
import { toast } from 'react-toastify';
import { FaEye } from "react-icons/fa";

const Register = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordSecond, setPasswordSecond] = useState('')
    const [username, setUserName] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const navigate = useNavigate()
    const handleRegister = async () => {
        //validate
        handleSubmitCreateUser()
        // comparePasswords()

        //submit
        let res = await postRegister(email, username, password);
        if (res && res.EC === 0) {
            toast.success(res.EM)
            navigate('/login')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
        }


    };
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUser = async () => {

        // validate email
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error('InValid Email!')
            return;
        }
        if (!password) {
            toast.error('InValid Password!')
        }
    }
    const comparePasswords = (password, passwordSecond) => {


        const diff = (diffMe, diffBy) => diffMe.split(diffBy).join('')

        const C = diff(password, passwordSecond)
        console.log('check defference', C)
    }

    return (
        <div className="login-container">
            <div className='header'>
                <span> You have account ?</span>
                <button onClick={() => { navigate('/login') }} >Login</button>
            </div>
            <div className='title col-4 mx-auto'>
                Register
            </div>
            <div className='welcome col-4 mx-auto'>
                Get better data with conversational forms, surveys, quizzes & more.
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}
                        type='email'
                        className='form-control'></input>
                </div>
                <div className='form-group'>
                    <label>User Name</label>
                    <input
                        value={username}
                        onChange={(event) => { setUserName(event.target.value) }}
                        type='email'
                        className='form-control'></input>
                </div>
                <div className='   form-group'>
                    <label>Password </label>


                    <div className='icon-hideShow'>

                        <input

                            value={password}
                            onChange={(event) => { setPassword(event.target.value) }}
                            type={showPassword && showPassword === true ? 'input' : 'password'}
                            className='form-control'></input>

                        <div className='hideShow'>


                            <span

                                onClick={() => { setShowPassword(!showPassword) }}
                            >{showPassword && showPassword === true ? 'Hide' : 'Show'}

                            </span>
                        </div>

                    </div>

                </div>
                {/* <div className='form-group'>
                    <label>Enter password again</label>
                    <input

                        value={passwordSecond}
                        onChange={(event) => { setPasswordSecond(event.target.value) }}
                        type='password'
                        className='form-control'></input>



                </div> */}
                <span className='fgot-password'>forgot ur password?</span>
                <div>
                    <button
                        onClick={() => { handleRegister() }}
                        className='btn-submit'>Submit </button>

                </div>
                <div className=' go-back   text-center'>
                    <span
                        onClick={() => { navigate('/') }}
                    > &#60; &#60; Go to Homepage</span>
                </div>

            </div>
        </div>

    )
};
export default Register;