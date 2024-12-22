import { Trans } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { USERS_KEY, useUserDeleteMutation } from "@/queries/users";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  userId: number;
  setOpen: (open: boolean) => void;
}

function UserDeleteAlert({ open, setOpen, userId }: Props) {
  const { mutateAsync, isPending } = useUserDeleteMutation();
  const queryClient = useQueryClient();

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    toast.promise(
      mutateAsync(userId).then(() => {
        queryClient.invalidateQueries({
          queryKey: USERS_KEY,
        });
      }),
      {
        loading: <Trans>deleting</Trans>,
        success: <Trans>user_delete_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans>user_delete</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>user_delete_description</Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>
            <Trans>cancel</Trans>
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            <Trans>delete</Trans>
            {isPending && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default UserDeleteAlert;
