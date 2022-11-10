import styled from 'styled-components';

/* 공통 스타일 */
const color = {
        primary: '#007FFF',
        secondary: '#6c757d',
        danger: '#dc3545',
        dark: '#23272b',
        light: '#f8f9fa'
}
const button = {
        primary: {
            background: color.primary,
            color: color.light,
            a : { color: color.light}
        },
        secondary: {
            background: color.light,
            color: color.primary,
            a: { color: color.primary },
            border: `2px solid ${color.primary}`
        },
        disabled: {
            background: color.light,
            color: color.secondary,
            a: { color: color.secondary },
            border: `2px solid ${color.secondary}`
        }

    } 

export const Main = styled.main`
    width: 100%;
    height: 100vh;
    padding: 0 100px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input`
    width: 300px;
    height: 120px;
    border-radius: 5px;
    outline: none;
`;

export const Button = styled.button`
    width: 300px;
    height: 120px;
    border: none;
    border-radius: 5px;
    font-size: 32px;    
    ${props => props.theme === 'primary' ? button.primary : (props.theme === 'secondary'? button.secondary : button.disabled)}
    :hover {
        filter: brightness(0.90)
    }
`;