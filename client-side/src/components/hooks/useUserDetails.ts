import { useState, useEffect } from "react";
import { UserDetail } from "../types/UserDetails";

const API_URL = "http://localhost:8080/api/v1/user-details";

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState<UserDetail[]>([]);
  const [filteredUserDetails, setFilteredUserDetails] = useState<UserDetail[]>(
    []
  );

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch user details");
      const data = await response.json();
      if (data && Array.isArray(data.content)) {
        setUserDetails(data.content);
        setFilteredUserDetails(data.content);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete user");
      setUserDetails((prev) => prev.filter((user) => user.id !== id));
      setFilteredUserDetails((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return {
    userDetails,
    filteredUserDetails,
    setFilteredUserDetails,
    deleteUser,
    fetchUserDetails,
  };
};
