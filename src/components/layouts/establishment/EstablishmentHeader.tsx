import { useEstablishment } from "@/context/establishment/establishment-context";
import PageHeader from "../dashboard/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ESTABLISHMENT_KEY,
  useEstablishmentStatusUpdateMutation,
} from "@/queries/establishments";
import { Establishment } from "@/types/establishment-type";
import { toast } from "sonner";
import { Trans } from "react-i18next";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

function EstablishmentStatus({
  establishment,
  isPending,
}: {
  establishment: Establishment | null;
  isPending: boolean;
}) {
  const { mutateAsync, isPending: isMutationPending } =
    useEstablishmentStatusUpdateMutation();
  const queryClient = useQueryClient();

  function toggleStatus() {
    if (isMutationPending || isPending || !establishment) return;
    toast.promise(
      mutateAsync({
        id: establishment.id,
        status: !establishment.active,
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: [ESTABLISHMENT_KEY],
        });
      }),
      {
        loading: <Trans>updating_establishment_status</Trans>,
        success: <Trans>establishment_status_updated</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="establishment-status"
        disabled={isPending || isMutationPending}
        checked={establishment?.active}
        onCheckedChange={toggleStatus}
      />
      <Label htmlFor="establishment-status">
        <Trans>{establishment?.active ? "active" : "inactive"}</Trans>
      </Label>
    </div>
  );
}

function EstablishmentHeader() {
  const { establishment, isPending, isFetching } = useEstablishment();

  return (
    <PageHeader
      actions={
        <EstablishmentStatus
          establishment={establishment}
          isPending={isPending}
        />
      }
    >
      <div
        className={cn({
          "text-muted-foreground": isFetching,
        })}
      >
        {isPending ? <Skeleton className="w-52 h-9" /> : establishment?.name}
      </div>
    </PageHeader>
  );
}
export default EstablishmentHeader;
