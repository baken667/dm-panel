import { Trans } from "react-i18next";
import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "../layouts/dashboard/PageSection";
import { useEstablishment } from "@/context/establishment/establishment-context";
import UploadImage from "../app/UploadImage";
import { useUploadImage } from "@/hooks/use-upload-image";

function EstablishmentLogoSection() {
  const { establishment } = useEstablishment();
  const uploadImage = useUploadImage({
    initialImage: establishment?.logo,
    thumb: "150",
  });

  return (
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
      <UploadImage uploadImage={uploadImage} />
    </PageSection>
  );
}
export default EstablishmentLogoSection;
