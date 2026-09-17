import React from "react";
export default class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() {
    if (this.state.hasError) return <main className="shell section"><h1 style={{fontSize: 48}}>Something went wrong.</h1><p style={{marginBlock: 24}}>Please reload the page or contact me at gajendrarjpt@gmail.com.</p><button className="button" onClick={() => window.location.reload()}>Reload page</button></main>;
    return this.props.children;
  }
}
