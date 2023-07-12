/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useRef } from 'react';
export default function Search(props = '') {
  const searchInput = useRef(null);
  const history = useHistory();

  function searchCity() {
    props.setSCity(searchInput.current?.value );
    history.push(`/Search/${searchInput.current?.value}`);
  }
  window.addEventListener('keyup', (e) => {
    if (e.key == "Enter") {
      searchCity();
    }
    else if (e.key == '/') {
      searchInput.current.focus();
    }
  });

  return (
    <section className={`${props.class} 2xl:text-2xl w-11/12 relative mx-auto`}>
      <input ref={searchInput} type="search" className="text-white w-full bg-gray-700 p-2 pl-4 rounded-lg mx-auto" placeholder="Search for cities" />
      <Link to='/CurrentLocation' onClick={() => props.setBtnPress(!props.btnPress)}>
        <FontAwesomeIcon className="absolute bottom-3 right-[3.3rem] 2xl:right-[5rem]" icon={faLocationCrosshairs} style={{ color: "#ffffff", }} />
      </Link>
      <button onClick={searchCity} ><FontAwesomeIcon icon={faMagnifyingGlass} className="absolute bottom-3 right-7 2xl:right-10" style={{ color: "#ffffff", }} /></button>
    </section>

  )
}
