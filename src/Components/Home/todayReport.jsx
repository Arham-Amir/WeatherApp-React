/* eslint-disable react/prop-types */
import Search from '../Global/searchBar.jsx'
import CurrentTemperature from '../Global/currentTemperature.jsx'
import TodaysForecast from '../Global/todaysForecast.jsx'
import AirConditions from './airConditions.jsx'


export default function TodayReport(props = '') {
    return (
        <section className={`${props.class} py-6 pr-2 w-full`} >
            <Search city = {props.sCity} setSCity = {props.setSCity} btnPress={props.btnPress} setBtnPress={props.setBtnPress}></Search>
            <CurrentTemperature btnPress={props.btnPress} loc={props.loc} page="Home" class="w-9/12 mx-auto my-6 flex justify-between"></CurrentTemperature>
            <TodaysForecast btnPress={props.btnPress} loc={props.loc} box='6' class="rounded-2xl bg-gray-700 p-6 mx-auto"></TodaysForecast>
            <AirConditions btnPress={props.btnPress} loc={props.loc} ></AirConditions>
        </section>
    )
}