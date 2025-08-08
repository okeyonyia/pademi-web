'use client';

import { UserServices } from '@/services/users/route';
import { useEffect, useState, useMemo } from 'react';
import Table from '@/components/common/Table';
import Pagination from '@/components/common/Pagination';
import Modal from '@/components/common/Modal';
import UserDetail from './UserDetail';
import SafeImage from '@/components/common/SafeImage';
import CustomSelect from '@/components/common/CustomSelect';

export interface User {
  _id: string;
  email: string;
  profile?: {
    _id?: string;
    full_name?: string;
    phone_number?: string;
    bio?: string;
    profession?: string;
    interests?: string[];
    profile_pictures?: string[];
    is_approved?: ApprovedByAdminStatus;
    event_creation_approval?: ApprovedByAdminStatus;
    date_of_birth?: string;
  };
}
export enum ApprovedByAdminStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

const UsersData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<
    'all' | ApprovedByAdminStatus
  >('all');
  const [searchQuery, setSearchQuery] = useState('');


  // Filtered and paginated data
  const filteredUsers = useMemo(() => {
    let filtered = users;

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(
        (user) => user.profile?.is_approved === statusFilter
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.email.toLowerCase().includes(query) ||
          user.profile?.full_name?.toLowerCase().includes(query) ||
          user.profile?.phone_number?.includes(query) ||
          user.profile?.profession?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [users, statusFilter, searchQuery]);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
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
          badge:
            'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border-emerald-200',
        };
      case 'pending':
        return {
          bgGradient: 'from-amber-500 to-orange-600',
          bgLight: 'from-amber-50 to-orange-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          icon: '⏳',
          badge:
            'bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 border-amber-200',
        };
      case 'rejected':
        return {
          bgGradient: 'from-red-500 to-pink-600',
          bgLight: 'from-red-50 to-pink-50',
          border: 'border-red-200',
          text: 'text-red-800',
          icon: '❌',
          badge:
            'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-200',
        };
      default:
        return {
          bgGradient: 'from-gray-500 to-slate-600',
          bgLight: 'from-gray-50 to-slate-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          icon: '👤',
          badge:
            'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-200',
        };
    }
  };

  // Table columns configuration
  const columns = [
    {
      key: 'profile_picture',
      label: 'User',
      width: '280px',
      render: (value: unknown, user: User) => (
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 flex-shrink-0'>
            <SafeImage
              src={user.profile?.profile_pictures?.[0] || ''}
              alt={user.profile?.full_name || 'User'}
              width={48}
              height={48}
              className='rounded-full ring-2 ring-white shadow-md overflow-hidden'
              fallbackInitial={
                user.profile?.full_name?.charAt(0)?.toUpperCase() || '?'
              }
              gradientClasses='from-purple-500 to-pink-500'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <div className='font-semibold text-gray-900 truncate'>
              {user.profile?.full_name || 'No Name'}
            </div>
            <div className='text-sm text-gray-500 truncate'>{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'profile.phone_number',
      label: 'Contact',
      width: '180px',
      render: (value: unknown, user: User) => (
        <div>
          <div className='text-gray-700 truncate'>
            {user.profile?.phone_number || 'Not provided'}
          </div>
          <div className='text-xs text-gray-500 truncate'>
            {user.profile?.profession || 'Not specified'}
          </div>
        </div>
      ),
    },
    {
      key: 'profile.is_approved',
      label: 'Profile Status',
      width: '140px',
      sortable: true,
      render: (value: unknown, user: User) => {
        const status = user.profile?.is_approved || 'pending';
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
      key: 'profile.event_creation_approval',
      label: 'Event Access',
      width: '140px',
      sortable: true,
      render: (value: unknown, user: User) => {
        const status = user.profile?.event_creation_approval || 'pending';
        const config = getStatusConfig(status);
        return (
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-medium ${config.badge} border whitespace-nowrap`}
          >
            {config.icon} {status}
          </span>
        );
      },
    },
    {
      key: 'profile.interests',
      label: 'Interests',
      width: '200px',
      render: (value: unknown, user: User) => (
        <div className='flex flex-wrap gap-1'>
          {user.profile?.interests && user.profile.interests.length > 0 ? (
            <>
              {user.profile.interests.slice(0, 2).map((interest, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-purple-100 text-purple-800 rounded-md text-xs font-medium'
                >
                  {interest}
                </span>
              ))}
              {user.profile.interests.length > 2 && (
                <span className='px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium'>
                  +{user.profile.interests.length - 2}
                </span>
              )}
            </>
          ) : (
            <span className='text-xs text-gray-400'>None specified</span>
          )}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      width: '120px',
      render: (value: unknown, user: User) => (
        <div className='flex justify-end'>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(user);
            }}
            className='px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg text-xs font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 whitespace-nowrap'
          >
            View Details
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserServices.getAllUsers();
        console.log('Data => ', data);
        setUsers(data);
      } catch (err) {
        setError(`Failed to fetch users ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleStatusChange = async (
    email: string,
    date_of_birth: string,
    status: ApprovedByAdminStatus
  ) => {
    const updateStatus = {
      email,
      date_of_birth,
      status,
    };
    try {
      console.log('Updating status for user:', updateStatus); // Debug log
      const updatedUser = await UserServices.updateProfileStatus(updateStatus);
      console.log('Updated user:', updatedUser); // Debug log

      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updatedUser._id
              ? { ...user, profile: { ...user.profile, is_approved: status } }
              : user
          )
        );
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleEventAccessChange = async (
    userId: string,
    newStatus: ApprovedByAdminStatus
  ) => {
    try {
      console.log(`Updating event access for ${userId} to ${newStatus}`);

      // Simulate API call to update event access status
      const updatedUser = await UserServices.updateEventAccess({
        id: userId,
        event_creation_approval: newStatus,
      });

      if (updatedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId
              ? {
                  ...user,
                  profile: {
                    ...user.profile,
                    event_creation_approval: newStatus,
                  },
                }
              : user
          )
        );
      }
    } catch (err) {
      console.error('Failed to update event access', err);
    }
  };

  if (loading)
    return (
      <div className='min-h-screen flex justify-center items-center'>
        <div className='relative'>
          <div className='w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin'></div>
          <div className='absolute inset-0 w-16 h-16 border-4 border-transparent border-r-violet-400 rounded-full animate-spin animate-reverse'></div>
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

  if (users.length === 0)
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 rounded-2xl p-8 max-w-md mx-auto text-center'>
          <div className='text-indigo-500 text-4xl mb-4'>👥</div>
          <h3 className='text-lg font-semibold text-indigo-800 mb-2'>
            No Users Found
          </h3>
          <p className='text-indigo-600'>
            There are currently no users in the system.
          </p>
        </div>
      </div>
    );

  return (
    <div className='min-h-screen space-y-6'>
      {/* Header Section */}
      <div className='relative overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-violet-600/10 rounded-3xl blur-3xl'></div>
        <div className='relative bg-gradient-to-r from-indigo-50 via-purple-50 to-violet-50 border border-indigo-200 rounded-3xl p-8 shadow-lg'>
          <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-6'>
            <div>
              <h1 className='text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2'>
                User Management
              </h1>
              <p className='text-gray-600 text-lg'>
                Manage user accounts, approvals, and permissions
              </p>
            </div>
            <div className='flex items-center gap-6'>
              <div className='text-center'>
                <div className='text-3xl font-bold text-emerald-600'>
                  {
                    users.filter((u) => u.profile?.is_approved === 'approved')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Approved
                </div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-amber-600'>
                  {
                    users.filter((u) => u.profile?.is_approved === 'pending')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Pending
                </div>
              </div>
              <div className='text-center'>
                <div className='text-3xl font-bold text-red-600'>
                  {
                    users.filter((u) => u.profile?.is_approved === 'rejected')
                      .length
                  }
                </div>
                <div className='text-sm text-gray-500 uppercase tracking-wider'>
                  Rejected
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
                placeholder='Search users by name, email, phone, or profession...'
                className='w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300'
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
                  setStatusFilter(value as 'all' | ApprovedByAdminStatus);
                  setCurrentPage(1);
                }}
                options={[
                  {
                    value: 'all',
                    label: 'All Users',
                    icon: <span>👥</span>,
                    color: 'text-gray-600',
                  },
                  {
                    value: 'approved',
                    label: 'Approved',
                    icon: <span>✅</span>,
                    color: 'text-emerald-600',
                  },
                  {
                    value: 'pending',
                    label: 'Pending',
                    icon: <span>⏳</span>,
                    color: 'text-amber-600',
                  },
                  {
                    value: 'rejected',
                    label: 'Rejected',
                    icon: <span>❌</span>,
                    color: 'text-red-600',
                  },
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
        data={paginatedUsers}
        columns={columns}
        onRowClick={handleRowClick}
        rowKey='_id'
        loading={loading}
        emptyMessage='No users match your current filters'
      />

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredUsers.length}
        />
      )}

      {/* User Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={`User Details - ${selectedUser?.profile?.full_name || selectedUser?.email}`}
        maxWidth='max-w-4xl'
      >
        {selectedUser && (
          <UserDetail
            user={selectedUser}
            onStatusChange={handleStatusChange}
            onEventAccessChange={handleEventAccessChange}
          />
        )}
      </Modal>
    </div>
  );
};

export default UsersData;
