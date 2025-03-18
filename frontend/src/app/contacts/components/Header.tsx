import { FaFilter, FaFileExport, FaTrash, FaDownload } from "react-icons/fa";
import SocialShareButtons from "./SocialShareButtons";

interface HeaderProps {
  setShowFilterMenu: (value: boolean) => void;
  showFilterMenu: boolean;
  handleDownloadExcel: () => void;
  handleDeleteMultiple: () => void;
  handleDownloadMultiplePDF: () => void;
  selectedContacts: string[];
}

export default function Header({
  setShowFilterMenu,
  showFilterMenu,
  handleDownloadExcel,
  handleDeleteMultiple,
  handleDownloadMultiplePDF,
  selectedContacts,
}: HeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6 pr-4 lg:pr-0">
      <h1 className="text-2xl font-medium text-gray-700">Contacts</h1>
      <div className="flex space-x-2">
        <SocialShareButtons  />
        <button
          className="p-2 border border-blue-500 text-blue-500 rounded cursor-pointer"
          onClick={() => setShowFilterMenu(!showFilterMenu)}
        >
          <FaFilter />
        </button>
        <button
          className="p-2 border border-blue-500 text-blue-500 rounded cursor-pointer"
          onClick={handleDownloadExcel}
        >
          <FaFileExport />
        </button>
        {selectedContacts.length > 0 && (
          <>
            <button
              className="p-2 bg-red-500 text-white rounded cursor-pointer"
              onClick={handleDeleteMultiple}
            >
              <FaTrash />
            </button>
            <button
              className="p-2 bg-green-500 text-white rounded cursor-pointer"
              onClick={handleDownloadMultiplePDF}
            >
              <FaDownload />
            </button>
          </>
        )}
      </div>
    </div>
  );
}