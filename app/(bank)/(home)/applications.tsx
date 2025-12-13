import { History } from "@/components/History";
import { useState } from "react";
import { Applications } from "@/components/Applications";
import { BankRequest } from "@/components/Bank/Request";
import { LoanRequestStatus } from "@/models/enums/Request";
import { useBank } from "@/hooks/useBank";

export default function BankApplicationsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<string>("pending");
  const { applications, bankCode } = useBank();
  const filteredRequests = applications.filter((request) => {
    const matchesSearch =
      request.userId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.amount.toString().includes(searchQuery) ||
      request.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      (selectedTab === "pending" &&
        request.status === LoanRequestStatus.PENDING) ||
      (selectedTab === "approved" &&
        request.status === LoanRequestStatus.APPROVED) ||
      (selectedTab === "rejected" &&
        request.status === LoanRequestStatus.REJECTED);

    return matchesSearch && matchesTab;
  });

  const total = applications?.length ?? 0;

  return (
    <History
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      total={total}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      <Applications total={filteredRequests?.length ?? 0}>
        {filteredRequests.map((request: any) => (
          <BankRequest
            request={request}
            showElevation={true}
            key={request.id}
            bankCode={bankCode}
          />
        ))}
      </Applications>
    </History>
  );
}
