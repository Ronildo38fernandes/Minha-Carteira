import styled from "styled-components";



interface ItagProps{
            color:string;
}
export const  Container = styled.li`
            background-color:${props => props.theme.colors.tertiary} ;
            list-style: none;
            border-radius: 9px;
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
            >div span{
                        font-size: 22px;
                        font-weight: 500;
            }


`;
export const  Tag = styled.div<ItagProps>`
            
            width: 12px;
            height:60%;

            background-color: ${props => props.color};
            position: absolute;
            left: 0;

`;
