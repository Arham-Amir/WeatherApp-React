/* eslint-disable react/prop-types */

export default function TodaysForecast(props = '') {
    const infoComponents = [];

    let hour = new Date();
    hour = hour.getHours();
    let indi = 0;
    let clas = "";
    while (indi < props.box) {
        indi >= props.box-1 ? clas = "" : clas = "border-r-2 border-gray-600";
        infoComponents.push(<Info indi={indi} loc={props.loc} hour={hour % 24} class={clas} key={hour} />);
        hour += 3;
        indi += 1;
    }

    return (
        <section className={`${props.class} sm:mx-auto w-11/12 text-gray-300`} >
            <h1 className='2xl:text-2xl ml-2 mb-4'>Today&apos;s Forecast</h1>
            <section className={`grid ${'grid-cols-' + props.box} grid-flow-col`}>
                {infoComponents}
            </section>
        </section>
    )
}

function Info(props = '') {

    var hour = props.hour;
    var unit = ':00 AM';
    if (hour >= 12) {
        unit = ':00 PM';
    }
    if (hour > 12) {
        hour %= 12;
    }

    return (
        <section className={`${props.class} flex flex-col gap-3 justify-center items-center`}>
            <p className='lg:text-sm sm:text-[9px] 2xl:text-2xl'>{hour + unit}</p>
            <img className="w-8 2xl:w-16" src={`http://openweathermap.org/img/w/${props.loc.list[props.indi].weather[0].icon}.png`} alt="" />
            <h1 className='text-white lg:text-lg sm:text-md 2xl:text-2xl font-bold'>{Math.floor(props.loc.list[props.indi].main.temp - 273.15)}&deg;</h1>
        </section>
    )
}