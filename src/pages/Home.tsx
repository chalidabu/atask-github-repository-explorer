import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, fetchRepos } from "../features/githubSlice";
import type { RootState, AppDispatch } from "../app/store";
import Searchbar from "../components/Searchbar";
import UserList from "../components/UserList";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.github
  );

  const handleSearch = (username: string) => {
    dispatch(fetchUsers(username));
  };

  const handleFetchRepos = async (username: string) => {
    const action = await dispatch(fetchRepos(username));
    return action.payload || [];
  };

  return (
    <main>
      <div className="container max-w-lg mx-auto py-4 shadow-lg min-h-screen">
        <h1 className="text-center font-bold text-2xl mb-2 font-heading border-b pb-2">Repositories Explorer</h1>
        <p className="text-center text-md text-gray-500 mb-6 md:mb-4">Find repositories from GitHub users</p>
        <Searchbar onSearch={handleSearch} />
        {loading && <p className="text-md text-center italic">Loading...</p>}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2 flex justify-center items-center space-x-2">
            <ExclamationCircleIcon className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        <UserList users={users} onSelectUser={handleFetchRepos} />
      </div>
    </main>
  );
};

export default Home;
