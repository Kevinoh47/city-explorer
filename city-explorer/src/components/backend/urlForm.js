import React from 'react';

class UrlForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: 'https://city-explorer-backend.herokuapp.com'};

    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({value: event.target.value});

  }

//   let __API_URL__;

// $('#url-form').on('submit', function(event) {
//   event.preventDefault();
//   __API_URL__ = $('#back-end-url').val();
//   $('#url-form').addClass('hide');
//   $('#search-form').removeClass('hide');
// });

render() {
  return (
    <form id="url-form" className="hide" onSubmit={this.handleSubmit}>
      <label>
        Enter the URL to your deployed back end, making sure to remove the trailing forward slash
        <input id="back-end-url" type="text" value={this.state.value}  />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
  // render() {
  //   return (
  //     <form id="url-form" className="hide" onSubmit={this.handleSubmit}>
  //       <label>
  //         Enter the URL to your deployed back end, making sure to remove the trailing forward slash
  //         <input id="back-end-url" type="text" value={this.state.value} onChange={this.handleChange} />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //   );
  // }
}

export default UrlForm;