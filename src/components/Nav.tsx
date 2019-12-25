import React from 'react';
import { NavProps } from '../types';

export const Nav: React.FC<NavProps> = ({ content }) => {
  function render() {
    return <div className="flex justify-center items-center h-full">Home</div>;
  }
  return render();
};
