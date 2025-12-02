
import { Applications } from "@/components/Applications";
import { Request } from "@/components/Client/home/Payment/Request";
import { History } from "@/components/History";
import { creditUserRequests } from "@/hooks/const/data";
import { useState } from "react";

export default function ClientApplicationsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("pending");
  const filteredRequests = creditUserRequests.filter((request) => {
    const matchesSearch =
      request.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.amount.toString().includes(searchQuery) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      (selectedTab === "pending" && request.status === "Pendiente") ||
      (selectedTab === "approved" && request.status === "Aprobada") ||
      (selectedTab === "rejected" && request.status === "Rechazada");

    return matchesSearch && matchesTab;
  });

  const total = creditUserRequests.length;

  return (
    <History searchQuery={searchQuery} setSearchQuery={setSearchQuery} total={total} selectedTab={selectedTab} setSelectedTab={setSelectedTab}>
      <Applications
        total={filteredRequests.length}
      >
        {filteredRequests
        .map((request: any, index: number) =>
          <Request
              request={request}
              showElevation={true}
              key={index}
            />
        )}
        </Applications>
    </History>
  );
}
