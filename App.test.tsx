import React from 'react';
import { render, screen } from '@testing-library/react-native';
import App from './App';

describe('App', () => {
  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText('CrudiMobile')).toBeTruthy();
  });

  it('should render the app subtitle', () => {
    render(<App />);
    expect(screen.getByText('Mobile Frontend for Crudibase')).toBeTruthy();
  });

  it('should render the version', () => {
    render(<App />);
    expect(screen.getByText('Version 0.1.0')).toBeTruthy();
  });
});
