import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DEFAULT_URL, ROUTES, ERROR_MESSAGE } from '../constants/global';
import { Main } from '../style/common';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';
import CustomParagraph from './common/CustomParagraph';

/* fix : 이 컴포넌트가 너무 많은 일을 하고 있지는 않은지? 리스너의 경우 알맞은 페이지로 분리하는 걸 고려할 것*/

/* fix : 왜 파라미터를 (authType : string) 이라고 하면 타입에러가 발생하는지 확인해볼 것*/
const AuthForm = ( {authType} : {authType : string} ) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isEmailValidated, setEmailValidate] = useState(false);
    const [isDisabled, setDisability] = useState(true);

    /* fix : 편법으로 if문 사용했는데 typescript의 string literal에 대해 더 공부하고 추구 타입 정정할 것*/
    let authRoute = ROUTES['login'];
    let url = `${DEFAULT_URL}/users${authRoute.url}`;

    if(authType === 'signUp'){
        authRoute = ROUTES['signUp'];
        url = `${DEFAULT_URL}/users/create`;
    }

    const validateEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        console.log(emailValue);
        const emailReg = /^[{a-z}|{0-9}]+@+[{a-z}|{0-9}]+\.+[{a-z}]+/;
        setEmailValidate(emailReg.test(String(emailValue).toLowerCase()));
        console.log('isEmailValidated ' + isEmailValidated);
    }

    const validatePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const confirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const submitSingUp = (e : React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        axios.post(url, {
            email, password
        }).then((response)=>{
            console.log(response)
            if(response.statusText === 'OK'){
                if(window.confirm('회원가입에 성공했습니다.')){                    
                    navigate('/auth/login');
                }
            } else {
                window.confirm('회원가입에 실패했습니다.')
            }
        });
    }

    /* fix : 이렇게 useEffect 여러 개 써도 되나? */
    useEffect(()=>{
        setDisability(!isEmailValidated || password.length < 8);
    }, [isEmailValidated, password]);

    useEffect(()=>{
        setEmailMessage(isEmailValidated ? '올바른 형식의 이메일입니다' : ERROR_MESSAGE.INVALID_EMAIL);
    }, [isEmailValidated]);

    useEffect(()=>{
        setPasswordMessage(password.length >= 8 ? '올바른 길이의 비밀번호입니다' : ERROR_MESSAGE.INVALID_PASSWORD_SHORT);
    }, [password]);

    /* fix: 기본파라미터 지정했는데 왜 옵셔널하게 사용할 수 없는지 확인해볼 것 */
    const EmailInput = () => CustomInput(
                                    'email', 
                                    '이메일 입력',
                                    'email', 
                                    '이메일을 입력해주세요',
                                    0, 
                                    100, 
                                    email, 
                                    validateEmail);
    const PasswordInput = () => CustomInput(
                                    'password', 
                                    '비밀번호 입력',
                                    'password', 
                                    '비밀번호를 입력해주세요',
                                    8,  
                                    100, 
                                    password, 
                                    authType === 'login' ? confirmPassword : validatePassword);

    const EmailMessage = () => CustomParagraph(
                                    emailMessage,
                                    isEmailValidated ? 'success' : 'danger');
    const PasswordMessage = () => CustomParagraph(
                                    passwordMessage,
                                    password.length >= 8 ? 'success' : 'danger');
    
    const SubmitButton = () => CustomButton(
                                    'submit', 
                                    authRoute.name, 
                                    isDisabled, 
                                    isDisabled? 'disabled' : 'primary',
                                    authType === 'login' ? () => {} : submitSingUp);
    return (
        <Main>
            <form action={url}>
                {EmailInput()}
                {EmailMessage()}
                {PasswordInput()}
                {PasswordMessage()}
                {SubmitButton()}
            </form>
        </Main>
    );

}
export default AuthForm;