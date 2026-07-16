// src/components/profile/HeaderSection.tsx
import React from "react";
import { Camera } from "lucide-react";
import { Card } from "../ui/Card";

interface HeaderSectionProps {
  profilePic: string;
  name: string;
  email: string;
  memberSince: string;
  status: string;
  accountType: string;
  editMode: boolean;
  onAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEditToggle: () => void;
}

export const HeaderSection: React.FC<HeaderSectionProps> = ({
  profilePic,
  name,
  email,
  memberSince,
  status,
  accountType,
  editMode,
  onAvatarChange,
  onEditToggle,
}) => {
  return (
    <Card variant="glass" className="w-full p-6 flex items-center space-x-6">
      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary">
        {profilePic ? (
          <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">
            No Image
          </div>
        )}
        {editMode && (
          <label className="absolute inset-0 bg-black/30 flex items-center justify-center text-white text-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
            <Camera className="w-5 h-5 mr-1" /> Change Photo
            <input type="file" accept="image/*" className="hidden" onChange={onAvatarChange} />
          </label>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white">{name || "Profile"}</h2>
        <p className="text-gray-400">{email}</p>
        <p className="text-gray-400">Member since {memberSince}</p>
        <p className="text-gray-400">Status: {status}</p>
        <p className="text-gray-400">Account: {accountType}</p>
        {!editMode && (
          <button
            type="button"
            onClick={onEditToggle}
            className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </Card>
  );
};
