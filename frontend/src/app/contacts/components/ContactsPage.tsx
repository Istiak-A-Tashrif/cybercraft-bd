"use client";
import Navbar from "@/components/Navbar";
import { contactService } from "@/services/api";
import { useEffect, useState } from "react";
import ContactsTable from "./ContactsTable";
import FilterMenu from "./FilterMenu";
import Header from "./Header";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Contact {
  _id: string;
  fullName: string;
  email: string;
  message: string;
  status: "new" | "read" | "responded";
  createdAt: string;
  updatedAt: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("-createdAt");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<() => void>(() => () => {});
  const [modalMessage, setModalMessage] = useState("");

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, [page, limit, sortBy, statusFilter]);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const result = await contactService.getAllContacts(
        page,
        limit,
        sortBy,
        statusFilter
      );
      setContacts(result.data);
      setTotalPages(Math.ceil(result.pagination.total / limit));
    } catch (error) {
      console.error("Failed to fetch contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle selection
  const toggleSelection = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(filteredContacts.map((contact) => contact._id));
    }
  };

  const openModal = (message: string, action: () => void) => {
    setModalMessage(message);
    setModalAction(() => action);
    setIsModalOpen(true);
  };


  // Handle deletion
  const handleDeleteContact = async (id: string) => {
    openModal("Are you sure you want to delete this contact?", async () => {
      try {
        await contactService.deleteContact(id);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
      } catch (error) {
        console.error("Failed to delete contact:", error);
      }
    });
  };

  const handleDeleteMultiple = async () => {
    if (selectedContacts.length > 0) {
      openModal(
        `Are you sure you want to delete ${selectedContacts.length} contacts?`,
        async () => {
          try {
            await contactService.deleteMultipleContacts(selectedContacts);
            setContacts((prev) =>
              prev.filter((contact) => !selectedContacts.includes(contact._id))
            );
            setSelectedContacts([]);
          } catch (error) {
            console.error("Failed to delete multiple contacts:", error);
          }
        }
      );
    }
  };

  // Handle downloads
  const handleDownloadPDF = async (id: string) => {
    try {
      const blob = await contactService.downloadPDF(id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `contact_${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download PDF:", error);
    }
  };

  const handleDownloadMultiplePDF = async () => {
    if (selectedContacts.length === 0) return;
    try {
      const blob = await contactService.downloadMultiplePDF(selectedContacts);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contacts.pdf";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download multiple PDFs:", error);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      // Replace the two separate method calls with a single one
      const blob = await contactService.downloadExcel(
        selectedContacts.length > 0 ? selectedContacts : null
      );
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contacts.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download Excel:", error);
    }
  };

  const handleSort = (field: string) => {
    setSortBy(sortBy === field ? `-${field}` : field);
  };

  const handleStatusChange = async (
    id: string,
    newStatus: "new" | "read" | "responded"
  ) => {
    try {
      await contactService.updateContact(id, { status: newStatus });
      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (error) {
      console.error("Failed to update contact status:", error);
    }
  };

  const statusOptions = [
    { value: null, label: "All" },
    { value: "new", label: "New" },
    { value: "read", label: "Read" },
    { value: "responded", label: "Responded" },
  ];

  return (
    <>
      <Navbar setIsNavbarVisible={setIsNavbarVisible} />
      <div
        className={`${
          isNavbarVisible ? "min-h-[calc(100vh-52px)]" : "min-h-screen"
        } transition-all duration-500 flex flex-col bg-gray-100`}
      >
        <div className="flex-grow flex justify-between">
          <div className="bg-white flex-1 hidden md:block"></div>
          <div className="max-w-min w-full px-4 pr-0 lg:px-32 py-6 bg-gray-100">
            <Header
              setShowFilterMenu={setShowFilterMenu}
              showFilterMenu={showFilterMenu}
              handleDownloadExcel={handleDownloadExcel}
              handleDeleteMultiple={handleDeleteMultiple}
              handleDownloadMultiplePDF={handleDownloadMultiplePDF}
              selectedContacts={selectedContacts}
            />
            {showFilterMenu && (
              <FilterMenu
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortBy={sortBy}
                setSortBy={setSortBy}
                limit={limit}
                setLimit={setLimit}
                statusOptions={statusOptions}
              />
            )}
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              toggleSelectAll={toggleSelectAll}
              selectedContacts={selectedContacts}
              filteredContacts={filteredContacts}
              fetchContacts={fetchContacts}
            />
            <ContactsTable
              filteredContacts={filteredContacts}
              selectedContacts={selectedContacts}
              toggleSelection={toggleSelection}
              handleSort={handleSort}
              handleDownloadPDF={handleDownloadPDF}
              handleDeleteContact={handleDeleteContact}
              handleStatusChange={handleStatusChange}
              loading={loading}
            />
            {totalPages > 1 && (
              <Pagination page={page} totalPages={totalPages} setPage={setPage} />
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Action"
        message={modalMessage}
        onConfirm={() => {
          modalAction();
          setIsModalOpen(false);
        }}
        onCancel={() => setIsModalOpen(false)}
      />
    </>
  );
}
