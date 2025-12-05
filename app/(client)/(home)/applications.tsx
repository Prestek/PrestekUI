
import { Applications } from "@/components/Applications";
import { Request } from "@/components/Client/home/Payment/Request";
import { History } from "@/components/History";
import { useApplications } from "@/hooks/useApplications";
import { LoanRequestStatus } from "@/models/enums/Request";
import { useState } from "react";

export default function ClientApplicationsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("pending");
  const { applications } = useApplications();
  const filteredRequests = applications.filter((request) => {
    const matchesSearch =
      request.bankName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.amount.toString().includes(searchQuery) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      (selectedTab === "pending" && request.status === LoanRequestStatus.PENDING) ||
      (selectedTab === "approved" && request.status === LoanRequestStatus.APPROVED) ||
      (selectedTab === "rejected" && request.status === LoanRequestStatus.REJECTED);

    return matchesSearch && matchesTab;
  });

  const total = applications.length;

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
