export const baseStyles = `

  .sp-wrapper {
    position: absolute;
    top: 20px;
    right: 0;
    width: 300px;
    max-height: 240px;
    background-color: white;
    z-index : 1000;
    display : none;
    broder-bottom : 1px solid #e9e9e9;
  }


  .shield-pass-icon {
    position : absolute;
    right : 5px;
    top : 50%;
    transform : translateY(-50%);
    cursor : pointer;
    z-index : 5000;
  }


  .sp-credentials-wrapper {
    position: absolute;
    top: 20px;
    right: 0;
    width: 300px;
    max-height: 240px;
    background-color: #141415;
    z-index : 7000;
    display : none;
    flex-direction : column;
    row-gap : 8px;
    broder-bottom : 1px solid white !important;
    -webkit-box-shadow: 0px 0px 13px 0px rgba(186,184,186,0.5);
    -moz-box-shadow: 0px 0px 13px 0px rgba(186,184,186,0.5);
    box-shadow: 0px 0px 13px 0px rgba(186,184,186,0.5);
    padding : 10px;
    border-radius: 7px;
    overflow: hidden;
  }

  .sp-credentials-wrapper a {
    display : inline-block;
    text-decoration : none;
    background-color : #F86262;
    color : white;
    padding : 3px 12px;
    border-radius : 4px;
    font-size : 0.9rem;
    margin-top : 5px;
    transition : all 0.4s ease;
    border : 1px solid transparent;

  }

  .sp-credentials-wrapper a:hover {
    background-color : #252528;
    border-color : #ffffff;
  }

  h3, h5 {
    margin : 0;
    padding : 0;
    color : #C3C1C1;
    font-weight : 500;
  }
  .sp-credentials-wrapper h3 {
    font-size : 1rem;
  }
  .sp-login {
    height: 100%;
    width: 100%;
    padding : 10px;
  }

  .shield-pass-icon img {
    width : 16px;
    height : 16px;
  }
`;
