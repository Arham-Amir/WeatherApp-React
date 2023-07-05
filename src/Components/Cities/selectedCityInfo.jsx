/* eslint-disable react/prop-types */
import CurrentTemperature from '../Global/currentTemperature.jsx'
import TodaysForecast from '../Global/todaysForecast.jsx'
import FutureWeatherReport from '../Global/futureWeatherReport.jsx'

export default function SelectedCityInfo(props = '') {
    return (
        <section className={`${props.class}`}>
            <CurrentTemperature loc = {props.loc} class="w-11/12 mt-16 sm:mt-8 flex justify-between"></CurrentTemperature>
            <TodaysForecast loc = {props.loc} box='3' class="my-5 py-5 border-t-2 border-b-2 border-gray-600"></TodaysForecast>
            <FutureWeatherReport loc = {props.loc} blocks='3' paddingInBlock = "py-3" class="w-11/12 text-gray-300"></FutureWeatherReport>
        </section>
    )
}