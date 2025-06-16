import { Event } from "@/components/dashboard/Events/types";
import Http from "@/lib/http-client";

export class EventServices {
  static async getAllEvents(
    page: number = 1,
    limit: number = 10
  ): Promise<Event[]> {
    try {
      const url = `/event?page=${page}&limit=${limit}`;

      const response = await Http.get<{
        statusCode: number;
        message: string;
        data: Event[];
      }>(url);

      return response?.data ?? [];
    } catch (err) {
      console.error("Error fetching users:", err);
      return []; // ✅ Prevents errors when handling data
    }
  }

  static async deleteEvent(id: string): Promise<Event> {
    try {
      const res = await Http.delete<{
        statusCode: number;
        message: string;
        data: Event;
      }>(`/event/${id}`);

      if (!res || res.statusCode != 200) {
        throw new Error(res?.message || "Something went wrong");
      }

      return res.data;
    } catch (err) {
      throw err;
    }
  }
}
