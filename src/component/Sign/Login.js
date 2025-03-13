import './Login.scss';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/userService';
import { toast } from 'react-toastify';
import { FaLess, FaSpinner } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { handleLoginRedux } from '../../redux/action/userAction';
const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const handleLogin = async () => {
        //validate
        handleSubmitCreateUser();
        setIsLoading(true)

        //submit
        let res = await postLogin(email, password);
        if (res && res.EC === 0) {
            dispatch(handleLoginRedux(res));
            toast.success(res.EM)
            setIsLoading(false);

            navigate('/')
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM)
            setIsLoading(false);

        }

    };

    //validate

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
    return (
        <div className="login-container">
            <div className='header'>
                <span> Don't have account yet?</span>
                <button onClick={() => { navigate('/register') }} >Register</button>
            </div>
            <div className='title col-4 mx-auto'>
                Log in or Sign up
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
                    <label>Password</label>
                    <input

                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        type='password'
                        className='form-control'></input>
                </div>
                <span className='fgot-password'>forgot ur password?</span>
                <div>
                    <button
                        onClick={() => { handleLogin() }}
                        className='btn-submit'
                        disabled={isLoading}>

                        {isLoading === true ? <FaSpinner className="loaderIcon" /> : ''}
                        <span>Login</span>

                    </button>

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
export default Login;