import { useNavigate } from 'react-router-dom';

/* FIXME 네이밍이 이상하다 이게...맞나? use + 동사 이게 맞나?
애당초 네비게이트를 hooks로 빼는 게 맞나? */
const useInitNavigate = (url:string) => {
    const navigate = useNavigate();
    return navigate(url);
}

export const useGoHome =() => {
    return useInitNavigate('/');
}

export const useGoLogin =() => {
    return useInitNavigate('/auth/login');
}

export const useGoSignUp =() => {
    return useInitNavigate('/auth/signup');
}
