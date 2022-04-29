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
import formatDate from "../../utils/formatDate";
import listOfMonths from '../../utils/months';
import {uuid} from 'uuidv4';


interface IDate{
  id:string,
  description :string,
  amountFormatted:string,
  frequency:string,
  dataFormatted:string,
  tagColor:string;
}




const List : React.FC = () =>{



            const [monthSelected,setMonthSelected] = useState<string>(String(new Date().getMonth() +1 ));
            const [yearSelected,setYearSelected] = useState<string>(String(new Date().getFullYear()));         
            const { type } = useParams();
            const titleOptions = useMemo(() => {
                 return type === 'balance-entry'
                      ? { title: 'Entradas', lineColor: '#187D5F' }
                        : { title: 'Saída', lineColor: '#CC2A2C' };
                  }, [type]);
            
            const [data,setData] =useState<IDate[]>([]);
                  
  /*           const months = [
                        {value: 1,    label: 'janeiro'},
                        {value: 2,    label: 'fevereiro'},
                        {value: 3,    label: 'março'},
                        {value: 4,  label: 'Abril'},
                        {value: 5,    label: 'maio'},
                        {value: 6,  label: 'Junho'},
                        {value: 7,    label: 'julho'},
                        {value: 8,    label: 'agosto'},
                        {value: 9,    label: 'setembro'},
                        {value: 10,    label: 'outubro'},
                        {value: 11,    label: 'novembro'},
                        {value: 12,    label: 'desembro'},
                   ] */

       /*       const years = [
              {value: 2021,    label: 2021},
              {value: 2019,  label: 2019},
              {value: 2020,  label: 2020},
                 ]   */      
                
           
            
            const listaData = useMemo(()=> {
              return type === 'balance-entry'? gains : expenses},[type])
            
            
            useEffect(()=>{
               
             const filteredData = listaData.filter((item) =>{
                
              const date = new Date(item.date);
              const month = String (date.getMonth() +1) ;
              const year = String (date.getFullYear());

              return month === monthSelected && year === yearSelected;
            });  
              
             const formattedData = filteredData.map(item => {  
              return {
                  //:String( Math.random() * listaData.length)
                  id:String(new Date().getTime()) + item.amount,
                  description : item.description,
                  amountFormatted:formatCurrency(Number(item.amount)),
                  frequency:item.frequency,
                  dataFormatted: formatDate(item.date),
                  tagColor:item.frequency==='recorrente'? '#4e41f0':'#E67846' 
                };
              });
              
              setData(formattedData);

            },[type,listaData,monthSelected,yearSelected])
            
            const  months = useMemo(() => {
             
                return listOfMonths.map((month, index) =>{

                  return{
                    value: index +1 ,
                    label: month ,
                  }
                })
                
             
             
            },[]);  
            
            
            const  years = useMemo(() => {
              let uniqueYaers: number[] = [];
              
              listaData.forEach(item => {
                const date = new Date(item.date);
                const year = date.getFullYear();

                if(!uniqueYaers.includes(year)){
                  uniqueYaers.push(year)
                  console.log(uniqueYaers)
                }
                
              });
              return uniqueYaers.map(year => {
                return{
                  value: year,
                  label: year,
                }
              });
            },[listaData]);  
              
           
            return(
             <Container>           
               <ContentHeader title={titleOptions.title} lineColor={titleOptions.lineColor}>
                  <SelectInput options={months} onChange= {(e)=>setMonthSelected(e.target.value)} defaultValue={monthSelected} />
                  <SelectInput options={years} onChange= {(e)=>setYearSelected(e.target.value)}   defaultValue={yearSelected}/>
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