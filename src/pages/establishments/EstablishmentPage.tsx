import PageHeader from "@/components/layouts/dashboard/PageHeader";
import { Skeleton } from "@/components/ui/skeleton";
import { useEstablishment } from "@/context/establishment/establishment-context";

function EstablishmentPage() {
  const { establishment, isPending } = useEstablishment();
  return (
    <>
      <PageHeader>
        {isPending ? <Skeleton className="w-52 h-9" /> : establishment?.name}
      </PageHeader>
    </>
  );
}
export default EstablishmentPage;
