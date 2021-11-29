import React from 'react';

const ButtonBack = ({ onClick }) => {
  return (
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => onClick()}>
      Back
    </button>
  );
}

export default ButtonBack;