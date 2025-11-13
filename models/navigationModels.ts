import { ChildrenProps } from "./childrenModel";

export interface NavigationProps extends ChildrenProps {
    showExit?: boolean;
    currentStep?: number;
    totalSteps?: number;
    stepLabels?: string[];
    stepTitle?: string;
    showBackButton?: boolean;
    showShadow?: boolean;
    showElevated?: boolean;
}