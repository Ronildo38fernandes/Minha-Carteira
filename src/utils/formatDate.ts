const formatDate = (date: string) : string =>{
           const dateformatted = new Date(date)
           const year = dateformatted.getFullYear();

           
           
           const month = dateformatted.getMonth()+1 > 9 
           ? dateformatted.getMonth() +1  : `0${dateformatted.getMonth()+1}`;
           
           
           const day = dateformatted.getDate() > 9 
           ? dateformatted.getDate() : `0${dateformatted.getDate()}`;

           
           
           
           return `${day}/${month}/${year}`;
           
};

export default formatDate;