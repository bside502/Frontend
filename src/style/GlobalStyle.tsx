import { createGlobalStyle } from 'styled-components';
import PretendardVariable from '@/assets/fonts/PretendardVariable.woff2';
import GmarketSansLight from '@/assets/fonts/GmarketSansLight.otf';
import GmarketSansMedium from '@/assets/fonts/GmarketSansMedium.otf';
import GmarketSansBold from '@/assets/fonts/GmarketSansBold.otf';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard Variable';
    font-style: normal;
    src: url(${PretendardVariable}) format('woff2');
  }
      
  @font-face {
    font-family: 'GmarketSansLight';
    font-style: normal;
    src: url(${GmarketSansLight}) format('opentype');
  }

  @font-face {
    font-family: 'GmarketSansMedium';
    font-style: normal;
    src: url(${GmarketSansMedium}) format('opentype');
  }

  @font-face {
    font-family: 'GmarketSansBold';
    font-style: normal;
    src: url(${GmarketSansBold}) format('opentype');
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Pretendard Variable';
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -0.025em; 
  }

  p, h1, h2, h3 {
    margin: 0;
    padding: 0;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    
  }

  img {
    border: none;
  }
`;

export default GlobalStyle;
