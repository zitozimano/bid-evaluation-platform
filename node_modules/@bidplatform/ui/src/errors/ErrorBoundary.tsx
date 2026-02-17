import React from "react";

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<
  { fallback?: React.ReactNode },
  State
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="p-4 bg-red-600 text-surface rounded-md">
            Something went wrong.
          </div>
        )
      );
    }
    return this.props.children;
  }
}
