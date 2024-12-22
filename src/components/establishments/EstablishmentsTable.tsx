import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { Establishment } from "@/types/establishment-type";
import DataTable from "../common/DataTable";

interface Props {
  data?: Establishment[];
  isPending?: boolean;
}

function EstablishmentsTable({ data = [], isPending }: Props) {
  const columns: ColumnDef<Establishment>[] = [
    {
      id: "establishment",
      header: () => <Trans>establishment</Trans>,
      cell: ({ row }) => (
        <div className="grid">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.slug}</p>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} isPending={isPending} />;
}
export default EstablishmentsTable;
