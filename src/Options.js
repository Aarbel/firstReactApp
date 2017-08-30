import React, {Component} from 'react';

class Options extends Component {
  render () {
    return (
      <div className='fields animated zoomIn' onClick={() => this.props.checkResult(this.props.number)}>
        <div className='field-block'>
          {this.props.number}
        </div>
      </div>
    );
  }
}

export default Options;
