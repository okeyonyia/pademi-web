import { ApprovedByAdminStatus, User } from "@/components/dashboard/Users";
import Http from "@/lib/http-client";

export class UserServices {
  static async getAllUsers(): Promise<User[]> {
    try {
      const response = await Http.get<{
        statusCode: number;
        message: string;
        data: User[];
      }>("/user");

      console.log("Response from backend => ", response);
      return response?.data ?? []; // ✅ Ensures it always returns an array
    } catch (err) {
      console.error("Error fetching users:", err);
      return []; // ✅ Prevents errors when handling data
    }
  }

  static async getUserById(id: string): Promise<User | null> {
    try {
      console.log("Fetching user with ID:", id); // Debug log
      const response = await Http.get<{
        statusCode: number;
        message: string;
        data: User;
      }>(`/user/${id}`);
      console.log("User fetched:", response); // Debug log
      return response?.data ?? null;
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw err;
    }
  }

  static async updateProfileStatus({
    email,
    date_of_birth,
    status,
  }: {
    email: string;
    date_of_birth: string;
    status: ApprovedByAdminStatus;
  }): Promise<User | null> {
    try {
      const response = await Http.patch<
        { email: string; date_of_birth: string; status: ApprovedByAdminStatus },
        { statusCode: number; message: string; data: User }
      >("/profile/update-status", { email, date_of_birth, status });

      console.log("Update response:", response);
      return response?.data ?? null;
    } catch (err) {
      console.error("Error updating profile status:", err);
      return null;
    }
  }

  static async updateEventAccess({
    id,
    event_creation_approval,
  }: {
    id: string;
    event_creation_approval: ApprovedByAdminStatus;
  }) {
    try {
      const response = await Http.patch<
        { event_creation_approval: ApprovedByAdminStatus },
        { statusCode: number; message: string; data: User["profile"] }
      >(`/profile/${id}`, { event_creation_approval });

      if (response && response.statusCode === 201) {
        console.log("Event access updated successfully:", response.data);
        return response.data;
      }

      return null;
    } catch (err) {
      console.error("Error updating event access:", err);
      return err;
    }
  }
}
