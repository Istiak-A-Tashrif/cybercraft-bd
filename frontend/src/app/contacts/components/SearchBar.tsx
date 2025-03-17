import { FaSearch, FaSync } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  toggleSelectAll: () => void;
  selectedContacts: string[];
  filteredContacts: any[];
  fetchContacts: () => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  toggleSelectAll,
  selectedContacts,
  filteredContacts,
  fetchContacts,
}: SearchBarProps) {
  return (
    <div className="flex justify-between space-x-4 items-center py-6 px-4 bg-white">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={
            selectedContacts.length === filteredContacts.length &&
            filteredContacts.length > 0
          }
          onChange={toggleSelectAll}
          className="mr-2 h-4 w-4"
        />
        <span className="text-sm text-gray-500">
          {selectedContacts.length > 0
            ? `Selected ${selectedContacts.length} of ${filteredContacts.length}`
            : "Select All"}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute right-3 top-2 text-gray-400" />
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded cursor-pointer"
          onClick={fetchContacts}
        >
          <FaSync />
        </button>
      </div>
    </div>
  );
}