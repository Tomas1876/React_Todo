import styled from 'styled-components';
import { Main, Button } from '../style/common';

const MainBox = styled(Main)`
    padding: 0 20%;
    justify-content: space-between;
`;
const MainPage = () => {

    return(
        <MainBox>
            <Button theme={'primary'} className='first-button'>회원가입/로그인</Button>
            <Button theme={'secondary'} className='last-button'>할일 목록</Button>
        </MainBox>
    )
}

export default MainPage;