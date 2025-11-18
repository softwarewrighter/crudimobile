// Test utilities for React Native Testing Library
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react-native';

// Add custom render method with providers if needed
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react-native';
export { customRender as render };
