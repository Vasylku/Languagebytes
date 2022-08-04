import React, { Children, useState } from 'react';
import './dropdown.css';
import { Link } from 'react-router-dom';
import { Assignment } from '../../pages/assignment/create/assignment';
import { Button } from 'semantic-ui-react';


export const Dropdown=()=>{
  const [click, setClick] = useState(false);
 
  const handleClick = () => setClick(!click);
 
  

  const MenuItems = [
    {
      title: 'Assignment',
   path:"/assignment",
      name: 'dropdown-link'
    },
    {
      title: 'Quiz',
     path: '/quiz',
      name: 'dropdown-link'
    },
    {
      title: 'Essay',
     path:'/home',
      name: 'dropdown-link'
    },
   
  ];

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.name}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

