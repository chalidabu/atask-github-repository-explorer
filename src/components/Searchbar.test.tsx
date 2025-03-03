import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from './Searchbar';
import { vi } from 'vitest';

describe('Searchbar Component', () => {
  it('renders input and button', () => {
    render(<Searchbar onSearch={vi.fn()} />);

    expect(screen.getByPlaceholderText(/search github username/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
  });

  it('calls onSearch with the correct query', () => {
    const mockSearch = vi.fn();
    render(<Searchbar onSearch={mockSearch} />);

    const input = screen.getByPlaceholderText(/search github username/i);
    const button = screen.getByText(/search/i);

    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.click(button);

    expect(mockSearch).toHaveBeenCalledWith('octocat');
    expect(mockSearch).toHaveBeenCalledTimes(1);
  });
});
