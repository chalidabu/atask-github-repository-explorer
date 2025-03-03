# GitHub User Repositories Explorer

A web application to search GitHub users and view their public repositories.
This project was built using React, TypeScript, Vite, and Tailwind CSS. It integrates with GitHub API v3.

## Features
- Search GitHub users by username.
- Display up to 5 matching users.
- Expand user accordion to view their repositories.
- Show repository name, description, and star count.
- Handle loading states, errors, and user interactions.
- Smooth accordion animations and user-friendly design.

## Tech Stack
### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- Heroicons (for icons)

### API
- GitHub REST API v3 (https://developer.github.com/v3/)

## Installation & Usage
```bash
# Clone repository
git clone https://github.com/username/repository-name.git

# Enter project directory
cd repository-name

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:5173
```

## Folder Structure
```
project-root/
│── public                    # Static assets that will be served directly (favicon, images, etc.)
│── src/                      # Main source folder containing all application code
│   ├── app                   # Application-level configuration and setup
│   │   ├── store.ts          # Centralized Redux store configuration, combines reducers and middleware
│   ├── components            # Reusable presentational components used across pages
│   │   ├── Searchbar.tsx     # Search input component to search for GitHub users
│   │   ├── UserList.tsx      # Component to display the list of users and their repositories in accordions
│   ├── features              # Contains Redux slice and API logic related to GitHub users and repositories
│   │   ├── githubSlice.ts    # Redux slice responsible for managing user search results, repositories, loading, and error states
│   ├── pages                 # Page components for different routes (in this case, only Home page)
│   │   ├── Home.tsx          # Main page containing the search bar and user list, acts as the entry point for the app UI
│   ├── App.tsx                # Root application component, defines overall layout and routing (if needed)
│   ├── index.css              # Global stylesheet for the application
│   ├── main.tsx               # Application entry point, renders App component into the DOM
│── index.html                 # Main HTML file, acts as the template for the app
│── README.md                  # Project documentation (installation, usage, etc.)

```
