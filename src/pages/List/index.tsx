import React, {useMemo,useState,useEffect} from "react";
import { Container,Content,Filters } from "./style";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from "react-router-dom";
import gains from "../../repositores/gains";
import expenses from "../../repositores/expenses";
import { match } from "assert";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate"




interface IDate{
  id:string,
  description :string,
  amountFormatted:string,
  frequency:string,
  dataFormatted:string,
  tagColor:string;
}




const List : React.FC = () =>{
           
            const { type } = useParams();
            const titleOptions = useMemo(() => {
                 return type === 'balance-entry'
                      ? { title: 'Entradas', lineColor: '#187D5F' }
                        : { title: 'Saída', lineColor: '#CC2A2C' };
                  }, [type]);
            
            const [data,setData] =useState<IDate[]>([]);
                  
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

            
            const listaData = useMemo(()=> {
              return type === 'balance-entry'? gains : expenses},[type])
            
            
            useEffect(()=>{
               
             const response = listaData.map((item) =>{
                return {
                  id:String( Math.random() * listaData.length),
                  description : item.description,
                  amountFormatted:formatCurrency(Number(item.amount)),
                  frequency:item.frequency,
                  dataFormatted: formatDate(item.date),
                  tagColor:item.frequency==='recorrente'? '#4e41f0':'#E67846' 
                };
              });
              
              setData(response);

            },[type])
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
                 
                 {

                   data.map( item => (
                   
                   <HistoryFinanceCard 
                   
                   key={item.id}
                   tagColor={item.tagColor}
                   title={item.description}
                   subtitle= {item.dataFormatted}
                   amount={item.amountFormatted}/>
                   ))  
                 }     


               </Content>

            
             </Container>
            );
}
export default List;