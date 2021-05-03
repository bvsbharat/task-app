import React from "react";
import device from "../../responsive/Device";
import styled from "styled-components";
import SmallLabel from "./SmallLabel";
import Text from "./Text";
import BigLabel from "./BigLabel";
import WeatherIcon2 from "../WeatherIcon";

const WeatherDetailsWrapper = styled.div`
  flex-basis: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 10px 0;
  margin: 20px 0;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  align-self: flex-start;
  @media ${device.mobileL} {
    flex-basis: 50%;
  }
`;

const WeatherDetail = styled.div`
  flex-basis: calc(100% / 3);
  padding: 10px;
  @media ${device.laptop} {
    padding: 20px 10px;
  }
`;

const CurrentWeatherWrapper = styled.div`
  flex-basis: flex;
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto 1fr;
  margin: 20px 0;
  grid-gap: 30px;
  @media ${device.mobileL} {
    flex-basis: 50%;
    padding-right: 10px;
  }
  @media ${device.tablet} {
    grid-template-columns: auto 1fr;
    padding-right: 20px;
  }
`;

const WeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70px;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 100px;
    justify-content: flex-end;
  }
  @media ${device.laptop} {
    font-size: 120px;
  }
  @media ${device.laptopL} {
    font-size: 140px;
  }
`;

const TemperatureWrapper = styled.div`
  display: inline-block;
  // width: 100%;
  margin-left: 10px;
  h4 {
    text-align: center;
  }
`;

const Temperature = styled.h3`
  display: block;
  font-size: 50px;
  font-weight: 400;
  color: #ffffff;
  @media ${device.tablet} {
    font-size: 70px;
  }
  @media ${device.laptop} {
    font-size: 90px;
  }
  @media ${device.laptopL} {
    font-size: 110px;
  }
`;

const LocationWrapper = styled.div`
  flex-basis: 100%;
`;

export default function CurrentWeather({ weather, unitsLabels }) {
  const {
    city = "",
    state = "",
    country = "",
    date,
    description,
    icon,
    temperature,
    humidity,
    pressure,
    wind,
  } = weather;
  return (
    <>
      <LocationWrapper>
        <BigLabel>
          {city && city + ","} {state && state + ","} {country}
        </BigLabel>
        <SmallLabel weight="400">{date}</SmallLabel>
      </LocationWrapper>

      <CurrentWeatherWrapper>
        <div>
          <WeatherIcon2 path={icon} size={120} color="white" />
          <TemperatureWrapper>
            <Temperature>
              {temperature.current}&#176; {unitsLabels.temperature}
            </Temperature>
            <SmallLabel weight="400" firstToUpperCase>
              {description}
            </SmallLabel>
          </TemperatureWrapper>
        </div>
      </CurrentWeatherWrapper>

      <WeatherDetailsWrapper>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {wind} {unitsLabels.windSpeed}
          </SmallLabel>
          <Text align="center">Wind</Text>
        </WeatherDetail>
        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {pressure} hPa
          </SmallLabel>
          <Text align="center">Pressure</Text>
        </WeatherDetail>

        <WeatherDetail>
          <SmallLabel align="center" weight="400">
            {humidity} %
          </SmallLabel>
          <Text align="center">Humidity</Text>
        </WeatherDetail>
      </WeatherDetailsWrapper>
    </>
  );
}
