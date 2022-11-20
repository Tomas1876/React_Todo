import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DEFAULT_URL, ROUTES, ERROR_MESSAGE } from '../constants/global';
import { Main } from '../style/common';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';
import CustomParagraph from './common/CustomParagraph';
import { login, signUp } from '../apis/auth';
import { useGoHome } from '../hooks/routes';

/* FIXME  이 컴포넌트가 너무 많은 일을 하고 있지는 않은지? 리스너의 경우 알맞은 페이지로 분리하는 걸 고려할 것*/
const AuthForm = ( {authType} : {authType : string} ) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isEmailValidated, setEmailValidate] = useState(false);
    const [isDisabled, setDisability] = useState(true);

    /* FIXME 편법으로 if문 사용했는데 typescript의 string literal에 대해 더 공부하고 추구 타입 정정할 것*/
    let authRoute = ROUTES['login'];
    let url = `users/login`;

    if(authType === 'signUp'){
        authRoute = ROUTES['signUp'];
        url = `users/create`;
    }

    const validateEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        const emailReg = /^[{a-z}|{0-9}]+@+[{a-z}|{0-9}]+\.+[{a-z}]+/;
        setEmailValidate(emailReg.test(String(emailValue).toLowerCase()));
    }

    const validatePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const confirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const submitSingUp = async(e : React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        if(await signUp(email, password)) {
            navigate('/');
        }
    }

    const submitLogin = async (e : React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        if(localStorage.getItem('userToken')) {
            if(window.confirm('이미 로그인 되어 있습니다')) {
                navigate('/');
            }
        } else if(await login(email, password)) {
            navigate('/');
        }
    }

    /* FIXME 이렇게 useEffect 여러 개 써도 되나? */
    useEffect(()=>{
        setDisability(!isEmailValidated || password.length < 8);
    }, [isEmailValidated, password]);

    useEffect(()=>{
        setEmailMessage(isEmailValidated ? '올바른 형식의 이메일입니다' : ERROR_MESSAGE.INVALID_EMAIL);
    }, [isEmailValidated]);

    useEffect(()=>{
        setPasswordMessage(password.length >= 8 ? '올바른 길이의 비밀번호입니다' : ERROR_MESSAGE.INVALID_PASSWORD_SHORT);
    }, [password]);

    const EmailMessage = () => CustomParagraph(
                                    emailMessage,
                                    isEmailValidated ? 'success' : 'danger');
    const PasswordMessage = () => CustomParagraph(
                                    passwordMessage,
                                    password.length >= 8 ? 'success' : 'danger');
    
    return (
        <Main display='flex'>
            <form action={url}>
                <CustomInput type='email'
                             label='이메일 입력'
                             placeholder='이메일을 입력해주세요'
                             minLength={3}
                             maxLength={100}
                             name={email}
                             value={email}
                             onInput={validateEmail}
                             />
                {EmailMessage()}
                <CustomInput type='password'
                             label='비밀번호 입력'
                             placeholder='비밀번호를 입력해주세요'
                             minLength={8}
                             maxLength={100}
                             name={password}
                             value={password}
                             onInput={authType === 'login' ? confirmPassword : validatePassword} 
                             />
                {PasswordMessage()}
                <CustomButton type={'submit'}
                              aria-label={authRoute.name}
                              disabled={isDisabled}
                              theme={isDisabled? 'disabled' : 'primary'}
                              onClick={authType === 'login' ? submitLogin : submitSingUp} />
            </form>
        </Main>
    );

}
export default AuthForm;
