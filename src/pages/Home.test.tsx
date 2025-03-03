import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../app/store';
import Home from './Home';
import { vi } from 'vitest';
import axios from 'axios';

const store = setupStore();

// Mock axios biar kita bisa kontrol respons dari API
vi.mock('axios');

describe('Home Page Integration Test', () => {
  it('should render search bar and initial state correctly', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/search github username/i)).toBeInTheDocument();
    expect(screen.getByText(/find repositories from github users/i)).toBeInTheDocument();
  });

  it('should fetch and display users after search', async () => {
    const mockUsers = [
      { login: 'octocat', id: 1 },
      { login: 'github', id: 2 },
    ];

    (axios.get as any).mockResolvedValueOnce({ data: { items: mockUsers } });

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const searchInput = screen.getByPlaceholderText(/search github username/i);
    const searchButton = screen.getByText(/search/i);

    fireEvent.change(searchInput, { target: { value: 'octo' } });
    fireEvent.click(searchButton);

    // Pastikan loading muncul saat pencarian
    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();

    // Tunggu sampai users muncul di UserList
    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
      expect(screen.getByText('github')).toBeInTheDocument();
    });
  });

  it('should fetch and display repositories after selecting a user', async () => {
    const mockUsers = [{ login: 'octocat', id: 1 }];
    const mockRepos = [
      { name: 'repo1', description: 'Repo 1 Description', stargazers_count: 10 },
      { name: 'repo2', description: 'Repo 2 Description', stargazers_count: 20 },
    ];

    // Mock API responses
    (axios.get as any)
      .mockResolvedValueOnce({ data: { items: mockUsers } }) // fetchUsers
      .mockResolvedValueOnce({ data: mockRepos }); // fetchRepos

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    // Search user
    fireEvent.change(screen.getByPlaceholderText(/search github username/i), { target: { value: 'octocat' } });
    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() => {
      expect(screen.getByText('octocat')).toBeInTheDocument();
    });

    // Click user to fetch repos
    fireEvent.click(screen.getByText('octocat'));

    // Pastikan repos muncul
    await waitFor(() => {
      expect(screen.getByText('repo1')).toBeInTheDocument();
      expect(screen.getByText('Repo 1 Description')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();

      expect(screen.getByText('repo2')).toBeInTheDocument();
      expect(screen.getByText('Repo 2 Description')).toBeInTheDocument();
      expect(screen.getByText('20')).toBeInTheDocument();
    });
  });

  it('should show error message if fetch fails', async () => {
    (axios.get as any).mockRejectedValueOnce(new Error('Failed to fetch users'));

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/search github username/i), { target: { value: 'errorcase' } });
    fireEvent.click(screen.getByText(/search/i));

    // Tunggu sampai error message muncul
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });
});
