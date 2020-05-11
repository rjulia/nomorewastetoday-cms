import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Content = styled.div`
  background-image: url(${(props) => props.img});
  width: 100%;
  height: ${(props) => props.height}px;
  background-repeat: no-repeat;
  background-clip: border-box;
  background-position: center;
  background-size: cover;
  background-color: white;
`;

const WrapperImage = styled.div`
  border: 2px solid #e2e2e2;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
  margin-bottom: 10px;
`;

const BoxImage = ({ img, height, classN }) => {
  return (
    <WrapperImage className={classN}>
      <Content img={img} height={height} />
    </WrapperImage>
  );
};

BoxImage.propTypes = {
  img: PropTypes.string,
};

export default BoxImage;
