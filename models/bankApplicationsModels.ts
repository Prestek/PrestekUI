
import { ChildrenProps } from "./childrenModel";

export interface BankApplicationsProps extends ChildrenProps {
    total: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedTab: string;
    setSelectedTab: (tab: string) => void;
}