"use client";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState } from "react";
import {
  FaSearch,
  FaDownload,
  FaEye,
  FaTrash,
  FaSync,
  FaFilter,
  FaThLarge,
  FaFileExport,
  FaPlus,
  FaBell,
} from "react-icons/fa";

interface Employee {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  designation: string;
}

const employees: Employee[] = [
  {
    id: 1,
    employeeId: "123456789",
    name: "Md. Shoaib Shifat",
    email: "abdulhadi@gmail.com",
    department: "IT",
    designation: "Developer",
  },
  {
    id: 2,
    employeeId: "987456321",
    name: "MD Masuk Kabir",
    email: "rakibhasan@gmail.com",
    department: "Construction",
    designation: "Site Engineer",
  },
  {
    id: 3,
    employeeId: "987654321",
    name: "Md. Shoaib Shifat",
    email: "abdulhadi@gmail.com",
    department: "Construction",
    designation: "Contractor",
  },
  {
    id: 4,
    employeeId: "123654789",
    name: "MD Masuk Kabir",
    email: "rakibhasan@gmail.com",
    department: "Construction",
    designation: "Site Engineer",
  },
  {
    id: 5,
    employeeId: "147852369",
    name: "Md. Shoaib Shifat",
    email: "abdulhadi@gmail.com",
    department: "Construction",
    designation: "Site Engineer",
  },
  {
    id: 6,
    employeeId: "369852147",
    name: "MD Masuk Kabir",
    email: "rakibhasan@gmail.com",
    department: "IT",
    designation: "SEO",
  },
  {
    id: 7,
    employeeId: "741258963",
    name: "Md. Shoaib Shifat",
    email: "abdulhadi@gmail.com",
    department: "IT",
    designation: "UI/UX Designer",
  },
  {
    id: 8,
    employeeId: "963258741",
    name: "MD Masuk Kabir",
    email: "rakibhasan@gmail.com",
    department: "Tender",
    designation: "Contractor",
  },
  {
    id: 9,
    employeeId: "741258963",
    name: "Md. Shoaib Shifat",
    email: "abdulhadi@gmail.com",
    department: "IT",
    designation: "SEO",
  },
  {
    id: 10,
    employeeId: "741258963",
    name: "MD Masuk Kabir",
    email: "abdulhadi@gmail.com",
    department: "IT",
    designation: "Developer",
  },
];

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNavbarVisibele, setIsNavbarVisible] = useState(false);

  return (
    <>
      <Navbar setIsNavbarVisible={setIsNavbarVisible} />
      <div
        className={`${
          isNavbarVisibele ? "min-h-[calc(100vh-52px)]" : "min-h-screen"
        } transition-all duration-500 flex flex-col bg-gray-100`}
      >
        {/* Navbar */}

        {/* Main Content */}
        <div className="flex-grow flex justify-between ">
          <div className="bg-white flex-1 hidden md:block"></div>
          <div className="max-w-7xl w-full px-4 pr-0 lg:px-32 py-6 bg-gray-100">
            <div className="">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 pr-4 lg:pr-0">
                <h1 className="text-2xl font-medium text-gray-700">
                  Employees
                </h1>
                <div className="flex space-x-2">
                  <button className="p-2 border border-blue-500 text-blue-500 rounded">
                    <FaFilter />
                  </button>
                  <button className="p-2 border border-blue-500 text-blue-500 rounded">
                    <FaThLarge />
                  </button>
                  <button className="p-2 border border-blue-500 text-blue-500 rounded">
                    <FaFileExport />
                  </button>
                  <button className="p-2 bg-blue-500 text-white rounded">
                    <FaPlus />
                  </button>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex justify-end space-x-4 items-center py-6 px-4 bg-white">
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
                <button className="p-2 bg-blue-500 text-white rounded">
                  <FaSync />
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        No.
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Employee ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Designation
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.employeeId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {employee.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.department}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {employee.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            <button className="text-blue-500 hover:text-blue-700">
                              <FaDownload />
                            </button>
                            <button className="text-green-500 hover:text-green-700">
                              <FaEye />
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
