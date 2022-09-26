// __tests__/index.test.jsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /The 70's Cars/i,
    })

    expect(heading).toBeInTheDocument()
  })
})

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: /The 70's Cars/i,
    })

    expect(heading).toBeInTheDocument()
  })
})