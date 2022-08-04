import React, { useState } from 'react'
import './dash-menu.css';
import { Link } from 'react-router-dom';
import { Dropdown } from '../dropdown/dropdown';
import { Assignment } from '../../pages/assignment/create/assignment';


export const DashMenu = () => {

  const [dropdown, setDropdown] = useState(false);

  const onDropdown = () => {
    if (window.innerWidth < 980) {
      setDropdown(true);
    } else setDropdown(true);
  }
  const closeDropdown = () => {
    if (window.innerWidth < 980) {
      setDropdown(false)
    } else setDropdown(false);
  }

  return (

    <div className='dash'>

      <ul className={'dash'}>
        <li
          className='dash-item'
          onMouseEnter={onDropdown}
          onMouseLeave={closeDropdown}
        >
          <Link
            to='/create'
            className='dash-links'
          >
            Create <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <Dropdown />}

        </li>
        <li className='dash-item'>

          <button className='dash-links'>
            Profile
          </button>
        </li>
        {/* <li className='dash-item'>
            <Link
              to='/classroom'
              className='dash-links'
            >
            Classroom
           </Link>  
          </li>*/}
        <li className='dash-item'>
          <Link
            to='/enrollment'
            className='dash-links'
          >
            Enrollment
          </Link>
        </li>
      </ul>

    </div>
  );
};

