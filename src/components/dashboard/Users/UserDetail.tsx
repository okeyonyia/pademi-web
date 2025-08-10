"use client";

import { useState } from 'react';
import SafeImage from "@/components/common/SafeImage";
import ProfilePictureModal from './ProfilePictureModal';
import { User, ApprovedByAdminStatus } from "./index";

interface UserDetailProps {
  user: User;
  onStatusChange: (email: string, dateOfBirth: string, status: ApprovedByAdminStatus) => void;
  onEventAccessChange: (userId: string, newStatus: ApprovedByAdminStatus) => void;
}

const UserDetail: React.FC<UserDetailProps> = ({
  user,
  onStatusChange,
  onEventAccessChange,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleProfilePictureClick = (index: number = 0) => {
    setSelectedImageIndex(index);
    setShowProfileModal(true);
  };
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          bgGradient: 'from-emerald-500 to-teal-600',
          bgLight: 'from-emerald-50 to-teal-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          icon: '✅',
          badge: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200'
        };
      case 'pending':
        return {
          bgGradient: 'from-amber-500 to-orange-600',
          bgLight: 'from-amber-50 to-orange-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: '⏳',
          badge: 'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200'
        };
      case 'rejected':
        return {
          bgGradient: 'from-red-500 to-pink-600',
          bgLight: 'from-red-50 to-pink-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: '❌',
          badge: 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200'
        };
      default:
        return {
          bgGradient: 'from-gray-500 to-slate-600',
          bgLight: 'from-gray-50 to-slate-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: '👤',
          badge: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200'
        };
    }
  };

  const profileStatus = user.profile?.is_approved || 'pending';
  const config = getStatusConfig(profileStatus);
  const eventConfig = getStatusConfig(user.profile?.event_creation_approval || 'pending');

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className={`bg-gradient-to-br ${config.bgLight} border ${config.border} rounded-2xl p-6`}>
        <div className="flex items-start space-x-6">
          {/* Profile Picture */}
          <div className="flex-shrink-0">
            {user.profile?.profile_pictures?.length ? (
              <div className="relative cursor-pointer group" onClick={() => handleProfilePictureClick(0)}>
                <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur-md opacity-75 scale-110 group-hover:opacity-90 transition-opacity duration-200`}></div>
                <SafeImage
                  src={user.profile.profile_pictures[0] || ''}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-2xl border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-200"
                  fallbackInitial={user.profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
                  gradientClasses={config.bgGradient}
                />
                {/* Click indicator */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-colors duration-200 flex items-center justify-center">
                  <div className="bg-white/0 group-hover:bg-white/90 rounded-full p-2 transform scale-0 group-hover:scale-100 transition-all duration-200">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            ) : (
              <div className={`w-24 h-24 rounded-2xl bg-gradient-to-r ${config.bgGradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg`}>
                {user.profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
              </div>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-2xl font-bold text-gray-900">
                {user.profile?.full_name || 'No Name Provided'}
              </h3>
              <span className={`px-3 py-1 rounded-full ${config.badge} border text-sm font-semibold`}>
                {config.icon} {profileStatus}
              </span>
            </div>
            
            <p className="text-gray-600 text-lg mb-2">{user.email}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">📞</span>
                <span className="text-gray-700">{user.profile?.phone_number || 'Not provided'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">💼</span>
                <span className="text-gray-700">{user.profile?.profession || 'Not specified'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🎂</span>
                <span className="text-gray-700">
                  {user.profile?.date_of_birth ? new Date(user.profile.date_of_birth).toLocaleDateString() : 'Not provided'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      {user.profile?.bio && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📝</span> Bio
          </h4>
          <p className="text-gray-700 leading-relaxed">{user.profile.bio}</p>
        </div>
      )}

      {/* Interests */}
      {user.profile?.interests && user.profile.interests.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>🎯</span> Interests
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.profile.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-800 rounded-full text-sm font-medium border border-indigo-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Profile Pictures Gallery */}
      {user.profile?.profile_pictures && user.profile.profile_pictures.length > 1 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>🖼️</span> Profile Pictures
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {user.profile.profile_pictures.map((picture, index) => (
              <div 
                key={index} 
                className="aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                onClick={() => handleProfilePictureClick(index)}
              >
                <SafeImage
                  src={picture || ''}
                  alt={`Profile picture ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-xl group-hover:scale-110 transition-transform duration-300"
                  fallbackInitial={user.profile?.full_name?.charAt(0)?.toUpperCase() || '?'}
                  gradientClasses="from-indigo-500 to-violet-500"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-xl transition-colors duration-300 flex items-center justify-center">
                  <div className="bg-white/0 group-hover:bg-white/90 rounded-full p-3 transform scale-0 group-hover:scale-100 transition-all duration-300">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Account Status Management */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚙️</span> Account Management
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Status */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Profile Status
            </label>
            <div className={`p-4 rounded-xl ${config.badge} border`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Current Status:</span>
                <span className="flex items-center gap-1">
                  {config.icon} {profileStatus}
                </span>
              </div>
              
              {profileStatus === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => onStatusChange(
                      user.email,
                      String(user.profile?.date_of_birth),
                      ApprovedByAdminStatus.APPROVED
                    )}
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => onStatusChange(
                      user.email,
                      String(user.profile?.date_of_birth),
                      ApprovedByAdminStatus.REJECTED
                    )}
                    className="flex-1 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Event Creation Access */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Event Creation Access
            </label>
            <div className={`p-4 rounded-xl ${eventConfig.badge} border`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Current Access:</span>
                <span className="flex items-center gap-1">
                  {eventConfig.icon} {user.profile?.event_creation_approval || 'pending'}
                </span>
              </div>
              
              <div className="flex gap-1">
                {([ApprovedByAdminStatus.APPROVED, ApprovedByAdminStatus.PENDING, ApprovedByAdminStatus.REJECTED] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => onEventAccessChange(user.profile?._id as string, status)}
                    className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      user.profile?.event_creation_approval === status
                        ? 'bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {getStatusConfig(status).icon} {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>ℹ️</span> System Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">User ID:</span>
            <p className="text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1">{user._id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Profile ID:</span>
            <p className="text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1">{user.profile?._id || 'N/A'}</p>
          </div>
        </div>
      </div>

      {/* Profile Picture Modal */}
      {user.profile?.profile_pictures && (
        <ProfilePictureModal
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          images={user.profile.profile_pictures}
          userName={user.profile?.full_name || 'User'}
          initialIndex={selectedImageIndex}
        />
      )}
    </div>
  );
};

export default UserDetail;
