import { Trans } from "react-i18next";
import PageHeader from "@/components/layouts/dashboard/PageHeader";
import CreateUserDialog from "@/components/users/CreateUserDialog";
import { usePaginationPage } from "@/hooks/use-pagination-page";
import { useUsersListQuery } from "@/queries/users";
import AppPagination from "@/components/common/AppPagination";
import UsersTable from "@/components/users/UsersTable";

function UsersPage() {
  const [page, setPage] = usePaginationPage();

  const {
    data: usersData,
    isPending,
  } = useUsersListQuery({
    page,
  });
  return (
    <div className="flex-1">
      <PageHeader actions={<CreateUserDialog />}>
        <Trans>users</Trans>
      </PageHeader>
      <UsersTable data={usersData?.data?.data} isPending={isPending} />
      <AppPagination
        pagination={usersData?.data?.pagination}
        setPage={setPage}
        page={page}
      />
    </div>
  );
}
export default UsersPage;
