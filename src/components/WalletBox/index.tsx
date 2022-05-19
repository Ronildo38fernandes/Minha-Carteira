import React, { useMemo } from "react";

import { Container } from "./style";
import CountUp from "react-countup";
import dollarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

interface IwalletBoxProps{
          title: string;
          amount: number;
          footerlabel: string;
          icon: 'dolar' | 'arrowUp' | 'arrowDown';
          color: string;
}



const WalletBox : React.FC<IwalletBoxProps> = ({
          title,
          amount,
          footerlabel,
          icon,
          color 
}) =>{

            const iconSelected = useMemo(() =>{
               if(icon == 'dolar') return dollarImg;
               if(icon == 'arrowDown') return arrowDownImg;
               if(icon == 'arrowUp') return arrowUpImg;
            },[icon]);          
            return(
            
            <Container color = {color}>
                        <span>{title}</span>
                        <h1><CountUp
                        end={amount}
                        prefix={"R$"}
                        separator={"."}
                        decimal={","}
                        decimals={2} /></h1>
                        <small>{footerlabel}</small>
                        <img src={iconSelected} alt={title} />
                        
                        
            </Container>

            );
}
export default WalletBox;