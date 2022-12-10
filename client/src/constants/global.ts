export const DEFAULT_URL = 'http://localhost:8080';
export const ROUTES = {
    main: {
        value: 'main',
        url: '/',
        title: 'Home'
    },
    login: {
        value: 'Login',
        url: '/auth/login/',
        title: '로그인'
    },
    signUp: {
        value: 'SignUp',
        url: '/auth/signup/',
        title: '회원가입'
    },
    todos: {
        value: 'Todos',
        url: '/todos/',
        title: '할일'
    }
}

export const ERROR_MESSAGE = {
    INVALID_EMAIL: '이메일은 @와 .를 포함해야 합니다.',
    INVALID_PASSWORD_SHORT: '비밀번호는 8자리 이상이어야 합니다.',
    INVALID_USER: '로그인 정보가 맞지 않습니다.',
    INVALID_VALUE: '올바른 값을 입력해주세요.',
    ERROR_RETRY: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
}
