import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
        font-family: "Kumbh Sans", sans-serif;
    }
    html{
        font-size:62.5%
    }

    body{
     
        @media only screen and (min-width:90rem){
            padding:0 16.5rem;
            
        }
    }


`;

export default GlobalStyles;
