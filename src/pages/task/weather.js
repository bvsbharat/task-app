import React, { useEffect, useState } from "react";
import { getData } from "../../redux/action";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import SearchCity from "../../components/WeatherInt/SearchCity";
import Title from "../../components/WeatherInt/Title";
import Result from "../../components/WeatherInt/Result";
import NotFound from "../../components/WeatherInt/NotFound";
import Setting from "../../components/Setting";

const WeatherWrapper = styled.div`
  max-width: 1500px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  width: 100%;
  position: relative;
`;

const WeatherInt = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const weatherInfo = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);
  const unitType = useSelector((state) => state.UnitType);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("location")) {
        setValue(localStorage.getItem("location"));
        dispatch(
          getData({
            query: localStorage.getItem("location"),
            unit: unitType, // values are (metric, standard, imperial)
          })
        );
      }
    }
  }, []);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearchCity = (e) => {
    e.preventDefault();

    if (typeof window !== "undefined") {
      localStorage.setItem("location", value);
    }

    dispatch(
      getData({
        query: value,
        unit: unitType, // values are (metric, standard, imperial)
      })
    );
  };

  return (
    <>
      <WeatherWrapper>
        <Title weatherInfo={weatherInfo} error={error} />
        <SearchCity
          value={value}
          showResult={(weatherInfo || error) && true}
          change={handleInputChange}
          submit={handleSearchCity}
        />
        {weatherInfo && <Result weather={weatherInfo} />}
        {error && <NotFound error={error} />}
        <Setting />
      </WeatherWrapper>
    </>
  );
};

export default WeatherInt;
