import { render, screen } from '@testing-library/react';
import ExpandableText from '../../src/components/ExpandableText';
import userEvent from '@testing-library/user-event';

describe('ExpandableText', () => {
  const limit = 255;
  const longText = 'a'.repeat(limit + 1);
  const truncatedText = longText.substring(0, limit) + '...';

  it('should render the full text if less than 255 characters', () => {
    const text = 'Short text';
    render(<ExpandableText text={text} />);

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('should truncate the full text if less than 255 characters', () => {
    render(<ExpandableText text={longText} />);

    expect(screen.getByText(truncatedText)).toBeInTheDocument();

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/more/i);
  });

  it('should expand text when Show More button is clicked', async () => {
    render(<ExpandableText text={longText} />);

    const button = screen.getByRole('button');
    const user = userEvent.setup();
    await user.click(button);

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/less/i);
  });

  it('should collapse text if Show Less button is clicked', async () => {
    // Arrange
    // Expand the text
    render(<ExpandableText text={longText} />);
    const showMoreButton = screen.getByRole('button', { name: /more/i });
    const user = userEvent.setup();
    await user.click(showMoreButton);

    // Arrange
    // Collapse the texts
    const showLessButton = screen.getByRole('button', { name: /less/i });
    await user.click(showLessButton);

    // Assert
    expect(screen.getByText(truncatedText)).toBeInTheDocument();
    expect(showLessButton).toBeInTheDocument();
    expect(showLessButton).toHaveTextContent(/more/i);
  });
});
