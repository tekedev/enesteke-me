import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            backgroundColor: '#000000',
            color: '#f5f5f2',
            padding: '40px',
            fontFamily: "'IBM Plex Mono', monospace",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1 style={{ color: '#d7ff00', fontSize: '24px', marginBottom: '16px' }}>
            SYSTEM RECOVERY / ERROR BOUNDARY CATCH
          </h1>
          <p style={{ color: '#b3b3ad', maxWidth: '600px', lineHeight: 1.6, marginBottom: '24px' }}>
            An unhandled UI component exception occurred. The system isolated the error to protect application stability.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#d7ff00',
              color: '#000',
              border: 'none',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            RELOAD SYSTEM →
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
