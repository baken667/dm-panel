import { Trans } from "react-i18next";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useUserQuery, useUserUpdateMutation } from "@/queries/users";
import { User, UserRoles } from "@/types/user-type";
import { UserUpdateSchema, UserUpdateSchemaType } from "@/schema/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { toast } from "sonner";

interface UserFormProps {
  data: User;
  handleSubmit: (data: UserUpdateSchemaType) => void;
  submitting: boolean;
}

function UserForm({ data, handleSubmit, submitting }: UserFormProps) {
  const form = useForm<UserUpdateSchemaType>({
    resolver: yupResolver(UserUpdateSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      role: data.role,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="grid gap-4 pb-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>name</Trans>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>email</Trans>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>role</Trans>
                </FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={<Trans>{field.value}</Trans>} />
                    </SelectTrigger>
                    <SelectContent>
                      {UserRoles.map((role) => (
                        <SelectItem key={role} value={role}>
                          <Trans>{role}</Trans>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          <Button
            type="submit"
            disabled={submitting || !form.formState.isDirty}
          >
            <Trans>save</Trans>
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}

interface Props {
  userId: number;
  open: boolean;
  setOpen: (open: boolean) => void;
}
function EditUserDialog({ userId, open, setOpen }: Props) {
  const { data: userData } = useUserQuery(userId);
  const { mutateAsync, isPending: mutatePending } = useUserUpdateMutation();

  function onSubmit(data: UserUpdateSchemaType) {
    toast.promise(
      mutateAsync({
        id: userId,
        data,
      }).then(() => {
        setOpen(false);
      }),
      {
        loading: <Trans>updating</Trans>,
        success: <Trans>user_updated_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>edit_user</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>edit_user_description</Trans>
          </DialogDescription>
        </DialogHeader>
        {userData?.data.data && (
          <UserForm
            data={userData.data.data}
            handleSubmit={onSubmit}
            submitting={mutatePending}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
export default EditUserDialog;
