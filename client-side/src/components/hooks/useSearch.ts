import { useState, useEffect } from "react";
import { UserDetail } from "../types/UserDetails";

export const useSearch = (userDetails: UserDetail[]) => {
  const [nikSearchTerm, setNikSearchTerm] = useState("");
  const [namaSearchTerm, setNamaSearchTerm] = useState("");
  const [filteredUserDetails, setFilteredUserDetails] =
    useState<UserDetail[]>(userDetails);

  useEffect(() => {
    const results = userDetails.filter(
      (user) =>
        user.nik.toLowerCase().includes(nikSearchTerm.toLowerCase()) &&
        user.namaLengkap.toLowerCase().includes(namaSearchTerm.toLowerCase())
    );
    setFilteredUserDetails(results);
  }, [nikSearchTerm, namaSearchTerm, userDetails]);

  return {
    nikSearchTerm,
    namaSearchTerm,
    filteredUserDetails,
    setNikSearchTerm,
    setNamaSearchTerm,
  };
};
