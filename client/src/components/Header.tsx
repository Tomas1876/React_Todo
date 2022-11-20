import { useState, useEffect } from 'react';
import styled from "styled-components";
import { ROUTES } from "../constants/global";
import { headerHeight } from "../style/common";

const CustomHeader = styled.header`
    width: 100%;
    height: ${headerHeight};
    background: #fff;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.1);
`;
const HeaderMenu = styled.ul`
        height: ${headerHeight};
        padding: 0 50px;
        display: felx;
        justify-content: end;
        align-items: center;
        li {
            display: inline-block;
            height: 18px;
            margin-left: 15px;
        }
`;
const HeaderMenuItem = styled.button`
    height: 18px;
    font-size: 16px;
    color: gray;
    border: none;
    background: #fff;
`;

const Header = () => {

    const { main, login, signUp, todos } = ROUTES;
    const [isCertified, setCerified] = useState(localStorage.getItem('userToken') !== (undefined || null));


    /* FIXME 매 페이지 컴포넌트에 헤더를 삽입하는 것이 아닌, 공통부분에 헤더 한 번만 넣으면서
    동시에 헤더에서 route 관련 컴포넌트들 사용할 수 있는 방법 찾아서 a 태그 수정하기*/

    const logout = () => {
            localStorage.removeItem('userToken');
            setCerified(false);
    }

    return(
        <CustomHeader>
            <HeaderMenu>
                {isCertified ?
                    <li>
                        <HeaderMenuItem value='logout' onClick={logout}>로그아웃</HeaderMenuItem>
                    </li> :
                    <>
                        <li>
                            <a href={signUp.url}><HeaderMenuItem value={signUp.value}>{signUp.name}</HeaderMenuItem></a>
                        </li>
                        <li>
                            <a href={login.url}><HeaderMenuItem value={login.value}>{login.name}</HeaderMenuItem></a>
                        </li>
                    </>
                }
                {isCertified ? 
                    <li>
                        <a href={todos.url}><HeaderMenuItem value={todos.value}>{todos.name}</HeaderMenuItem></a>
                    </li> : ''}
                <li>
                    <a href={main.url}><HeaderMenuItem value={main.value}>{main.name}</HeaderMenuItem></a>
                </li>
            </HeaderMenu>
        </CustomHeader>
    );
}
export default Header;
