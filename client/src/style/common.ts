import { CustomSize } from './../constants/types';
import styled from 'styled-components';

/* 공통 스타일 */
const color = {
        primary: '#007FFF',
        secondary: '#6c757d',
        danger: '#dc3545',
        success: '#00FF00',
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
export const headerHeight = '65px'; 

export const Main = styled.main<{display?: string}>`
    width: 100%;
    height: calc(100vh - ${headerHeight} );
    padding: 0 100px;
    display: ${props => props.display ? 'flex' : 'block'};
    align-items: center;
    justify-content: center;
`;

export const Input = styled.input<CustomSize>`
    width: 300px;
    height: 120px;
    border-radius: 5px;
    outline: none;
`;

export const Button = styled.button<CustomSize>`
    width: ${props => props.width ? props.width : '300px'};
    height: ${props => props.height ? props.height : '120px'};
    border: none;
    border-radius: 5px;
    font-size: ${props => props['font-size'] ? props['font-size'] : '32px'}; 
    ${props => props.theme === 'primary' ? button.primary : (props.theme === 'secondary'? button.secondary : button.disabled)}
    :hover {
        filter: brightness(0.90)
    }
`;

export const Paragraph = styled.p`
    width: 100%;
    height: 20px;
    font-size: 16px;
    text-align: center;
    color: ${props => props.theme === 'dark' ? color.dark : (props.theme === 'success'? color.success : color.danger)}
`;
