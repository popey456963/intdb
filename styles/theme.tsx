const theme = {
  colors: {
    primary: "#5a57f4",
    black: "#121129",
    greyText: "#c6c5d1",
    border: "#EDEDED",
    coreGrey: "#74767d",
    lightGrey: "#f9f9f9",
  },
  fonts: {
    primaryFont: `font-family: erbaum, sans-serif;`,
    heading: `
      font-family: erbaum, sans-serif;
      font-weight: 900;
      font-style: normal;
      font-size: 44px;
      
      @media (max-width: 550px) {
        font-size: 30px;
      }
      `,
    paragraph: `
      font-family: sofia-pro, sans-serif; 
      font-weight: 300;
      font-size: 17px;`,
  },
  queries: {
    mainWidth: `
      width: 800px;
      @media (max-width: 1000px) {
        width: 100%;
      }
      @media (max-width: 550px) {
        width: 100%;
      }`,
  },
}

export default theme
