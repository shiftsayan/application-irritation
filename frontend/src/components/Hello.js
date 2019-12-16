import React from 'react';
import '../stylesheets/Hello.css';
import BackArrow from './BackArrow';
import ForwardArrow from './ForwardArrow';

function Hello() {
  return (
    <>
      <BackArrow />
      <ForwardArrow url='/name' />
      <div className='Container'>
        <div className='Title'>
          Hello, World!
        </div>
        <div className='Text'>
          This is Application Irritation, an AI (geddit?) that helps you fill out online forms. Except, this AI does not follow the best design principles. It is a demonstration of what <span className="not">NOT</span> to do while designing your AI-powered software. Your task is to sign up for a new account on our service against the wishes of AI!
        </div>
        <div className='Footer'>
          Designed with <span role='img' aria-label='love'>❤️</span> by Emily Lo and Sayan Chaudhry.
        </div>
      </div>
    </>
  );
}

export default Hello;
