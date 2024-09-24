import React from 'react';

function ErrorComponent({ message }) {
  return (
    <div style={{ color: 'red' }}>
      {message}
    </div>
  );
}

export default ErrorComponent;
