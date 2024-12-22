import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "@/components/layouts/dashboard/PageSection";
import { Trans } from "react-i18next";

function EstablishmentPage() {
  return (
    <div>
      <PageSection
        sectionDescription={
          <PageSectionHeader>
            <PageSectionTitle>
              <Trans>establishment_logo</Trans>
            </PageSectionTitle>
            <PageSectionDescription>
              <Trans>establishment_logo_description</Trans>
            </PageSectionDescription>
          </PageSectionHeader>
        }
      >
        hi
      </PageSection>
    </div>
  );
}
export default EstablishmentPage;
