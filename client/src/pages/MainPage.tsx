import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Main, Button } from '../style/common';
import { ROUTES } from '../constants/global'

const MainBox = styled(Main)`
    padding: 0 20%;
    justify-content: space-between;
`;
const MainPage = () => {
    return(
        <MainBox>
            <Link to={ROUTES.signUp.url} className='first-button'><Button theme={'secondary'}>{ROUTES.signUp.name}</Button></Link>
            <Link to={ROUTES.login.url}><Button theme={'primary'}>{ROUTES.login.name}</Button></Link>
            <Link to={ROUTES.todos.url} className='last-button'><Button theme={'secondary'}>{ROUTES.todos.name}</Button></Link>
        </MainBox>        
    )
}

export default MainPage;