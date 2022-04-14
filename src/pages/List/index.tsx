import React, {useMemo} from "react";
import { Container,Content,Filters } from "./style";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";

const List : React.FC = () =>{
           
            const { type } = useParams();
            const titleOptions = useMemo(() => {
                 return type === 'balance-entry'
                      ? { title: 'Entradas', lineColor: '#187D5F' }
                        : { title: 'Saída', lineColor: '#CC2A2C' };
                  }, [type]);
          
  
            const months = [
                        {value: 4,  label: 'Abril'},
                        {value: 5,    label: 'Maio'},
                        {value: 6,  label: 'Junho'},
                   ]

            const yaers = [
              {value: 2022,  label: 2022},
              {value: 2021,    label: 2021},
              {value: 2020,  label: 2020},
                 ]       


            return(
             <Container>           
               <ContentHeader title={titleOptions.title} lineColor={titleOptions.lineColor}>
                  <SelectInput options={months} />
                  <SelectInput options={yaers} />
               </ContentHeader>
               
               
               <Filters>
                 <button
                 type="button" className="tag-filter tag-filter-recurrent">
                    Recorretes
                 </button>
                 <button
                 type="button" className="tag-filter tag-filter-eventual">
                    Eventuais
                 </button>
               </Filters>
               
               
               <Content>
                 <HistoryFinanceCard 
                 
                 tagColor="#E44C4E"
                 title="Financiamento"
                 subtitle="11/04/2022"
                 amount="R$ 1350,00"/>

                


               </Content>

            
             </Container>
            );
}
export default List;