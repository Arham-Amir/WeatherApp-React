/* eslint-disable react/prop-types */
import logo from '../../assets/logo.png'

export default function Page(props = '') {
    return (
        <section className={`${props.class} flex justify-center w-1/2`} >
            <img src={logo} alt="Not Found" />
        </section>
    )
}