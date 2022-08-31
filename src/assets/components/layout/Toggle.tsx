import React from "react";
import styled from "styled-components";

interface IToggleProps {
  checked: boolean;
  onChange(): void;
}

export const Toggle: React.FC<IToggleProps> = ({ checked, onChange }) => (
  <ToggleBtn>
    <input type="checkbox" id="hide-checkbox" checked={!checked} onChange={onChange} />
    <label htmlFor="hide-checkbox" className="toggle">
      <span className="toggle-button">
        <span className="crater crater-1"></span>
        <span className="crater crater-2"></span>
        <span className="crater crater-3"></span>
        <span className="crater crater-4"></span>
      </span>
      <span className="star star-1"></span>
      <span className="star star-2"></span>
      <span className="star star-3"></span>
      <span className="star star-4"></span>
      <span className="star star-5"></span>
      <span className="star star-6"></span>
      <span className="star star-7"></span>
      <span className="star star-8"></span>
    </label>
  </ToggleBtn>
);

const ToggleBtn = styled.div`
  margin-top: 5px;

  #hide-checkbox {
    opacity: 0;
    height: 0;
    width: 0;
  }

  .toggle {
    position: relative;
    cursor: pointer;
    display: inline-block;
    width: 100px;
    height: 34px;
    background: #211042;
    border-radius: 50px;
    transition: 500ms;
    overflow: hidden;
  }

  .toggle-button {
    position: absolute;
    display: inline-block;
    top: 2px;
    left: 4px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #faeaf1;
    overflow: hidden;
    box-shadow: 0 0 35px 4px rgba(255, 255, 255);
    transition: all 500ms ease-out;
  }

  .crater {
    position: absolute;
    display: inline-block;
    background: #faeaf1;
    border-radius: 50%;
    transition: 500ms;
  }

  .crater-1 {
    background: #fffff9;
    width: 25px;
    height: 25px;
    left: 3px;
    bottom: 3px;
  }

  .crater-2 {
    width: 10px;
    height: 10px;
    top: 7px;
    left: 15px;
  }

  .crater-3 {
    width: 16px;
    height: 16px;
    top: 20px;
    right: 1px;
  }

  .crater-4 {
    width: 10px;
    height: 10px;
    top: 14px;
    left: 3px;
  }

  .star {
    position: absolute;
    display: inline-block;
    border-radius: 50%;
    background: #fff;
    box-shadow: 1px 0 2px 2px rgba(255, 255, 255);
  }

  .star-1 {
    width: 6px;
    height: 6px;
    right: 10px;
    bottom: 20px;
  }

  .star-2 {
    width: 8px;
    height: 8px;
    right: 40px;
    top: 10px;
  }

  .star-3 {
    width: 5px;
    height: 5px;
    right: 26px;
    bottom: 15px;
  }

  .star-4 {
    width: 3px;
    height: 3px;
    right: 16px;
    bottom: 5px;
  }

  .star-5 {
    width: 4px;
    height: 4px;
    right: 30px;
    bottom: 5px;
  }

  .star-6,
  .star-7,
  .star-8 {
    width: 10px;
    height: 2px;
    border-radius: 2px;
    transform: rotate(-45deg);
    box-shadow: 5px 0px 4px 1px #fff;
    animation-name: travel;
    animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-iteration-count: infinite;
  }

  .star-6 {
    right: 30px;
    bottom: 30px;
    animation-delay: -2s;
  }

  .star-7 {
    right: 10px;
    bottom: 10px;
  }

  .star-8 {
    right: 20px;
    top: 10px;
    animation-delay: -4s;
  }

  @keyframes travel {
    0% {
      transform: rotate(-45deg) translateX(70px);
    }

    50% {
      transform: rotate(-45deg) translateX(-20px);
      box-shadow: 5px 0px 6px 1px #fff;
    }

    100% {
      transform: rotate(-45deg) translateX(-30px);
      width: 2px;
      height: 2px;
      opacity: 0;
      box-shadow: none;
    }
  }

  #hide-checkbox:checked + .toggle {
    background: #24d7f7;
  }

  #hide-checkbox:checked + .toggle .toggle-button {
    background: #f7ffff;
    transform: translateX(62px);
    box-shadow: 0 0 35px 5px rgba(255, 255, 255);
  }

  #hide-checkbox:checked + .toggle .toggle-button .crater {
    transform: rotate(-45deg) translateX(70px);
  }

  #hide-checkbox:checked + .toggle .star {
    animation: move 2s infinite;
    transform: none;
    box-shadow: none;
  }

  #hide-checkbox:checked + .toggle .star-1 {
    width: 40px;
    height: 10px;
    border-radius: 10px;
    background: #fff;
    left: 15px;
    top: 20px;
    box-shadow: none;
  }

  #hide-checkbox:checked + .toggle .star-2 {
    width: 12px;
    height: 12px;
    background: #fff;
    left: 40px;
    top: 15px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  #hide-checkbox:checked + .toggle .star-3 {
    width: 16px;
    height: 16px;
    background: #fff;
    left: 30px;
    top: 7px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  #hide-checkbox:checked + .toggle .star-4 {
    width: 14px;
    height: 14px;
    background: #fff;
    left: 20px;
    top: 5px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  #hide-checkbox:checked + .toggle .star-5 {
    width: 40px;
    height: 5px;
    border-radius: 15px;
    background: #fff;
    left: 14px;
    bottom: 4px;
    box-shadow: none;
  }

  #hide-checkbox:checked + .toggle .star-6 {
    width: 18px;
    height: 18px;
    background: #fff;
    border-radius: 50%;
    left: 8px;
    bottom: 5px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  #hide-checkbox:checked + .toggle .star-7 {
    width: 14px;
    height: 14px;
    background: #fff;
    border-radius: 50%;
    left: 22px;
    bottom: 5px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  #hide-checkbox:checked + .toggle .star-8 {
    width: 10px;
    height: 10px;
    background: #fff;
    border-radius: 50%;
    left: 42px;
    top: 15px;
    box-shadow: -1px 0 2px 0 rgba(0, 0, 0, 0.1);
  }

  @keyframes move {
    0% {
      transform: none;
    }

    25% {
      transform: translateX(2px);
    }

    100% {
      transform: translateX(-2px);
    }
  }
`;
