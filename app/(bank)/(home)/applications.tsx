
import { History } from "@/components/History";
import { initialRequests } from "@/hooks/const/data";
import { useState } from "react";
import { Applications } from "@/components/Applications";
import { BankRequest } from "@/components/Bank/Request";

export default function BankApplicationsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("pending");
  const filteredRequests = initialRequests.filter((request) => {
    const matchesSearch =
      request.applicant.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.amount.toString().includes(searchQuery) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      (selectedTab === "pending" && request.status === "Pendiente") ||
      (selectedTab === "approved" && request.status === "Aprobada") ||
      (selectedTab === "rejected" && request.status === "Rechazada");

    return matchesSearch && matchesTab;
  });

  const total = initialRequests.length;

  return (
    <History searchQuery={searchQuery} setSearchQuery={setSearchQuery} total={total} selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <Applications
        total={filteredRequests.length}
      >
        {filteredRequests
        .map((request: any, index: number) =>
          <BankRequest
              request={request}
              showElevation={true}
              key={index}
            />
        )}
        </Applications>
    </History>
  );
}
