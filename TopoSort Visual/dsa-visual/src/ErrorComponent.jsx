import React from 'react';

function ErrorComponent({ message }) {
  return (
    <div style={{ color: 'red', marginLeft: '30px' }}>
      {message}
    </div>
  );
}

export default ErrorComponent;
