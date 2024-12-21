import { Trans } from "react-i18next";
import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "../layouts/dashboard/PageSection";
import Action from "../common/Action";

function ProfileResetPassword() {
  return (
    <PageSection
      sectionDescription={
        <PageSectionHeader>
          <PageSectionTitle>
            <Trans>profile_reset_password</Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>profile_reset_password_description</Trans>
          </PageSectionDescription>
        </PageSectionHeader>
      }
    >
      <Action
        title={<Trans>profile_reset_password</Trans>}
        action={<Trans>reset</Trans>}
        handler={() => {}}
      />
    </PageSection>
  );
}
export default ProfileResetPassword;
