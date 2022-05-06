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
dateFormatted:string,
tagColor:string;
}


const List : React.FC = () =>{

          const [monthSelected,setMonthSelected] = useState<string>(String(new Date().getMonth() +1 ));
          const [yearSelected,setYearSelected] = useState<string>(String(new Date().getFullYear()));
          const[frequencyFilterSelected, setFrequencyFilterSelected] = useState(['recorrente','eventual']);         
          const { movimentType } = useParams();
        
        /* const titleOptions = useMemo(() => {
                return movimentType === 'balance-entry'
                    ? { title: 'Entradas', lineColor: '#187D5F' }
                      : { title: 'Saída', lineColor: '#CC2A2C' };
                }, [movimentType]);
          
                
                
                const listaData = useMemo(()=> {
                  return movimentType === 'balance-entry'? gains : expenses},[movimentType]);
                  */
          const [data,setData] =useState<IDate[]>([]);            
          const pageData = useMemo(()=> {
            return movimentType === 'balance-entry' ? 
            {
              title :'Entradas',
              lineColor: '#187D5F',
              data: gains
            }
            :{
              title :'Saidas',
              lineColor: '#CC2A2C',
              data:expenses
            }
          },[movimentType]);  

          useEffect(()=>{
            const {data} = pageData; 
            const filteredData = data.filter((item) =>{
              
            const date = new Date(item.date);
            const month = String (date.getMonth() +1) ;
            const year = String (date.getFullYear());

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
          });  
            
            const formattedData = filteredData.map(item => {  
            return {
                //:String( Math.random() * listaData.length)
                id:String(new Date().getTime()) + item.amount,
                description : item.description,
                amountFormatted:formatCurrency(Number(item.amount)),
                frequency:item.frequency,
                dateFormatted: formatDate(item.date),
                tagColor:item.frequency==='recorrente'? '#4e41f0':'#E67846' 
              };
            });
            
            setData(formattedData);

          },[movimentType,pageData,monthSelected,yearSelected,frequencyFilterSelected])

          const handleFrequencyClick = (frequency: string)=>{
            const alreadySelected = frequencyFilterSelected.findIndex(item => item === frequency);

            if(alreadySelected >=0){
              const filtered = frequencyFilterSelected.filter(item => item !== frequency);
              setFrequencyFilterSelected(filtered);
            }else{
              setFrequencyFilterSelected((prev) => [...prev,frequency]);
            }

          }
          
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
                        
          return(
            <Container>           
              <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange= {(e)=>setMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} onChange= {(e)=>setYearSelected(e.target.value)}   defaultValue={yearSelected}/>
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