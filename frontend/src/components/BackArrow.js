import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


import '../stylesheets/BackArrow.css';

function BackArrow(props) {
  return (
    <div className="BackArrow">
      <Link to={props.url}>
        <FontAwesomeIcon icon={faArrowLeft} color='grey' size='4x'/>
      </Link>
    </div>
  );
}

export default BackArrow;
