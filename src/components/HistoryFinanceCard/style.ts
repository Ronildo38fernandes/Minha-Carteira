import styled from "styled-components";

interface IContainerProps{
            color:string;

}

interface ItagProps{
            color:string;
}
export const  Container = styled.li<IContainerProps>`
            background-color:${props => props.color} ;
            list-style: none;
            border-radius: 5px;
            margin: 10px 0;
            padding: 12px 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            cursor: pointer;
            transition: all .3s;
            position: relative;
            
            &:hover{
                        opacity:.7;
                        transform:  translateX(12px);
            }
            >div {
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        padding-left: 8px;
            }


`;
export const  Tag = styled.div<ItagProps>`
            
            width: 10px;
            height:60%;

            background-color: ${props => props.color};
            position: absolute;
            left: 0;

`;
