import axios from 'axios';
import { DEFAULT_URL } from './../constants/global';

export const login = async(email: string, password: string) => {
        const loginResult = await axios.post(`${DEFAULT_URL}/users/login`, {
            email, password
        }).then((response)=>{
            if(response.status === 200){
                if(window.confirm('로그인에 성공했습니다.')) {
                    localStorage.setItem('userToken', `Barear ${response.data.token}`);                    
                    return true;
                }
            }
        }).catch((reject)=>{
            console.log(reject);
            if(!reject.response) {
                alert('로그인 할 수 없습니다. 정보를 다시 확인해주세요.')
            } else {
                if(reject.response.status === 400) {
                    window.confirm('로그인 정보가 올바르지 않습니다.')
                } else {
                    window.confirm('로그인에 실패했습니다.')
                }
            }
            return false;
        });
        return loginResult;
}

export const signUp = async(email: string, password: string) => {
    const signUpResult = await axios.post(`${DEFAULT_URL}/users/create`, {
        email, password
    }).then((response)=>{
            if(response.status === 200) {
                if(window.confirm('회원가입에 성공했습니다.')){                    
                    return true;
                }
            }
        }).catch((reject)=>{
            if(reject.response.status === 409) {
                window.confirm('중복된 이메일입니다.') // https://mangoday.tistory.com/137
            } else {
                window.confirm('회원가입에 실패했습니다.')
            }
            return false;
        });
    return signUpResult;
}
