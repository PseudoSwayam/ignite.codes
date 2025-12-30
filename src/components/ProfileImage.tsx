import React from 'react';

interface ProfileImageProps {
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({ className = '' }) => {
  return (
    <div className={`relative inline-block mx-auto group ${className}`}>
      {/* Base image (default monochrome) */}
      <img
        src="/dp.jpg"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover border-2 border-beige-400/20"
      />
      
      {/* Hover image (full color) - Only visible on hover via opacity transition */}
      <img
        src="/dp_hovered.jpg"
        alt="Profile"
        className="absolute top-0 left-0 w-32 h-32 rounded-full object-cover border-2 border-beige-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
      />
    </div>
  );
};

export default ProfileImage;
