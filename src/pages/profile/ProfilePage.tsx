import PageHeader from "@/components/layouts/dashboard/PageHeader";
import ProfileMainDataSection from "@/components/profile/ProfileMainDataSection";
import ProfileResetPassword from "@/components/profile/ProfileResetPassword";
import { Trans } from "react-i18next";

function ProfilePage() {
  return (
    <div className="flex-1">
      <PageHeader>
        <Trans>profile</Trans>
      </PageHeader>
      <div className="grid gap-10 mt-10">
        <ProfileMainDataSection />
        <ProfileResetPassword />
      </div>
    </div>
  );
}
export default ProfilePage;
