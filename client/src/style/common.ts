import styled from 'styled-components';
import { theme } from './theme';

/* 공통 스타일 */
export const Input = styled.input`
    width: 500px;
    height: 150px;
    border-radius: 5px;
    outline: none;
`;

export const Button = styled.button`
    width: 500px;
    height: 150px;
    border-radius: 5px;
    :hover {
        width: 510px;
        height: 160px;
    }
`;

export const DisabledButton = styled(Button)`
    background: theme.light;
    color: theme.secondary;
    border: 2px solid theme.secondary
`;

export const SecondaryButton = styled(Button)`
    background: theme.light;
    color: theme.primary;
    border: 2px solid theme.primary
`;

Button.defaultProps = {
    theme: {
        background: theme.primary,
        color: theme.light
    }
}