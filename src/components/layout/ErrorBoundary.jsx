import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          backgroundColor: '#FAF8F5',
          color: '#121212',
          padding: '40px 24px',
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            border: '1px solid #121212',
            padding: '32px',
            background: '#FFFFFF',
            boxShadow: '4px 4px 0px #121212'
          }}>
            <h1 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px', textTransform: 'uppercase' }}>
              ⚠️ GAJENDRA.NETWORK // RECOVERY MODE
            </h1>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '24px', lineHeight: '1.6' }}>
              The application encountered a client runtime exception during rendering.
            </p>
            <pre style={{
              background: '#F4F1EA',
              padding: '12px',
              fontSize: '11px',
              textAlign: 'left',
              overflowX: 'auto',
              marginBottom: '20px',
              border: '1px solid #ddd'
            }}>
              {this.state.error?.message || 'Unknown Error'}
            </pre>
            <button
              type="button"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              style={{
                backgroundColor: '#0052FF',
                color: '#FFFFFF',
                border: 'none',
                padding: '10px 20px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '12px',
                textTransform: 'uppercase'
              }}
            >
              Reset Cache & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
