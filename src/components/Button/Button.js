import React from 'react';

class Button extends React.Component {
  render() {
    const { text, onClick } = this.props;
    return <button onClick={onClick}>{text}</button>;
  }
}

export default Button;
