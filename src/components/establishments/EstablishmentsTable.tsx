import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Trans } from "react-i18next";
import { Establishment } from "@/types/establishment-type";
import DataTable from "../common/DataTable";
import { Edit2 } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "../ui/button";

interface EditDropdownProps {
  establishment: Establishment;
}

function Actions({ establishment }: EditDropdownProps) {
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="icon" asChild>
        <NavLink to={`/establishments/${establishment.id}`}>
          <Edit2 />
        </NavLink>
      </Button>
    </div>
  );
}

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
    {
      id: "actions",
      enableHiding: true,
      cell: ({ row }) => <Actions establishment={row.original} />,
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
