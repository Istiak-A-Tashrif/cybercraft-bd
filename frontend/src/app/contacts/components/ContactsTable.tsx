import { FaDownload, FaEye, FaTrash, FaSort } from "react-icons/fa";

interface ContactsTableProps {
  filteredContacts: any[];
  selectedContacts: string[];
  toggleSelection: (id: string) => void;
  handleSort: (field: string) => void;
  handleDownloadPDF: (id: string) => void;
  handleDeleteContact: (id: string) => void;
  handleStatusChange: (id: string, newStatus: string) => void;
  loading: boolean;
}

export default function ContactsTable({
  filteredContacts,
  selectedContacts,
  toggleSelection,
  handleSort,
  handleDownloadPDF,
  handleDeleteContact,
  handleStatusChange,
  loading,
}: ContactsTableProps) {
  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Select
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("fullName")}
              >
                Name
                <FaSort className="ml-1" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email
                <FaSort className="ml-1" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Message
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("status")}
              >
                Status
                <FaSort className="ml-1" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                Date
                <FaSort className="ml-1" />
              </div>
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : filteredContacts.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-6 py-4 text-center">
                No contacts found
              </td>
            </tr>
          ) : (
            filteredContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact._id)}
                    onChange={() => toggleSelection(contact._id)}
                    className="h-4 w-4"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {contact.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {contact.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {contact.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={contact.status}
                    onChange={(e) =>
                      handleStatusChange(contact._id, e.target.value)
                    }
                    className={`border px-2 py-1 rounded text-sm ${
                      contact.status === "new"
                        ? "bg-blue-100 border-blue-300"
                        : contact.status === "read"
                        ? "bg-yellow-100 border-yellow-300"
                        : "bg-green-100 border-green-300"
                    }`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="responded">Responded</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 cursor-pointer"
                      onClick={() => handleDownloadPDF(contact._id)}
                      title="Download PDF"
                    >
                      <FaDownload />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700 cursor-pointer"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700  cursor-pointer"
                      onClick={() => handleDeleteContact(contact._id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}