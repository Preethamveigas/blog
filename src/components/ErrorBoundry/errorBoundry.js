import React, { Component } from "react";
import Card from "../Card/Card";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true
    });
  }

  render() {
    return this.state.hasError ? (
      <Card>Sorry Something went wrong</Card>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundry;
