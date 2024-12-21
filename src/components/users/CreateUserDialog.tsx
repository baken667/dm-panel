import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserCreateSchema, UserCreateSchemaType } from "@/schema/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trans } from "react-i18next";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { UserRoles } from "@/types/user-type";
import { USERS_KEY, useUserCreateMutation } from "@/queries/users";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

function CreateUserDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useUserCreateMutation();
  const form = useForm<UserCreateSchemaType>({
    resolver: yupResolver(UserCreateSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "owner",
    },
  });

  function onSubmit(data: UserCreateSchemaType) {
    toast.promise(
      mutateAsync(data).then(() => {
        queryClient.invalidateQueries({
          queryKey: USERS_KEY,
        });
        setOpen(false);
        form.reset();
      }),
      {
        loading: <Trans>creating</Trans>,
        success: <Trans>user_created_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Trans>add_user</Trans>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>add_user</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>add_user_description</Trans>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="new-username">
                      <Trans>username</Trans>
                    </FormLabel>
                    <Input id="new-username" required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="new-user-email">
                      <Trans>email</Trans>
                    </FormLabel>
                    <Input
                      id="new-user-email"
                      required
                      type="email"
                      {...field}
                    />
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
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={<Trans>select_role</Trans>} />
                      </SelectTrigger>

                      <SelectContent id="new-user-role">
                        {UserRoles.map((role) => (
                          <SelectItem key={role} value={role}>
                            <Trans>{role}</Trans>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid ||
                  !form.formState.isDirty ||
                  isPending
                }
              >
                <Trans>add_user</Trans>
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateUserDialog;
