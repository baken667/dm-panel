import { Trans } from "react-i18next";
import { useState } from "react";
import { Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { User } from "@/types/user-type";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import datetimeDisplay from "@/lib/datetime-display";
import DataTable from "../common/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import EditUserDialog from "./EditUserDialog";
import { Badge } from "../ui/badge";

interface EditDropdownProps {
  user: User;
}

function EditDropdown({ user }: EditDropdownProps) {
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  function handleSelect(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <div className="flex justify-end">
      <EditUserDialog userId={user.id} open={openEdit} setOpen={setOpenEdit} />
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-40" align="end">
          <DropdownMenuItem
            onClick={() => handleSelect(() => setOpenEdit(true))}
          >
            <Edit2 />
            <Trans>edit</Trans>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash2 />
            <Trans>delete</Trans>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

interface Props {
  data?: User[];
  isPending?: boolean;
}

function UsersTable({ data = [], isPending }: Props) {
  const columns: ColumnDef<User>[] = [
    {
      id: "user",
      header: () => <Trans>user</Trans>,
      cell: ({ row }) => (
        <div className="grid">
          <p className="font-semibold">{row.original.name}</p>
          <p className="text-muted-foreground text-sm">{row.original.email}</p>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <Trans>role</Trans>,
      cell: ({ row }) => (
        <Badge variant="outline" className="text-center">
          <Trans>{row.original.role}</Trans>
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
      cell: ({ row }) => <EditDropdown user={row.original} />,
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return <DataTable table={table} isPending={isPending} />;
}

export default UsersTable;
