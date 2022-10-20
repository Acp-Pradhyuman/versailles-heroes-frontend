import React from "react";
import Styled from "styled-components";

function Loader() {
  return (
    <Wrapper>
      <div className="container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </Wrapper>
  );
}

export default Loader;

const Wrapper = Styled.div`
    


  max-width: 100%;
  height: 100vh;
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  /* width:500px; */
  z-index:1123;
  display:flex;
  justify-content:center;
  align-items:center;




.container {
  position:relative;
  height: 100%;
  width: 100%;

  .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
   
    height: 20px;
    width: 20px;
    background-color: var(--primary);
    border-radius: 5rem;
    transition: all 0.15s ease-in-out;

    &:nth-child(1) {
      left: 80px;
      animation: waveUp 2s, smallExtend 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
    }

    &:nth-child(2) {
      left: 115px;
      animation: waveUp 2s, largeExtend 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-delay: 0.15s;
    }

    &:nth-child(3) {
      animation: waveUp 2s, smallExtend 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-delay: 0.3s;
    }

    &:nth-child(4) {
      left: 185px;
      animation: waveUp 2s, largeExtend 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-delay: 0.45s;
    }

    &:nth-child(5) {
      left: 220px;
      animation: waveUp 2s, smallExtend 2s;
      animation-timing-function: ease-in-out;
      animation-iteration-count: infinite;
      animation-delay: 0.6s;
    }

    @keyframes waveUp {
      0%,
      15% {
        top: 50%;
      }
      45%,
      65% {
        top: 42.5%;
      }
      85%,
      100% {
        top: 50%;
      }
    }

    @keyframes smallExtend {
      0%,
      8% {
        
        height: 20px;
      }
      14%,
      34% {
        height: 47.5px;
      }
      46%,
      100% {
        height: 20px;
      }
    }

    @keyframes largeExtend {
      0%,
      8% {
        height: 20px;
      }
      14%,
      34% {
        height: 82.5px;
      }
      46%,
      100% {
        height: 20px;
      }
    }
  }
}


`;
