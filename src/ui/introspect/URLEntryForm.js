import React, { Component } from 'react';
import { Button, Spin, message, Alert } from 'antd';
import Helper from 'global/Helper';
import { withRouter } from 'react-router-dom';

class URLEntryForm extends Component {

  constructor() {
    super();
    this.state = {
      url: '',
      loading: false,
      loadingIR: false,
      error: false,
      errMessage: '',
      response: '',
      response_error: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchSchema = this.fetchSchema.bind(this);
    this.handleErrorClose = this.handleErrorClose.bind(this);

    this.handleChangeResponse = this.handleChangeResponse.bind(this);
    this.handleSubmitResponse = this.handleSubmitResponse.bind(this);
    this.handleResponseErrorClose = this.handleResponseErrorClose.bind(this);
  }

  handleSubmit() {
    const url = 'http://83.69.126.22:5820/graphql';

    if ( ! url ) {
      message.info('Please Enter A Valid GraphQL URL Endpoint');
    } else {
      this.setState({ loading: true });
      this.fetchSchema( url );
    }
  }


  fetchSchema(url) {
    const response = Helper.fetch( url );
          response
            .then( res => {
              this.setState({ loading: false });
              this.props.onSubmit({ schema: true });
            })
            .catch( err => {
              this.setState({ loading: false, error: true, errMessage: err })
            });

  }

  handleErrorClose() {
    this.setState({ error: false, errMessage: '', })
  }
  handleResponseErrorClose() {
    this.setState({ response_error: false })
  }

  handleChangeResponse(e) {
    this.setState({ response: e.target.value });
  }

  handleSubmitResponse() {
    this.setState({ loadingIR: true });

    try {
      const response = JSON.parse(this.state.response);
      Helper.fetchFromResponse( response );
      this.setState({ loadingIR: false });
      this.props.onSubmit({ schema: true });
    } catch (e) {
      this.setState({ loadingIR: false, response_error: true });
    }

  }


  render() {

    return (
      <div>
      <Spin spinning={ this.state.loading }>
      <div className="component--dashboard-container">
        <div className="inner">
          <h1>Please сlick to generate documentation</h1>

          { this.state.error &&
            <div style={{ marginTop: 25, marginBottom: 25 }}>
              <Alert
                message="Error Occoured"
                description={ this.state.errMessage.message }
                type="error"
                closable
                onClose={ this.handleErrorClose }
              />
            </div>
          }

          <div style={{ marginTop: 25 }}>
            <div style={{ marginTop: 5 }}>
              <Button type="primary" ghost size="large" icon="check" onClick={ this.handleSubmit }>Generate Documentation</Button>
            </div>
          </div>

        </div>
      </div>
      </Spin>
      </div>
    );
  }


}


export default withRouter(URLEntryForm);
