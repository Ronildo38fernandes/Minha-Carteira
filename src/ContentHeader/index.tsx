import React from "react";
import { Container,Title,Controllers } from "./style";
const ContentHeader : React.FC = () =>{
            return(
            
            <Container>
                   <Title>
                        <h1>Título</h1>
                   </Title>   
                   <Controllers>
                               <button type="button">Botão</button>

                   </Controllers>
            </Container>
            

            );
}
export default ContentHeader;