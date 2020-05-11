import React from 'react';
import styled from 'styled-components';

const Spin = styled.div`
  
  position: relative;
  margin: 0 auto;
  height: 50px;
  width: 50px;
  transform: rotate(-45deg);
  &:before, &:after {
    content: "";
    display: block;
    position: absolute;
  }
  // spinner
  &:before {
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    width: 50px - (4px * 2);
    height: 50px - (4px * 2);
    border: 4px solid rgba(${(props) => props.color}, .2);
    border-top: 4px solid ${(props) => props.color};
    border-radius: 50%;
    transition: all .2s ease 0s;
    animation: spin .7s cubic-bezier(0.560, 0.110, 0.220, 0.865) 0s infinite;
  }
  // checkmark
  &:after {
    width: 50px - 4px - 10px;
    height: 50px / 2 - 10px;
    top: (50px / 4) - 4px + (10px/ 2);
    left: (10px/ 2) + 4px;
    border-left: 4px solid ${(props) => props.color};
    border-bottom: 4px solid ${(props) => props.color};
    opacity: 0;
    transform: scale(.5);
    transition: all .2s ease 0s;
  }
  &.success {
    &:before {
      height: 50px / 2;
      width: 50px / 2;
      border: 4px solid rgba(${(props) => props.color}, 0);
    }
    &:after {
      opacity: 1;
      transform: scale(1);
      animation: check .4s ease 0s forwards;
    }
  }
  // animation keyframes   
  @keyframes spin {
    from  { transform: rotate(45deg); }
    to    { transform: rotate(405deg); }
  }
  @keyframes check {
    0%    { height: 0px; width: 0px; }
    50%   { height: 50px / 2 - 10px; width: 0px; }
    100%  { width: 50px - 4px - 10px; }
  }
}`;

const Spinner = ({ color }) => <Spin color={color} />;

export default Spinner;
