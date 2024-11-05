import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet';
import '@testing-library/jest-dom/vitest';

describe('Greet', () => {
  it('should render Hello with the name when name is provided', () => {
    // The render function render this component inside the Virtual DOM implemented by JSDom
    render(<Greet name="Jim" />);

    // screen object enables to view DOM state
    //screen.debug();

    // https://testing-library.com/docs/queries/about/
    const heading = screen.getByRole('heading');

    // Asserctions come from jest-dom library
    // https://github.com/testing-library/jest-dom
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent(/Jim/i);
  });

  it('should render login button when name is not provided', () => {
    render(<Greet />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/login/i);
  });
});
