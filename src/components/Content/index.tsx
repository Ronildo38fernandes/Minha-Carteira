import React from "react";
import { MdDashboard } from "react-icons/md";
import Dashboard from "../../pages/DashBoard";
import { Container } from "./style";
const Content : React.FC = ({children}) =>{
            return(
            
            <Container>
                        
                        {children}
                        
            </Container>

            );
}
export default Content;