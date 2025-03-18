import React, { useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from "react-share";
import { FaLink, FaShareAlt } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const SocialShareButtons = ({
  url,
  title,
}: {
  url?: string;
  title?: string;
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareTitle = title || "Cyber Craft Bangladesh";

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Reset success message after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button className="p-2 border border-blue-500 text-blue-500 rounded cursor-pointer">
            <FaShareAlt />
          </button>
        </DialogTrigger>
        
        <DialogContent className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-medium text-gray-800 mb-4">
              Share This Page
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col space-y-4">
            <FacebookShareButton url={shareUrl} hashtag={`#${shareTitle}`}>
              <div className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                <FacebookIcon size={32} round />
                <span>Share on Facebook</span>
              </div>
            </FacebookShareButton>
            
            <TwitterShareButton url={shareUrl} title={shareTitle}>
              <div className="flex items-center space-x-2 text-blue-400 hover:text-blue-600 transition-colors">
                <TwitterIcon size={32} round />
                <span>Share on Twitter</span>
              </div>
            </TwitterShareButton>
            
            <EmailShareButton
              url={shareUrl}
              subject={shareTitle}
              body={shareUrl}
            >
              <div className="flex items-center space-x-2 text-red-500 hover:text-red-700 transition-colors">
                <EmailIcon size={32} round />
                <span>Share via Email</span>
              </div>
            </EmailShareButton>
            
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <FaLink size={20} />
              <span>Copy Link</span>
            </button>
            {copySuccess && (
              <p className="text-green-600 text-sm">
                Link copied to clipboard!
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SocialShareButtons;
