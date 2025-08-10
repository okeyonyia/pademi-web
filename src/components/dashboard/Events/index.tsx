'use client';

import { useEffect, useState, useMemo } from 'react';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import Modal from '@/components/common/Modal';
import EventDetail, { EventStatus } from './EventDetail';
import SafeImage from '@/components/common/SafeImage';
import CustomSelect from '@/components/common/CustomSelect';
import { EventServices } from '@/services/events/route';
import { Event } from './types';

const EventsData: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'upcoming' | 'past'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');

  // Filtered and paginated data
  const filteredEvents = useMemo(() => {
    let filtered = events;

    // Apply status filter
    if (statusFilter !== 'all') {
      const now = new Date();
      filtered = filtered.filter((event) => {
        const startDate = new Date(event.start_date);
        const endDate = new Date(event.end_date);
        
        switch (statusFilter) {
          case 'active':
            return startDate <= now && endDate >= now;
          case 'upcoming':
            return startDate > now;
          case 'past':
            return endDate < now;
          default:
            return true;
        }
      });
    }

    // Apply event type filter
    if (eventTypeFilter !== 'all') {
      filtered = filtered.filter((event) => 
        event.event_type.toLowerCase() === eventTypeFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.host_id.full_name?.toLowerCase().includes(query) ||
          event.description?.toLowerCase().includes(query) ||
          event.event_type.toLowerCase().includes(query) ||
          event.location?.address?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [events, statusFilter, eventTypeFilter, searchQuery]);

  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEvents.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEvents, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'active':
        return {
          bgGradient: 'from-emerald-500 to-teal-600',
          bgLight: 'from-emerald-50 to-teal-50',
          border: 'border-emerald-200',
          text: 'text-emerald-800',
          icon: '🟢',
          badge: 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200',
        };
      case 'upcoming':
        return {
          bgGradient: 'from-blue-500 to-indigo-600',
          bgLight: 'from-blue-50 to-indigo-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: '⏰',
          badge: 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200',
        };
      case 'past':
        return {
          bgGradient: 'from-gray-500 to-slate-600',
          bgLight: 'from-gray-50 to-slate-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: '⏹️',
          badge: 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
      default:
        return {
          bgGradient: 'from-blue-500 to-cyan-600',
          bgLight: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          icon: '🎉',
          badge: 'bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200',
        };
    }
  };

  const getEventStatus = (event: Event) => {
    const now = new Date();
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    
    if (startDate <= now && endDate >= now) return 'active';
    if (startDate > now) return 'upcoming';
    return 'past';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  const getUniqueEventTypes = () => {
    const types = events.map(event => event.event_type).filter(Boolean);
    return [...new Set(types)];
  };

  // Table columns configuration
  const columns = [
    {
      key: 'cover_picture',
      label: 'Event',
      width: '280px',
      render: (value: unknown, event: Event) => (
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 flex-shrink-0'>
            <SafeImage
              src={event.cover_picture || ''}
              alt={event.title || 'Event'}
              width={48}
              height={48}
              className='rounded-full ring-2 ring-white shadow-md overflow-hidden'
              fallbackInitial={event.title?.charAt(0)?.toUpperCase() || '?'}
              gradientClasses='from-blue-500 to-cyan-500'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <div className='font-semibold text-gray-900 truncate'>
              {event.title || 'No Title'}
            </div>
            <div className='text-sm text-gray-500 truncate'>{event.event_type}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'host_id.full_name',
      label: 'Host & Location',
      width: '180px',
      render: (value: unknown, event: Event) => (
        <div>
          <div className='text-gray-700 truncate'>
            {event.host_id.full_name || 'Unknown Host'}
          </div>
          <div className='text-xs text-gray-500 truncate'>
            {event.location?.address || 'No address'}
          </div>
        </div>
      ),
    },
    {
      key: 'start_date',
      label: 'Status',
      width: '140px',
      sortable: true,
      render: (value: unknown, event: Event) => {
        const status = getEventStatus(event);
        const config = getStatusConfig(status);
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ${config.badge} border whitespace-nowrap`}
          >
            {config.icon} {status}
          </span>
        );
      },
    },
    {
      key: 'ticket_price',
      label: 'Price',
      width: '100px',
      sortable: true,
      render: (value: unknown, event: Event) => (
        <span className='font-medium text-gray-700'>
          {formatCurrency(event.ticket_price)}
        </span>
      ),
    },
    {
      key: 'attendees',
      label: 'Attendees',
      width: '120px',
      render: (value: unknown, event: Event) => (
        <div className='text-center'>
          <div className='font-medium text-gray-700'>
            {event.attendees.length} / {event.slots}
          </div>
          <div className='text-xs text-gray-500'>
            {((event.attendees.length / event.slots) * 100).toFixed(0)}% full
          </div>
        </div>
      ),
    },
    {
      key: 'is_public',
      label: 'Visibility',
      width: '100px',
      render: (value: unknown, event: Event) => (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            event.is_public
              ? 'bg-green-100 text-green-800'
              : 'bg-orange-100 text-orange-800'
          }`}
        >
          {event.is_public ? '🌍 Public' : '🔒 Private'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '120px',
      render: (value: unknown, event: Event) => (
        <div className='flex justify-end'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(event);
            }}
            className='px-3 py-1.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 text-white rounded-lg text-xs font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap'
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await EventServices.getAllEvents(1, 1000); // Get all events
        console.log('Events data =>', data);
        setEvents(data);
      } catch (err) {
        setError(`Failed to fetch events: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await EventServices.deleteEvent(eventId);
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== eventId)
      );
      // Close modal if the deleted event was selected
      if (selectedEvent?._id === eventId) {
        closeModal();
      }
    } catch (err) {
      console.error('Failed to delete event', err);
      alert('Failed to delete event');
    }
  };

  const handleStatusChange = async (
    eventId: string,
    status: EventStatus
  ) => {
    // This would typically make an API call to update event status
    // For now, we'll just log it since you might not have the backend endpoint yet
    console.log(`Would update event ${eventId} status to ${status}`);
    // You can implement this when you have the backend endpoint
  };

  if (loading)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='relative'>
          <div className='w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin'></div>
          <div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-r-cyan-400 rounded-full animate-spin animate-reverse'></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md mx-auto text-center'>
          <div className='text-red-500 text-4xl mb-4'>⚠️</div>
          <h3 className='text-lg font-semibold text-red-800 mb-2'>Error</h3>
          <p className='text-red-600'>{error}</p>
        </div>
      </div>
    );

  if (events.length === 0)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-8 max-w-md mx-auto text-center'>
          <div className='text-blue-500 text-4xl mb-4'>🎉</div>
          <h3 className='text-lg font-semibold text-blue-800 mb-2'>
            No Events Found
          </h3>
          <p className='text-blue-600'>
            There are currently no events in the system.
          </p>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen space-y-6'>
      {/* Header Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-3xl blur-3xl'></div>
        <div className='bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200 rounded-3xl p-8 shadow-lg'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>
                Event Management
              </h1>
              <p className='text-gray-600 text-lg'>
                Manage events, hosts, and event activities
              </p>
            </div>
            <div className='flex items-center gap-6'>
              <div className='text-center'>
              <div className='text-3xl font-bold text-indigo-600'>
                  {events.length}
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Total Events
                </div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-emerald-600'>
                  {
                    events.filter((e) => getEventStatus(e) === 'active')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Active
                </div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-violet-600'>
                  {
                    events.filter((e) => getEventStatus(e) === 'upcoming')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Upcoming
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className='bg-white border border-gray-200 rounded-2xl p-6 shadow-lg'>
        <div className='flex flex-col lg:flex-row lg:items-center gap-4'>
          {/* Search */}
          <div className='flex-1'>
            <div className='relative'>
              <svg
                className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                />
              </svg>
              <input
                type='text'
                placeholder='Search events by title, host, type, or location...'
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Filters */}
          <div className='flex items-end gap-4'>
            {/* Status Filter */}
            <div className='min-w-[200px]'>
              <CustomSelect
                label='Filter by Status'
                value={statusFilter}
                onChange={(value) => {
                  setStatusFilter(value as 'all' | 'active' | 'upcoming' | 'past');
                  setCurrentPage(1);
                }}
                options={[
                  {
                    value: 'all',
                    label: 'All Events',
                    icon: <span>🎉</span>,
                    color: 'text-gray-600',
                  },
                  {
                    value: 'active',
                    label: 'Active',
                    icon: <span>🟢</span>,
                    color: 'text-emerald-600',
                  },
                  {
                    value: 'upcoming',
                    label: 'Upcoming',
                    icon: <span>⏰</span>,
                    color: 'text-blue-600',
                  },
                  {
                    value: 'past',
                    label: 'Past',
                    icon: <span>⏹️</span>,
                    color: 'text-gray-600',
                  },
                ]}
                size='md'
              />
            </div>

            {/* Event Type Filter */}
            <div className='min-w-[180px]'>
              <CustomSelect
                label='Event Type'
                value={eventTypeFilter}
                onChange={(value) => {
                  setEventTypeFilter(value);
                  setCurrentPage(1);
                }}
                options={[
                  {
                    value: 'all',
                    label: 'All Types',
                    icon: <span>📂</span>,
                    color: 'text-gray-600',
                  },
                  ...getUniqueEventTypes().map(type => ({
                    value: type,
                    label: type,
                    icon: <span>🏷️</span>,
                    color: 'text-purple-600',
                  }))
                ]}
                size='md'
              />
            </div>

            {/* Items per page */}
            <div className='min-w-[140px]'>
              <CustomSelect
                label='Show'
                value={itemsPerPage.toString()}
                onChange={(value) => {
                  setItemsPerPage(Number(value));
                  setCurrentPage(1);
                }}
                options={[
                  {
                    value: '5',
                    label: '5 per page',
                    icon: <span>📄</span>,
                    color: 'text-blue-600',
                  },
                  {
                    value: '10',
                    label: '10 per page',
                    icon: <span>📄</span>,
                    color: 'text-blue-600',
                  },
                  {
                    value: '25',
                    label: '25 per page',
                    icon: <span>📄</span>,
                    color: 'text-blue-600',
                  },
                  {
                    value: '50',
                    label: '50 per page',
                    icon: <span>📄</span>,
                    color: 'text-blue-600',
                  },
                ]}
                size='md'
              />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        data={paginatedEvents}
        columns={columns}
        onRowClick={handleRowClick}
        rowKey='_id'
        loading={loading}
        emptyMessage='No events match your current filters'
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredEvents.length}
        />
      )}

      {/* Event Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`Event Details - ${selectedEvent?.title}`}
        maxWidth='max-w-4xl'
      >
        {selectedEvent && (
          <EventDetail
            event={selectedEvent}
            onStatusChange={handleStatusChange}
            onDeleteEvent={handleDeleteEvent}
          />
        )}
      </Modal>
    </div>
  );
};

export default EventsData;
