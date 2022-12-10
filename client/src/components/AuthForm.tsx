import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ERROR_MESSAGE } from '../constants/global';
import { Main } from '../style/common';
import CustomButton from './common/CustomButton';
import CustomInput from './common/CustomInput';
import CustomParagraph from './common/CustomParagraph';
import { login, signUp } from '../apis/auth';
import { User } from '../constants/types';

/* FIXME  이 컴포넌트가 너무 많은 일을 하고 있지는 않은지? 리스너의 경우 알맞은 페이지로 분리하는 걸 고려할 것*/
const AuthForm = ( {authType} : {authType : string} ) => {

    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const { email, password } = inputs;
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [isEmailValidated, setEmailValidate] = useState(false);
    const [isDisabled, setiIsDisabled] = useState(true);

    const onChangeInput = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
        name === 'email' ? validateEmail(value) : validatePassword(value);

    }

    const validateEmail = (emailValue : string) => {
        const emailReg = /^[{a-z}|{0-9}]+@+[{a-z}|{0-9}]+\.+[{a-z}]+/;
        setEmailValidate(emailReg.test(String(emailValue).toLowerCase()));
    }

    const validatePassword = (passwordValue :  string) => {
        return passwordValue.length > 8
    }

    const confirmPassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        const passwordValue = e.target.value;
        setInputs({
            ...inputs,
            password: passwordValue
        });
    }

    const submitSingUp = async(user: User) => {
        const result = await signUp(user);
        if(result) {
            navigate('/');
        }
    }

    const submitLogin = async ( user: User) => {
        if(localStorage.getItem('userToken')) {
            alert('이미 로그인 되어 있습니다');
            navigate('/');
        } else {
            const result = await login(user);
            result ? navigate('/') : alert('로그인 할 수 없습니다.');
        }
    }
    const onClickSubmitButton = (e : React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        authType === 'login' ? submitLogin({email, password}) : submitSingUp({email, password})
    }

    /* FIXME 이렇게 useEffect 여러 개 써도 되나? */
    useEffect(()=>{
        setiIsDisabled(!isEmailValidated || validatePassword(password));
    }, [isEmailValidated, password, isDisabled]);

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
            <form>
                <CustomInput type='email'
                             label='이메일 입력'
                             placeholder='이메일을 입력해주세요'
                             minLength={3}
                             maxLength={100}
                             name='email'
                             value={email}
                             onInput={onChangeInput}
                             />
                {EmailMessage()}
                <CustomInput type='password'
                             label='비밀번호 입력'
                             placeholder='비밀번호를 입력해주세요'
                             minLength={8}
                             maxLength={100}
                             name='password'
                             value={password}
                             onInput={authType === 'login' ? confirmPassword : onChangeInput}
                             />
                {PasswordMessage()}
                <CustomButton type={'submit'}
                              aria-label={authType === 'login' ? 'login' : 'signUp'}
                              disabled={isDisabled}
                              theme={isDisabled? 'disabled' : 'primary'}
                              onClick={onClickSubmitButton} />
            </form>
        </Main>
    );

}
export default AuthForm;
