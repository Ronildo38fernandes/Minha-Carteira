import React from "react";
import{ThemeProvider} from 'styled-components'
import GlobalStyles from "./styles/GlobalStyles";


import Dark from "./styles/themes/dark";
import Routes from "./routes";


const App : React.FC = () =>{
            return(
                        <ThemeProvider theme={Dark}>
                        <GlobalStyles />
                            <Routes/>
                        </ThemeProvider>
 

            );
}
export default App;