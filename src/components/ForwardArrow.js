import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import '../stylesheets/ForwardArrow.css';

function ForwardArrow(props) {
  return (
    <div className="ForwardArrow">
      <Link to={props.url} className="Link">
        <FontAwesomeIcon icon={faArrowRight} size='4x'/>
      </Link>
    </div>
  );
}

export default ForwardArrow;
