"use client";

import { UserServices } from "@/app/api/users/route";
import LazyImg from "@/components/common/lazyImage/page";
import CustomLoader from "@/components/common/loader/page";
import { useEffect, useState } from "react";

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
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

const UsersData: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [statusLoading, setStatusLoading] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, string>
  >({});

  const saveStatusChange = async (userId: string) => {
    if (!selectedStatuses[userId]) return;

    try {
      setStatusLoading(true);
      await handleEventAccessChange(
        userId,
        selectedStatuses[userId] as ApprovedByAdminStatus
      );

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.profile?._id === userId
            ? {
                ...user,
                profile: {
                  ...user.profile,
                  event_creation_approval: selectedStatuses[
                    userId
                  ] as ApprovedByAdminStatus, // Ensure correct type
                } as User["profile"], // ✅ Type assertion to match the User type
              }
            : user
        )
      );

      setSelectedStatuses((prev) => {
        const newState = { ...prev };
        delete newState[userId]; // Remove from pending changes after saving
        return newState;
      });
    } catch (error) {
      console.error("Failed to update event access status:", error);
    } finally {
      setStatusLoading(false);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserServices.getAllUsers();
        console.log("Data => ", data);
        setUsers(data);
      } catch (err) {
        setError("Failed to fetch users");
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
      console.log("Updating status for user:", updateStatus); // Debug log
      const updatedUser = await UserServices.updateProfileStatus(updateStatus);
      console.log("Updated user:", updatedUser); // Debug log

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
      console.error("Failed to update status", err);
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
      console.error("Failed to update event access", err);
    }
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    );

  if (error) return <p className="max-h-screen">{error}</p>;

  if (users.length === 0)
    return <p className="max-h-screen">No users found.</p>;

  const renderTable = (
    title: string,
    status: "approved" | "pending" | "rejected"
  ) => {
    const filteredUsers = users.filter(
      (user) => user.profile?.is_approved === status
    );
    return (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <div className="overflow-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Profile Picture
                </th>
                <th className="border border-gray-300 px-4 py-2">Full Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Profession</th>
                {status === "pending" && (
                  <th className="border border-gray-300 px-4 py-2">Actions</th>
                )}
                {status === "approved" && (
                  <>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Create Event Access
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: User) => (
                  <tr key={user._id} className="text-center">
                    <td className="border border-gray-300 px-4 py-2">
                      {user.profile?.profile_pictures?.length ? (
                        <LazyImg
                          src={user.profile.profile_pictures[0]}
                          alt="Profile"
                          placeholder={user.profile.profile_pictures[0]}
                          className="w-12 h-12 rounded-full mx-auto"
                        />
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.profile?.full_name || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.profile?.phone_number || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.profile?.profession || "N/A"}
                    </td>
                    {status === "pending" && (
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              user.email,
                              String(user.profile?.date_of_birth),
                              ApprovedByAdminStatus.APPROVED
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              user.email,
                              String(user.profile?.date_of_birth),
                              ApprovedByAdminStatus.REJECTED
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </td>
                    )}
                    {status === "approved" && (
                      <>
                        <td className="border border-gray-300 px-4 py-2 text-green-600 font-bold">
                          Approved
                        </td>

                        <td className="border border-gray-300 px-4 py-2 flex flex-col gap-y-1">
                          <select
                            className="border border-gray-400 rounded px-2 py-1 text-sm"
                            value={
                              selectedStatuses[user.profile?._id as string] ??
                              user.profile?.event_creation_approval
                            }
                            onChange={(e) =>
                              setSelectedStatuses((prev) => ({
                                ...prev,
                                [user.profile?._id as string]: e.target
                                  .value as ApprovedByAdminStatus,
                              }))
                            }
                          >
                            <option value="approved">✅ Approved</option>
                            <option value="pending">⏳ Pending</option>
                            <option value="rejected">❌ Rejected</option>
                          </select>

                          {selectedStatuses[user.profile?._id as string] &&
                            selectedStatuses[user.profile?._id as string] !==
                              user.profile?.event_creation_approval && (
                              <button
                                onClick={() =>
                                  saveStatusChange(user.profile?._id as string)
                                }
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition"
                              >
                                {statusLoading ? <CustomLoader /> : "Save"}
                              </button>
                            )}
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={status === "pending" ? 8 : 7}
                    className="border border-gray-300 px-4 py-2 text-center"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {renderTable("Approved Users", "approved")}
      {renderTable("Pending Users", "pending")}
      {renderTable("Rejected Users", "rejected")}
    </div>
  );
};

export default UsersData;
