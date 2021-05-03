import React, { useState } from "react";
import { toggleTemp, getData } from "../redux/action";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOn, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import device from "../responsive/Device";
const SearchIcon = styled.span`
  display: block;
  position: fixed;
  bottom: 10px;
  right: 5px;
  transform: translate(-50%, -50%);
  height: 14px;
  width: 14px;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  @media ${device.tablet} {
    height: 15px;
    width: 15px;
    font-size: 15px;
  }
  @media ${device.laptop} {
    height: 16px;
    width: 16px;
    font-size: 16px;
  }
`;

export default function Setting() {
  const dispatch = useDispatch();
  const UnitType = useSelector((state) => state.UnitType);
  return (
    <SearchIcon
      onClick={() => {
        let type = "metric";
        if (UnitType === "metric") {
          type = "imperial";
        }
        dispatch(
          toggleTemp({
            query: localStorage.getItem("location"),
            unit: type,
          })
        );
      }}
    >
      <FontAwesomeIcon
        icon={UnitType === "metric" ? faToggleOn : faToggleOff}
      />
    </SearchIcon>
  );
}
