import React from 'react';
import './Title.scss';

const Title = ({ title, heading = 2, addClass = '' }) => {
  if (heading === 4) return <h4 className={`text-left ${addClass}`}>{title}</h4>;
  return <h2 className={`text-left ${addClass}`}>{title}</h2>;
};

export default Title;
