import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import useNabvar from '../Navbar/use-navbar-context';
import { BoxImage, UploadCloud, Title } from '../index';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const WrapperModal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  z-index: 100000;
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 100px;
`;

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #fff;
  width: calc(100vw - 200px);
  height: calc(100vh - 200px);

  padding: 20px;
  padding-top: 20px;
  .col-3 {
    margin-bottom: 30px;
  }
`;
const Row = styled.div`
  overflow-y: auto;
`;
const BoxTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  h2 {
    color: #ffa59e;
  }
`;
const IconClose = styled.i`
  margin-bottom: 15px;
  height: 44px;
  cursor: pointer;
  &::before {
    font-size: 30px;
    color: #ffa59e;
  }
`;
const vanish = keyframes`
  from {
    opacity: 1
  }

  to {
    opacity:0 
  }
`;

const Copied = styled.span`
  position: fixed;
  top: 20px;
  left: 20px;
  background-color: #ffa59e;
  padding: 10px;
  font-family: Raleway, sans-serif;
  animation: ${vanish} 2s ease-in;
  border-radius: 5px;
`;

const ModalImages = () => {
  const { toggleMenu, isOpen, images } = useNabvar();
  const [copied, setCopied] = useState(false);
  const onCopy = (e) => {
    console.log(e);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  const onClick = ({ target: { innerHTML } }) => {
    console.log(`Clicked on "${innerHTML}"!`); // eslint-disable-line
  };

  const handleImage = (e) => {
    window.location.reload();
    toggleMenu();
  };

  return (
    <WrapperModal isOpen={isOpen}>
      <Container>
        <BoxTitle>
          <Title title={'IMAGES'}></Title>
          <UploadCloud name_folder={'advices'} checkUploadResult={(event) => handleImage(event)} />
          <IconClose onClick={toggleMenu} className="nc-icon nc-simple-remove"></IconClose>
        </BoxTitle>
        {copied && <Copied>URl has been copied!</Copied>}
        <Row>
          <div className="row">
            {images &&
              images.map((image) => (
                <div key={image.public_id} className="col-3">
                  <BoxImage
                    img={`https://res.cloudinary.com/nitroclik/image/upload/${image.public_id}.${image.format}`}
                    height={200}
                  />
                  <CopyToClipboard
                    onCopy={(e) => onCopy(e)}
                    options={{ message: 'Whoa!' }}
                    text={`https://res.cloudinary.com/nitroclik/image/upload/${image.public_id}.${image.format}`}
                  >
                    <button className="btn btn-success" onClick={(e) => onClick(e)}>
                      Copy URL
                    </button>
                  </CopyToClipboard>
                </div>
              ))}
          </div>
        </Row>
      </Container>
    </WrapperModal>
  );
};
export default ModalImages;
