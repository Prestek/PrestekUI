import { CompleteProfile } from "@/components/Client/scanner/profile/CompleteProfile";

export default function ProfileScreen() {
    return (
        <CompleteProfile data={null} isEditing={false} withScanner={false} />
    );
}