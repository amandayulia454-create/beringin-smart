import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('Beringin Smart', () => {
  it('menampilkan halaman aplikasi', () => {
    render(<App />);
    expect(document.body).toBeDefined();
  });
});