import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon, ArrowPathIcon, StarIcon } from '@heroicons/react/24/solid';

type User = {
  login: string;
};

type Repo = {
  name: string;
  description: string;
  stargazers_count: number;
};

type Props = {
  users: User[];
  onSelectUser: (username: string) => Promise<Repo[]>;
};

const UserList = ({ users, onSelectUser }: Props) => {
  const [openUser, setOpenUser] = useState<string | null>(null);
  const [repos, setRepos] = useState<Record<string, Repo[]>>({});
  const [loading, setLoading] = useState<Record<string, boolean>>({});
  const [showRepos, setShowRepos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if(openUser) {
      const timer = setTimeout(() => {
        setShowRepos((prev) => ({ ...prev, [openUser]: true }));
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }), [openUser];

  const handleUserClick = async (username: string) => {
    if (openUser === username) {
      setOpenUser(null);
      setShowRepos((prev) => ({ ...prev, [username]: false }));
    } else {
      setOpenUser(username);
      setShowRepos((prev) => ({ ...prev, [username]: false }));

      if (!repos[username]) {
        setLoading((prev) => ({ ...prev, [username]: true }));
        try {
          const userRepos = await onSelectUser(username);
          setRepos((prev) => ({ ...prev, [username]: userRepos }));
        } catch (error) {
          setRepos((prev) => ({ ...prev, [username]: [] }));
        }
        setLoading((prev) => ({ ...prev, [username]: false }));
      }
    }
  };

  return (
    <div className="p-4">
      {users.map((user) => {
        const isOpen = openUser === user.login;
        const shouldShowRepos = showRepos[user.login];

        return (
          <div key={user.login} className="border-rounded-lg">
          <div
            className={`cursor-pointer p-4 border-b hover:bg-gray-100 flex justify-between items-center ${isOpen ? 'bg-blue-50' : ''} transition-all duration-300`}
            onClick={() => handleUserClick(user.login)}
          >
            <h2>{user.login}</h2>

            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            </motion.div>
          </div>

          <motion.div
            initial= {false}
            animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
            className="overflow-hidden"
          >
            {isOpen && (
              <div className="p-4 bg-white border-t">
                {loading[user.login] ? (
                  <div className="flex items-center justify-center space-x-2">
                    <ArrowPathIcon className="w-6 h-6 text-blue-500 animate-spin" />
                    <span className="text-gray-500">Loading repositories...</span>
                  </div>
                ) : shouldShowRepos ? (
                  <ul className="space-y-1 list-none">
                    {repos[user.login]?.length ? (
                      repos[user.login].map((repo) => (
                        <li key={repo.name} className="p-4 bg-gray-100 rounded mb-4 md:mb-3 shadow">
                          <h3 className="font-bold text-lg flex justify-between items-center">
                            {repo.name}
                            <span className="flex items-start space-x-1">
                              <span>{repo.stargazers_count}</span>
                              <StarIcon className="w-5 h-5 text-yellow-400" />
                            </span>
                          </h3>
                          <p className="text-sm text-gray-600">{repo.description || 'No description provided.'}</p>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No repositories found.</p>
                    )}
                  </ul>
                ) : null}
              </div>
            )}
          </motion.div>
        </div>
        )
      })}
    </div>
  );
};

export default UserList;
