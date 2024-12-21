import { Trans } from "react-i18next";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

function UserDeleteAlert() {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <Trans>user_delete</Trans>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Trans>user_delete_description</Trans>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default UserDeleteAlert;
