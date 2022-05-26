

import React, {useMemo,useState,useEffect,} from "react";
import { Container,Content,Filters } from "./style";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import gains from "../../repositores/gains";
import expenses from "../../repositores/expenses";
import { useParams } from "react-router-dom";

import formatCurrency from "../../utils/formatCurrency";
import formatDate from "../../utils/formatDate";
//import listOfMonths from '../../utils/months';
import {listOfMonths} from '../../utils/months';



interface IDate{
id:string,
description :string,
amountFormatted:string,
frequency:string,
dateFormatted:string,
tagColor:string;
}


const List : React.FC = () =>{

          const [data,setData] =useState<IDate[]>([]);            
          const [monthSelected,setMonthSelected] = useState<number>(new Date().getMonth() +1 );
          const [yearSelected,setYearSelected] = useState<number>(new Date().getFullYear());
          const[frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente','eventual']);         
         
          
          
          
          
          const {movimentType} = useParams();  
          const pageData = useMemo(() => {
            
            
            return movimentType === 'exit-balance'
              ? {
                title: 'Saídas',
                lineColor: '#e44c4e',
                data: expenses,
              }
              : {
                title: 'Entradas',
                lineColor: '#4e41f0',
                data: gains,
                };
          }, [movimentType]);
        
        
       /* 
           const pageData = useMemo(()=> {
            
            
            return movimentType === 'entry-balance'?{
              title:'Entradas',              
              lineColor: '#187D5F',
              data:gains   
            }
            :{
              title :'Saidas',
              lineColor: '#CC2A2C',
              data: expenses
            } 
            
          },[movimentType]);  
          */
         const  years = useMemo(() => {
           let uniqueYaers: number[] = [];
           
           const {data} = pageData;
           
           data.forEach(item => {
             const date = new Date(item.date);
             const year = date.getFullYear();
             
             if(!uniqueYaers.includes(year)){
               uniqueYaers.push(year)
               
             }
             
           });
           return uniqueYaers.map(year => {
             return{
               value: year,
               label: year,
             }
           });
         },[data]);  
         
         
         
         const months = useMemo(() => {
           return listOfMonths.map(item => {
             return{
               value: item.value,
               label: item.label,
              }
            });
          },[data]);
          
          const handleFrequencyClick = (frequency: string)=>{
            const alreadySelected = frequencyFilterSelected.findIndex((item )=> item === frequency);
            
            if(alreadySelected >=0){
              const filtered = frequencyFilterSelected.filter((item) => item !== frequency);
              setFrequencyFilterSelected(filtered);
             }else{
               setFrequencyFilterSelected((prev) => [...prev,frequency]);
             }
             
           }
          const handleMonthSelected = (month: string) => {
            try {
              const parseMonth = Number (month);
              setMonthSelected(parseMonth);
            } catch  {
              throw new Error("Valor do mês invalido. coloque um number")
            }
          }
          const handleYearSelected = (yaer: string) => {
            try {
              const parseYaer = Number (yaer);
              setYearSelected(parseYaer);
            } catch  {
              throw new Error("Valor do ano invalido. coloque um number")
            }
          }                  
          useEffect(()=>{
            const {data} = pageData; 
            const filteredData = data.filter((item) =>{
              
            const date = new Date(item.date);
            const month =  date.getMonth() +1 ;
            const year =  date.getFullYear();
    
            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
          });  
            
            const formattedData = filteredData.map((item) => {  
            return {
                id:String(Math.random() * data.length),
                description : item.description,
                amountFormatted:formatCurrency(Number(item.amount)),
                frequency:item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:item.frequency==='recorrente'? '#4e41f0':'#E67846' 
              };
            });
            
          
          setData(formattedData);
          
        },[movimentType,pageData,monthSelected,yearSelected,frequencyFilterSelected])
          return(
            <Container>           
              <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} 
                onChange= {(e)=>handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} 
                onChange= {(e)=>handleYearSelected(e.target.value)}   defaultValue={yearSelected}/>
              </ContentHeader>
              
              <Filters>
                <button
                type="button" className ={`tag-filter tag-filter-recurrent
                ${frequencyFilterSelected.includes('recorrente') && 'tag-actived' }`}
                onClick={() => handleFrequencyClick('recorrente')}
                >
                  Recorretes
                </button>
                <button
                type="button" 
                className={`tag-filter tag-filter-eventual
                ${frequencyFilterSelected.includes('eventual') && 'tag-actived' }`}
                onClick={() => handleFrequencyClick('eventual')}
                >
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
                  subtitle= {item.dateFormatted}
                  amount={item.amountFormatted}/>
                  ))  
                }      
              
              </Content>
          
            </Container>
          );
}
export default List;