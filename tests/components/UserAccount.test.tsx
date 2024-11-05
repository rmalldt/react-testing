import { render, screen } from '@testing-library/react';
import UserAccount from '../../src/components/UserAccount';
import { User } from '../../src/entities';

describe('UserAccount', () => {
  it('should render User name', () => {
    // Arrange
    const user: User = {
      id: 10,
      name: 'Jim',
    };

    render(<UserAccount user={user} />);

    // Act and Assert
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });

  it('should render Edit button if user is admin', () => {
    // Arrange
    const user: User = {
      id: 10,
      name: 'Jim',
      isAdmin: true,
    };

    render(<UserAccount user={user} />);

    // Act
    const button = screen.getByRole('button');

    // Assert
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });

  it('should not render Edit button if user not admin', () => {
    // Arrange
    const user: User = {
      id: 10,
      name: 'Jim',
      isAdmin: false,
    };

    render(<UserAccount user={user} />);

    // Act
    const button = screen.queryByRole('button');

    // Assert
    expect(button).not.toBeInTheDocument();
  });
});
