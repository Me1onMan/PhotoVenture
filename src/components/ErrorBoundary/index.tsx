import { Component, ErrorInfo } from 'react';

import { TProps, TState } from './types';

export default class ErrorBoundary extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      isError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      isError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    const { children } = this.props;
    const { isError, error } = this.state;

    if (isError || error) {
      return (
        <div>
          <h1>Oops! Error occured!</h1>
          <p>{error.message}</p>
        </div>
      );
    }

    return children;
  }
}
