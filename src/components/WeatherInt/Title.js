import React from "react";
import styled from "styled-components";
import device from "../../responsive/Device";

const AppTitle = styled.h1`
  display: block;
  height: 64px;
  margin: 0;
  padding: 20px 0;
  font-size: 20px;
  text-transform: capitalize;
  font-weight: 400;
  color: #ffffff;
  transition: 0.3s 1.4s;
  opacity: ${({ showLabel }) => (showLabel ? 1 : 0)};

  ${({ secondary }) =>
    secondary &&
    `
    opacity: 1;
    height: auto;
    position: relative;
    padding: 20px 0;
    font-size: 30px;
    top: 20%;
    text-align: center;
    transition: .5s;
    @media ${device.tablet} {
      font-size: 40px;
    }
    @media ${device.laptop} {
      font-size: 50px;
    }
    @media ${device.laptopL} {
      font-size: 60px;
    }
    @media ${device.desktop} {
      font-size: 70px;
    }
    
  `}

  ${({ showResult }) =>
    showResult &&
    `
    opacity: 0;
    visibility: hidden;
    top: 10%;
  `}
`;

export default function Title({ weatherInfo, error }) {
  return (
    <AppTitle secondary showResult={(weatherInfo || error) && true}>
      Weather Monitor.
    </AppTitle>
  );
}
