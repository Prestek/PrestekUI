import { History } from "@/components/History";
import { initialRequests } from "@/hooks/const/data";
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

  const total = initialRequests.length;

  return (
    <History
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      total={total}
      selectedTab={selectedTab}
      setSelectedTab={setSelectedTab}
    >
      <Applications total={filteredRequests.length}>
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
