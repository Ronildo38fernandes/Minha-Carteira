import React ,{useState, useMemo}from "react";
import ContentHeader from '../../components/ContentHeader';
import SelectInput from "../../components/SelectInput";
import {listOfMonths} from '../../utils/months';
import expenses from "../../repositores/expenses";
import gains from "../../repositores/gains";
import WalletBox from "../../components/WalletBox";
import MessangeBox from "../../components/MenssageBox";
import HistoryBox from "../../components/HistoryBox";
import PieChartBox from "../../components/PieChartBox";
import happyImg from '../../assets/happy.svg'
import sadImg from '../../assets/sad.svg'
import { 
  Container,
  Content,
 } from './style'
const Dashboard : React.FC = () =>{
           

 const months = useMemo(() => {
  return listOfMonths.map(item => {
      return{
          value: item.value,
          label: item.label,
      }
  });
},[]);


           
const  years = useMemo(() => {
 let uniqueYaers: number[] = [];


 
[...expenses,...gains].forEach(item => {
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
},[]); 




const [monthSelected,setMonthSelected] = useState<number>(new Date().getMonth() +1 );
const [yearSelected,setYearSelected] = useState<number>(new Date().getFullYear());
const totalExpenses = useMemo(()=>{
  let total: number = 0;
  
   expenses.forEach(item => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month =date.getMonth() +1;

    if(month === monthSelected && year === yearSelected){
      try{
        
        total += Number(item.amount)
      }catch{
        throw new Error('Valor errado ! deve ser um numero')
      }
    }
    
    
  })

  return total;
},[monthSelected,yearSelected])
const totalGains = useMemo(()=>{
  let total: number = 0;
  
   gains.forEach(item => {
    const date = new Date(item.date);
    const year = date.getFullYear();
    const month =date.getMonth() +1;

    if(month === monthSelected && year === yearSelected){
      try{
        
        total += Number(item.amount)
      }catch{
        throw new Error('Valor errado ! deve ser um numero')
      }
    }
    
    
  })

  return total;
},[monthSelected,yearSelected])

const menssage = useMemo(()=>{
  if(totalExpenses - totalGains >  0 ){
    return{
      title: "que triste",
      description : "Voc?? GASTOU MAIS DO QUE GANHA",
      footerText:"Verifique seus gasto atoa",
      icon:sadImg

    }
  }else if(totalExpenses - totalGains ==  0 ){
    return{
      title: "Sem Saldo",
      description : "Voc?? GASTOU tudo",
      footerText:"Verifique seus gasto atoa",
      icon:sadImg
    }
  }else{
    return{
      title:"Muito Bem!",
      description:"Sua carteira est?? positiva",
      footerText:"Continue assim. Considere investir o seu saldo",
      icon:happyImg
    }
  }
},[totalExpenses,totalGains ]);

const relationExpensesVersusGains = useMemo(() =>{
  const total = totalGains + totalExpenses;
  const gainsPercent =(totalGains/total) * 100;
  const expensesPercent = (totalExpenses/total) * 100;

  const data = [
    {
      name: "Entradas",
      value:totalExpenses,
      percent: Number(gainsPercent.toFixed(1)),
      color: "#F7931B"
    },
    {
      name: "Sa??das",
      value:totalExpenses,
      percent: Number(expensesPercent.toFixed(1)),
      color: "#E44C4E"
    },
  ];
  return data;

},[totalGains, totalExpenses])
const historyData = useMemo(() => {
  return listOfMonths.map((_,month) => {
    let amountEntry = 0 ;
    gains.forEach(gain =>{
      const date = new Date(gain.date);
      const gainMonth = date.getMonth();
      const gainYear = date.getFullYear();
      if(gainMonth === month && gainYear ===yearSelected){
        try {
          
          amountEntry += Number(gain.amount) ;
        } catch  {
          throw new Error('valor invalidos')
        }
      }
    });
    let amountOutput = 0 ;
    expenses.forEach(expense =>{
      const date = new Date(expense.date);
      const expenseMonth = date.getMonth();
      const expenseYear = date.getFullYear();
      if(expenseMonth === month && expenseYear ===yearSelected){
        try {
          
          amountOutput += Number(expense.amount) ;
        } catch  {
          throw new Error('valor invalidos')
        }
      }
    });
    return{
      monthNumber : month,
      month: listOfMonths[month],
      amountEntry,
      amountOutput

    }

  })
},[]);

 const handleMonthSelected = (month: string) => {
   try {
     const parseMonth = Number (month);
     setMonthSelected(parseMonth);
   } catch (error) {
     throw new Error("Valor do m??s invalido. coloque um number")
   }
 }
 const handleYearSelected = (yaer: string) => {
   try {
     const parseYaer = Number (yaer);
     setYearSelected(parseYaer);
   } catch (error) {
     throw new Error("Valor do ano invalido. coloque um number")
   }
 }    
   
   
   return(
            
            <Container>
               <ContentHeader title="Dashboard" lineColor="#F7931f">
               <SelectInput options={months} 
                onChange= {(e)=>handleMonthSelected(e.target.value)} defaultValue={monthSelected} />
                <SelectInput options={years} 
                onChange= {(e)=>handleYearSelected(e.target.value)}   defaultValue={yearSelected}/>
               </ContentHeader>
               <Content>
                  <WalletBox 
                  title="Saldo"
                  color="#4E41F0"
                  amount={totalGains - totalExpenses}
                  footerlabel="Atualizado com base nos lan??amentos de entradas e sa??das"
                  icon="dolar"
                  />
               <WalletBox 
                  title="Entradas"
                  color="#f7931b"
                  amount={totalGains}
                  footerlabel="Atualizado com base nos lan??amentos de entradas "
                  icon="arrowUp"
                  />
               <WalletBox 
                  title="Sa??das"
                  color="#e44c4e"
                  amount={totalExpenses}
                  footerlabel="Atualizado com base nos lan??amento de  sa??das"
                  icon="arrowDown"
                  /> 
                <MessangeBox 
                title={menssage.title}
                description={menssage.description}
                footerText={menssage.footerText}
                icon={menssage.icon}
                />
                <PieChartBox data={relationExpensesVersusGains} />
                <HistoryBox 
                  data={historyData}
                  lineColorAmountEntry="#f7931b"
                  lineColorAmountOutput="#e44c4e"
                />
               </Content>
              
            </Container>

            );
}
export default Dashboard;