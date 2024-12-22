import { Trans } from "react-i18next";
import CreateEstablishmentDialog from "@/components/establishments/CreateEstablishmentDialog";
import EstablishmentsTable from "@/components/establishments/EstablishmentsTable";
import PageHeader from "@/components/layouts/dashboard/PageHeader";
import { usePaginationPage } from "@/hooks/use-pagination-page";
import { useEstablishmentListQuery } from "@/queries/establishments";
import AppPagination from "@/components/common/AppPagination";

function EstablishmentsPage() {
  const [page, setPage] = usePaginationPage();

  const { data: establishmentsData, isPending } = useEstablishmentListQuery({
    page,
  });

  return (
    <div className="flex-1">
      <PageHeader actions={<CreateEstablishmentDialog />}>
        <Trans>establishments</Trans>
      </PageHeader>
      <EstablishmentsTable
        data={establishmentsData?.data?.data}
        isPending={isPending}
      />
      <AppPagination
        pagination={establishmentsData?.data?.pagination}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}
export default EstablishmentsPage;
