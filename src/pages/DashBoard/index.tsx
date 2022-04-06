import React from "react";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from "../../components/SelectInput";
import { Container } from './style'
const Dashboard : React.FC = () =>{
           
   const options = [
      {value: 'Ronildo',  label: 'Ronildo'},
      {value: 'Jonas',    label: 'Jonas'},
      {value: 'Beatriz',  label: 'Beatriz'},
 ]
   
   
   return(
            
            <Container>
               <ContentHeader title="Dashboard" lineColor="#F7931f">
                  <SelectInput options={options} />
               </ContentHeader>
               
              
            </Container>

            );
}
export default Dashboard;