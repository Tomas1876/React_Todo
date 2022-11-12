import { useState } from 'react';
import { DEFAULT_URL, ROUTES } from '../constants/global';
import CustomInput from './CustomInput';

const AuthForm = ( authType : string) => {

    const [emailValue, setEmailValue] = useState('');

    /* 편법으로 if문 사용했는데 typescript의 string literal에 대해 더 공부하고 추구 타입 정정할 것*/
    let authRoute = ROUTES['login'];

    if(authType === 'signUp'){
        authRoute = ROUTES['signUp'];
    }

    const validateEmail = (e : Event) => {

    }

    const validatePassword = () => {

    }

    const confirmPassword = () => {

    }

    return (
        <form action={`${DEFAULT_URL}/users${authRoute.url}`}>
            <CustomInput label="이메일 입력"
                         placeholder="이메일을 입력해주세요"
                         onInput={validateEmail} />
        </form>
    );

}
export default AuthForm;