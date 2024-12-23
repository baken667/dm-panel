import { Trans } from "react-i18next";
import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "../layouts/dashboard/PageSection";
import { useEstablishment } from "@/context/establishment/establishment-context";
import UploadImage from "../app/UploadImage";
import { useUploadImage } from "@/hooks/use-upload-image";
import { ESTABLISHMENT_KEY, useEstablishmentLogoUpdateMutation } from "@/queries/establishments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

function EstablishmentLogoSection() {
  const { establishment } = useEstablishment();

  const queryClient = useQueryClient();

  const { isPending: isLogoUpdatePending, mutateAsync } =
    useEstablishmentLogoUpdateMutation();

  const uploadImage = useUploadImage({
    initialImage: establishment?.logo,
    thumb: "150",
  });

  function handleLogoUpdate() {
    if (!establishment) return;
    if (!uploadImage.isDirty) return;

    const formData = new FormData();
    formData.append("logo", uploadImage.state ?? "");

    toast.promise(
      mutateAsync({
        id: establishment.id,
        data: formData,
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: [ESTABLISHMENT_KEY],
        });
      }),
      {
        loading: <Trans>loading</Trans>,
        success: <Trans>establishment_logo_updated_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }
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
        <div className="flex flex-row gap-4 items-center">
          <UploadImage uploadImage={uploadImage} />
          {uploadImage.isDirty && (
            <div className="flex gap-4">
              <Button disabled={isLogoUpdatePending} onClick={handleLogoUpdate}>
                <Trans>save</Trans>
                {isLogoUpdatePending && <Loader2 className="animate-spin" />}
              </Button>
              <Button onClick={uploadImage.reset} variant="outline">
                <Trans>reset</Trans>
              </Button>
            </div>
          )}
        </div>
      </PageSection>
  );
}
export default EstablishmentLogoSection;
