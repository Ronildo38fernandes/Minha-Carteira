import React from "react";
import { Container } from "./style";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";

const List : React.FC = () =>{
            const options = [
                        {value: 'Ronildo',  label: 'Ronildo'},
                        {value: 'Jonas',    label: 'Jonas'},
                        {value: 'Beatriz',  label: 'Beatriz'},
                   ]


            return(
             <Container>           
               <ContentHeader title="Saídas" lineColor="#E44C4E">
                  <SelectInput options={options} />
               </ContentHeader>
            
             </Container>
            );
}
export default List;