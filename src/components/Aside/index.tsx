import React from "react";
import { Container,
         Header, 
         LogImg,
         Title,
         MenuContainer,
         MenuItemLink } from "./style";
         import {
            MdDashboard,
            MdArrowDownward,
            MdArrowUpward,
            MdExitToApp
} from  'react-icons/md';
import logoimg from '../../assets/logo.svg' 
const Aside : React.FC = () =>{
            return(
            
            <Container>
                        <Header>
                                    <LogImg src ={logoimg} alt="Logo da minha carteira"/>
                                    <Title> Minha carteira</Title> 
                        </Header>
                        <MenuContainer>

                                    <MenuItemLink href='/dashboard'>
                                                <MdDashboard />
                                                Dashboard
                                    </MenuItemLink>
                                    <MenuItemLink href='/list/balance-entry'>
                                                <MdArrowUpward />
                                                Entradas 
                                    </MenuItemLink> 
                                    <MenuItemLink href='/list/exit-balance'>
                                                <MdArrowDownward />
                                                Saídas
                                    </MenuItemLink>
                                    <MenuItemLink href='#'>
                                                <MdExitToApp />
                                                Sair
                                    </MenuItemLink>

                        </MenuContainer>
            </Container>

            );
}
export default Aside;