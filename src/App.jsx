/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useEffect, useState } from "react";
import Navbar from './Components/Base/navbar.jsx'
import TodayReport from './Components/Home/todayReport.jsx'
import NextDayForecast from './Components/Home/nextDayForecast.jsx'
import AddedCities from './Components/Cities/addedCities.jsx'
import SelectedCityInfo from './Components/Cities/selectedCityInfo.jsx'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DotLoader from "react-spinners/DotLoader.js";

function getCity() {

}

export default function App() {
  const API_KEY = "3c42e01c0cf5437c928feb081ca04486";
  const [currLoc, setCurrLoc] = useState(null);
  const [btnPress, setBtnPress] = useState(true)
  const [loading, setLoading] = useState(true)
  const [sCity, setSCity] = useState(null);
  let [selectedCity, setSelectedCity] = useState(false);
  async function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve([position.coords.latitude, position.coords.longitude]);
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
        reject(new Error("Geolocation is not supported"));
      }
    });
  }

  async function getCurrentWeather() {
    const [lat, long] = await getLocation();
    let resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`)
      .then((response) => response.json());
    setCurrLoc(resp);
    setLoading(false);
  }
  async function getCityWeather() {
    let resp = null;
    try {
      resp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${sCity}&appid=${API_KEY}`);
      if (!resp.ok) {
        throw new Error('Invalid City Name !!!')
      }
      resp = await resp.json();
    }
    catch (error) {
      resp = currLoc;
      alert(error);
    }
    setCurrLoc(resp);
    setLoading(false);
  }
  useEffect(() => {
    if (btnPress) {
      (async () => {
        try {
          await getCurrentWeather();
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [btnPress]);


  useEffect(() => {
    if (sCity) {
      setBtnPress(false);
      setLoading(true);
      (async () => {
        try {
          await getCityWeather();
        } catch (error) {
          console.warn(error);
        }
      })();
    }
  }, [sCity]);


  return (
    <section className="flex lg:flex-row sm:flex-col">
      {loading ?
        <DotLoader
          color={`#ffffff`}
          loading={true}
          aria-label="Loading Spinner"
          size={150}
          data-testid="loader"
        />
        :
        <>
          <Router>
            <Switch>
              <Route exact path={['/', '/CurrentLocation']}>
                <Navbar active={'Home'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0"></Navbar>
                <TodayReport city={sCity} setSCity={setSCity} setBtnPress={setBtnPress} btnPress={btnPress} loc={currLoc} class="box-border lg:basis-4/7 sm:basis-full"></TodayReport>
                <NextDayForecast btnPress={btnPress} loc={currLoc} class="lg:basis-2/7 sm:mb-[7rem] lg:mb-0"></NextDayForecast>
              </Route>
              <Route path="/Search/">
                <Navbar active={'Home'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0"></Navbar>
                <TodayReport city={sCity} setSCity={setSCity} setBtnPress={setBtnPress} btnPress={btnPress} loc={currLoc} class="box-border lg:basis-4/7 sm:basis-full"></TodayReport>
                <NextDayForecast btnPress={btnPress} loc={currLoc} class="lg:basis-2/7 sm:mb-[7rem] lg:mb-0"></NextDayForecast>
              </Route>
              <Route exact path="/cities">
                <Navbar active={'Cities'} class="lg:basis-1/7 lg:static 2xl:basis-1/7 sm:fixed sm:bottom-0 z-10"></Navbar>
                <AddedCities city={sCity} setSCity={setSCity} selectedCity={selectedCity} setSelectedCity={setSelectedCity} class="basis-4/7 "></AddedCities>
                {!selectedCity ?
                  <DotLoader
                    color={`#ffffff`}
                    loading={true}
                    aria-label="Loading Spinner"
                    size={150}
                    data-testid="loader"
                  />
                  :
                  <SelectedCityInfo loc={selectedCity} class="basis-2/7 sm:mb-[7rem] lg:mb-0"></SelectedCityInfo>
                }
              </Route>
            </Switch>
          </Router>
        </>
      }
    </section >
  );
}
