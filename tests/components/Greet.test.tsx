import { render, screen } from '@testing-library/react';
import Greet from '../../src/components/Greet';

describe('Greet', () => {
  it('should render Hello with the name when name is provided', () => {
    // render() function is provided by react-testing-library
    // It renders this component inside virtual DOM provided by JSDOM
    render(<Greet name="Jim" />);

    // screen object is provided by react-testing-library
    // It allows to get HTML element and view its state including DOM state
    // In this case, get the HTML heading element
    const heading = screen.getByRole('heading');

    // Assertions and matchers are provided by jest-dom library
    // Check if the HTML element is in the DOM
    // Check if the HTML element has the specified text content
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
