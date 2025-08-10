'use client';

import { useState } from 'react';
import { Event } from './types';
import SafeImage from '@/components/common/SafeImage';
import DeleteConfirmationModal from '@/components/common/DeleteConfirmationModal';

export enum EventStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

interface EventDetailProps {
  event: Event;
  onStatusChange?: (eventId: string, status: EventStatus) => void;
  onDeleteEvent?: (eventId: string) => void;
}

const EventDetail: React.FC<EventDetailProps> = ({
  event,
  onStatusChange,
  onDeleteEvent,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
          bgGradient: 'from-blue-500 to-cyan-600',
          bgLight: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: '🎉',
          badge: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200'
        };
    }
  };

  // For now, we'll assume all events are 'pending' status. You can extend this based on your data model
  const eventStatus = EventStatus.PENDING; // This should come from your event data model
  const config = getStatusConfig(eventStatus);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const averageRating = event.reviews.length > 0 
    ? event.reviews.reduce((acc, review) => acc + review.rating, 0) / event.reviews.length 
    : 0;

  return (
    <div className="space-y-6">
      {/* Event Header */}
      <div className={`bg-gradient-to-br ${config.bgLight} border ${config.border} rounded-2xl p-6`}>
        <div className="flex items-start space-x-6">
          {/* Cover Picture */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${config.bgGradient} rounded-2xl blur-md opacity-75 scale-110`}></div>
              <SafeImage
                src={event.cover_picture || ''}
                alt="Event Cover"
                width={160}
                height={160}
                className="rounded-2xl border-4 border-white shadow-lg"
                fallbackInitial={event.title?.charAt(0)?.toUpperCase() || '?'}
                gradientClasses={config.bgGradient}
              />
            </div>
          </div>

          {/* Basic Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 rounded-full ${config.badge} border text-sm font-semibold`}>
                    {config.icon} {eventStatus}
                  </span>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium border border-purple-200">
                    {event.event_type}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500">👤</span>
                <span className="text-gray-700">{event.host_id.full_name || 'Unknown Host'}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">💰</span>
                <span className="text-gray-700">{formatCurrency(event.ticket_price)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">👥</span>
                <span className="text-gray-700">{event.attendees.length} / {event.slots} attendees</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500">🌍</span>
                <span className="text-gray-700">{event.is_public ? 'Public' : 'Private'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Event Schedule */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📅</span> Schedule
          </h4>
          <div className="space-y-3">
            <div>
              <span className="font-medium text-gray-700">Start Date:</span>
              <p className="text-gray-600">{formatDate(event.start_date)}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">End Date:</span>
              <p className="text-gray-600">{formatDate(event.end_date)}</p>
            </div>
          </div>
        </div>

        {/* Location */}
        {event.location && (
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>📍</span> Location
            </h4>
            <div className="space-y-2">
              {event.location.address ? (
                <p className="text-gray-700">{event.location.address}</p>
              ) : (
                <p className="text-gray-700">
                  Lat: {event.location.latitude}, Long: {event.location.longitude}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      {event.description && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span>📝</span> Description
          </h4>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      )}

      {/* Reviews Summary */}
      {event.reviews.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>⭐</span> Reviews ({event.reviews.length})
          </h4>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= averageRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-700 font-medium">
                {averageRating.toFixed(1)} average
              </span>
            </div>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {event.reviews.slice(0, 5).map((review, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`text-sm ${
                          star <= review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">Reviewer: {review.reviewer}</span>
                </div>
                {review.review && (
                  <p className="text-sm text-gray-700">{review.review}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Event Management */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>⚙️</span> Event Management
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Status Management */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Event Status
            </label>
            <div className={`p-4 rounded-xl ${config.badge} border`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium">Current Status:</span>
                <span className="flex items-center gap-1">
                  {config.icon} {eventStatus}
                </span>
              </div>
              
              {onStatusChange && (
                <div className="flex gap-1">
                  {([EventStatus.APPROVED, EventStatus.PENDING, EventStatus.REJECTED] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => onStatusChange(event._id, status)}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        eventStatus === status
                          ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {getStatusConfig(status).icon} {status}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wider">
              Danger Zone
            </label>
            <div className="p-4 rounded-xl bg-gradient-to-r from-red-50 to-pink-50 border border-red-200">
              <div className="mb-3">
                <span className="font-medium text-red-800">Delete Event</span>
                <p className="text-sm text-red-600 mt-1">
                  This action cannot be undone.
                </p>
              </div>
              
              {onDeleteEvent && (
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  🗑️ Delete Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span>ℹ️</span> System Information
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Event ID:</span>
            <p className="text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1">{event._id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Host ID:</span>
            <p className="text-gray-600 font-mono bg-white px-2 py-1 rounded mt-1">{event.host_id._id}</p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Created:</span>
            <p className="text-gray-600 bg-white px-2 py-1 rounded mt-1">
              {new Date(event.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div>
            <span className="font-medium text-gray-700">Last Updated:</span>
            <p className="text-gray-600 bg-white px-2 py-1 rounded mt-1">
              {new Date(event.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={async () => {
          setIsDeleting(true);
          try {
            await onDeleteEvent?.(event._id);
            setShowDeleteModal(false);
          } catch (error) {
            console.error('Failed to delete event:', error);
          } finally {
            setIsDeleting(false);
          }
        }}
        title="Delete Event"
        description="This action cannot be undone. This will permanently delete the event and remove all associated data including attendees, reviews, and bookings."
        itemName={event.title}
        itemType="event"
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default EventDetail;
