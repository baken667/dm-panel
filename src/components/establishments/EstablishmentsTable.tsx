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
import { Badge } from "../ui/badge";
import datetimeDisplay from "@/lib/datetime-display";

interface EditDropdownProps {
  establishment: Establishment;
}

function Actions({ establishment }: EditDropdownProps) {
  return (
    <div className="flex justify-end">
      <Button variant="ghost" size="icon" asChild>
        <NavLink to={`/establishments/${establishment.id}/main`}>
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
      accessorKey: "active",
      header: () => <Trans>status</Trans>,
      cell: ({ row }) => (
        <Badge
          variant={row.original.active ? "default" : "destructive"}
          className="text-center"
        >
          <Trans>{row.original.active ? "active" : "inactive"}</Trans>
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: () => <Trans>created_at</Trans>,
      cell: ({ row }) => datetimeDisplay(row.original.created_at),
    },
    {
      accessorKey: "updated_at",
      header: () => <Trans>updated_at</Trans>,
      cell: ({ row }) => datetimeDisplay(row.original.updated_at),
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
