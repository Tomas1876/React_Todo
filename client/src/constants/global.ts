import axios from 'axios';

export const DEFAULT_URL = 'http://localhost:8080';

export const ROUTES = {
    login: {
        value: 'Login',
        url: '/login',
        name: '로그인'
    },
    logout: {
        value: 'Logout',
        url: '/logout',
        name: '로그아웃'
    },
    signUp: {
        value: 'SignUp',
        url: '/signup',
        name: '회원가입'
    },
    todos: {
        value: 'Todos',
        url: '/todos',
        name: '할일'
    }
}

/* 콜백 함수 타입 확인해서 추상화 할 것
export const getData = (urlSuffix : string, 
                        params : object, 
                        success : any, 
                        fail : any) => {
    axios.get(`${DEFAULT_URL}/${urlSuffix}`, 
                    params)
                    .then(success)
                    .catch(fail);
}

export const sendData = (urlSuffix : string, 
                        data : object, 
                        success : async (response : any) => {}, 
                        fail : async (reject : any) => {}) => {
    axios.post(`${DEFAULT_URL}/${urlSuffix}`, 
                    data)
                    .then((response)=> success(response))
                    .catch((reject)=> fail(reject));
    
}
*/
export const ERROR_MESSAGE = {
    INVALID_EMAIL: '이메일은 @와 .를 포함해야 합니다.',
    INVALID_PASSWORD_SHORT: '비밀번호는 8자리 이상이어야 합니다.',
    INVALID_USER: '로그인 정보가 맞지 않습니다.',
    INVALID_VALUE: '올바른 값을 입력해주세요.',
    ERROR_RETRY: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
}