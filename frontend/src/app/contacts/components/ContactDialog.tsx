import React from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { FaEye } from "react-icons/fa";

const ContactDialog = ({ contact }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="text-green-500 hover:text-green-700 cursor-pointer"
          title="View Details"
        >
          <FaEye />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Details</DialogTitle>
          <DialogDescription>
            {contact ? (
              <div>
                <p>
                  <strong>Name:</strong> {contact.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {contact.email}
                </p>
                <p>
                  <strong>Message:</strong> {contact.message}
                </p>
                <p>
                  <strong>Status:</strong> {contact.status}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {new Date(contact.createdAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
