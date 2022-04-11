import React from "react";
import { Container,Content } from "./style";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

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
               <Content>
                 <HistoryFinanceCard 
                 cardColor="#313862"
                 tagColor="#E44C4E"
                 title="Financiamento"
                 subtitle="11/04/2022"
                 amount="R$ 1350,00"/>


               </Content>

            
             </Container>
            );
}
export default List;