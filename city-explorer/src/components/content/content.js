import React from 'react';
// import '../../../src/styles.css'; // TODO switch to SCSS

class Content extends React.Component {
  render() {   
    return  (
      <>
        <button onClick={this.props.fetch}>Get!</button>
        <hr />
        <ul>
          {this.props.items.map( (item, idx) => (<li key={idx}>{item}</li>))}
        </ul>
      </>
    );
  }
}

export default Content;