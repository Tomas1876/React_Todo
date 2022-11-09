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
        value: 'SingUp',
        url: '/singup',
        name: '회원가입'
    },
    todos: {
        value: 'Todos',
        url: '/todo',
        name: '할일'
    }
}

export const ERROR_MESSAGE = {
    INVALID_EAMIL: '이메일은 @와 .를 포함해야 합니다.',
    INVALID_PASSWORD_SHORT: '비밀번호는 8자리 이상이어야 합니다.',
    INVALID_PASSWORD_CONFIRM: '비밀번호가 맞지 않습니다.',
    INVALID_VALUE: '올바른 값을 입력해주세요.',
    ERROR_RETRY: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
}