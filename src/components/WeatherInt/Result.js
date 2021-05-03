import React from "react";
import "./Result.module.sass";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
import device from "../../responsive/Device";
import ForecastHour from "./ForecastHour";
import ResultFadeIn from "./ResultFadeIn";
import MediumLabel from "./MediumLabel";
import CurrentWeather from "./CurrentWeather";

const Results = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 40px 0;
  opacity: 0;
  visibility: hidden;
  position: relative;
  top: 20px;
  background: rgb(0 0 0 / 23%);
  margin-top: 50px;
  padding: 20px 40px;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  animation: ${ResultFadeIn} 0.5s 1.4s forwards;
`;

const ForecastWrapper = styled.div`
  flex-basis: 100%;
  margin: 20px 0;
  overflow: hidden;
`;

const Forecast = styled.div`
  position: relative;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-color: lightgray #ffffff;
  scrollbar-width: thin;
  margin-top: 20px;
  padding-bottom: 20px;
  @media ${device.laptop} {
    order: 4;
  }
`;

const Result = ({ weather }) => {
  const { current, forecast } = weather;
  const unitType = useSelector((state) => state.UnitType);

  const getUnitTypes = (type) => {
    if (type === "metric") return { temperature: "C", windSpeed: "Km/h" };
    return { temperature: "F", windSpeed: "mph" };
  };

  const forecasts = forecast.map(({ date, description, icon, temperature }) => (
    <ForecastHour
      key={date}
      date={date}
      description={description}
      icon={icon}
      temperature={temperature}
      unitsLabels={getUnitTypes(unitType)}
    />
  ));

  return (
    <Results>
      <CurrentWeather weather={current} unitsLabels={getUnitTypes(unitType)} />
      <ForecastWrapper>
        <MediumLabel weight="200"> Next 7 Day's Forecast</MediumLabel>
        <Forecast>{forecasts}</Forecast>
      </ForecastWrapper>
    </Results>
  );
};

Result.propTypes = {
  weather: PropTypes.shape({
    current: PropTypes.object,
    forecast: PropTypes.array,
  }).isRequired,
};

export default Result;
