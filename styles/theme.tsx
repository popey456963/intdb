const theme = {
  colors: {
    primary: "#5a57f4",
    black: "#121129",
    greyText: "#c6c5d1",
    border: "#EDEDED",
    coreGrey: "#74767d",
    lightGrey: "#f9f9f9",
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
