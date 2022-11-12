import React, { useEffect, useState } from 'react';
import { DEFAULT_URL, ROUTES } from '../constants/global';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';

/* fix : 이 컴포넌트가 너무 많은 일을 하고 있지는 않은지? 리스너의 경우 알맞은 페이지로 분리하는 걸 고려할 것*/

/* fix : 왜 파라미터를 (authType : string) 이라고 하면 타입에러가 발생하는지 확인해볼 것*/
const AuthForm = ( {authType} : {authType : string} ) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isDisabled, setDisability] = useState(true);

    /* fix : 불필요한 변수가 너무 많은 건 아닐까?*/
    let isEmailValidated : Boolean = false;

    /* fix : 편법으로 if문 사용했는데 typescript의 string literal에 대해 더 공부하고 추구 타입 정정할 것*/
    let authRoute = ROUTES['login'];

    if(authType === 'signUp'){
        authRoute = ROUTES['signUp'];
    }

    const validateEmail = (e : React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        console.log(emailValue);
        const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isEmailValidated = emailReg.test(String(emailValue).toLowerCase());
    }

    const validatePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    const confirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
    }

    useEffect(()=>{
        setDisability(!isEmailValidated && password.length < 8);
    }, [isEmailValidated, password]);

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
    const SubmitButton = () => CustomButton(
                                    'submit', 
                                    authRoute.name, 
                                    isDisabled, 
                                    isDisabled? 'disabled' : 'primary');
    return (
        <form action={`${DEFAULT_URL}/users${authRoute.url}`}>
            {EmailInput()}
            {PasswordInput()}
            {SubmitButton()}
        </form>
    );

}
export default AuthForm;