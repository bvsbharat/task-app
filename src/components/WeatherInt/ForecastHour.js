import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import SmallLabel from "./SmallLabel";
import Text from "./Text";
import device from "../../responsive/Device";
import WeatherIcon from "../WeatherIcon";

const ForecastWrapper = styled.div`
  flex-shrink: 0;
  flex-basis: 90px;
  padding: 10px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.3);
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
  @media ${device.tablet} {
    flex-basis: 110px;
  }
  @media ${device.laptop} {
    flex-basis: 125px;
  }
  @media ${device.laptopL} {
    flex-basis: 240px;
  }
`;

const IconWrapper = styled.div`
  text-align: center;
`;

const ForecastHour = (props) => {
  const { date, description, icon, unitsLabels, temperature } = props;

  return (
    <ForecastWrapper>
      <SmallLabel align="center" weight="400">
        {date}
      </SmallLabel>
      <IconWrapper>
        <WeatherIcon path={icon} size={60} color="lightBlue" />
      </IconWrapper>
      <Text align="center">{description}</Text>
      <Text align="center">
        Min : {temperature.min}&#176; {unitsLabels.temperature} Max:{" "}
        {temperature.max}&#176; {unitsLabels.temperature}
      </Text>
    </ForecastWrapper>
  );
};

ForecastHour.propTypes = {
  temperature: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ForecastHour;
