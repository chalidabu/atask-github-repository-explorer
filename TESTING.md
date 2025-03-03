# TESTING.md

## Testing Report - GitHub Repository Explorer

### Overview

This document contains the testing report for the **Searchbar component** and **Home page integration tests** in the GitHub Repository Explorer project. The purpose of these tests is to ensure that individual components and page-level interactions work correctly.

---

## Tools & Dependencies

The following tools and libraries were used to perform the tests:

| Tool                      | Version        | Purpose                                           |
| ------------------------- | -------------- | ------------------------------------------------- |
| **Vitest**                | Latest (v1.x)  | Test runner                                       |
| **React Testing Library** | Latest (v14.x) | Component rendering & user interaction simulation |
| **Jest DOM**              | Latest (v6.x)  | Enhanced assertions (like `toBeInTheDocument()`)  |

---

## Test Scope

The tests cover:

| Scope                     | Description                                                                                     |
| ------------------------- | ----------------------------------------------------------------------------------------------- |
| **Searchbar Component**   | Unit tests for rendering and user interactions.                                                 |
| **Home Page Integration** | Full integration test simulating user flow from searching a user to viewing repository details. |

---

## Test Cases

### Searchbar Component Tests

#### 1. Renders Input and Button

**Description:**\
This test ensures that the **Searchbar component** renders the input field and the search button correctly when it is mounted.

```typescript
it('renders input and button', () => {
    render(<Searchbar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText(/search github username/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
});
```

#### 2. Calls onSearch with the Correct Query

**Description:**\
This test simulates a user typing a username ("octocat") into the input field and clicking the search button. It verifies that the `onSearch` callback function is called **once** with the correct value.

```typescript
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
```

---

### Home Page Integration Tests

#### 1. Displays Initial UI

**Description:**\
Verifies that the page renders initial UI elements, including the search bar and an empty user list.

```typescript
it('renders initial UI correctly', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText(/search github username/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
});
```

#### 2. Fetches and Displays Users After Search

**Description:**\
Simulates entering a username in the search bar and confirms the user list is displayed correctly after fetching users.

```typescript
it('fetches and displays users after search', async () => {
    // Simulate user search
    fireEvent.change(screen.getByPlaceholderText(/search github username/i), { target: { value: 'octocat' } });
    fireEvent.click(screen.getByText(/search/i));

    // Wait for and verify users are shown
    await waitFor(() => {
        expect(screen.getByText('User 1')).toBeInTheDocument();
        expect(screen.getByText('User 2')).toBeInTheDocument();
    });
});
```

#### 3. Fetches and Displays Repositories After Selecting a User

**Description:**\
Simulates selecting a user from the list and verifies that repositories are correctly fetched and displayed.

```typescript
it('fetches and displays repositories after selecting a user', async () => {
    // Trigger user search and select User 1
    fireEvent.change(screen.getByPlaceholderText(/search github username/i), { target: { value: 'octocat' } });
    fireEvent.click(screen.getByText(/search/i));
    await waitFor(() => screen.getByText('User 1'));
    fireEvent.click(screen.getByText('User 1'));

    // Verify repositories are fetched and displayed
    await waitFor(() => {
        expect(screen.getByText('Repo 1')).toBeInTheDocument();
        expect(screen.getByText('Repo 1 Description')).toBeInTheDocument();
        expect(screen.getByText('Repo 2')).toBeInTheDocument();
        expect(screen.getByText('Repo 2 Description')).toBeInTheDocument();
    });
});
```

---

## Test Execution Result

The following is the actual result from running `npx vitest`:

```
✓ src/components/Searchbar.test.tsx (2 tests) 86ms
   ✓ Searchbar Component > renders input and button
   ✓ Searchbar Component > calls onSearch with the correct query

✓ src/pages/Home.test.tsx (4 tests) 634ms
   ✓ Home Page Integration Test > renders initial UI correctly
   ✓ Home Page Integration Test > fetches and displays users after search
   ✓ Home Page Integration Test > fetches and displays repositories after selecting a user

Test Files  2 passed (2)
     Tests  6 passed (6)
  Start at  21:09:19
  Duration  3.88s (transform 277ms, setup 480ms, collect 1.53s, tests 715ms, environment 2.41s, prepare 344ms)
```

### Summary

| Test File            | Tests Passed | Tests Failed | Duration |
| -------------------- | ------------ | ------------ | -------- |
| `Searchbar.test.tsx` | 2            | 0            | 86ms     |
| `Home.test.tsx`      | 4            | 0            | 634ms    |

---

## Conclusion

All tests for both the **Searchbar component** and the **Home page integration flow** passed successfully. This ensures:

- The **Searchbar component** renders properly and handles user input correctly.
- The **Home page** correctly handles user searches, fetches user lists, allows user selection, and displays repository data as expected.
- The combination of **unit and integration tests** provides confidence in both component-level and page-level behavior, ensuring robustness and reliability.

---

## Notes for Reviewers

- All tests were executed using the latest versions of Vitest and Testing Library.
- Test files are located at:
  - 📂 `src/components/Searchbar.test.tsx`
  - 📂 `src/pages/Home.test.tsx`
- Total test duration was \~3.88s.

