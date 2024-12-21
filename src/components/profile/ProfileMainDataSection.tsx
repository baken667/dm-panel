import { Trans } from "react-i18next";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "@/components/layouts/dashboard/PageSection";
import { ProfileUpdateSchema, ProfileUpdateSchemaType } from "@/schema/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth/auth-context";
import { useEffect } from "react";
import { useUserUpdateMutation } from "@/queries/users";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { AUTH_ME_KEY } from "@/queries/auth";
import { Loader2 } from "lucide-react";

function ProfileMainDataSection() {
  const { user, userPending } = useAuth();
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useUserUpdateMutation();

  const form = useForm<ProfileUpdateSchemaType>({
    resolver: yupResolver(ProfileUpdateSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: ProfileUpdateSchemaType) {
    toast.promise(
      mutateAsync({
        id: user!.id,
        data,
      }).then((data) => {
        form.reset(data.data.data);
        queryClient.setQueryData(AUTH_ME_KEY, data);
      }),
      {
        loading: <Trans>updating</Trans>,
        success: <Trans>updated</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  useEffect(() => {
    if (user && !userPending) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, userPending, form]);
  return (
    <PageSection
      sectionDescription={
        <PageSectionHeader>
          <PageSectionTitle>
            <Trans>your_main_data</Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>your_main_data_description</Trans>
          </PageSectionDescription>
        </PageSectionHeader>
      }
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>email</Trans>
                  </FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      type="email"
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>username</Trans>
                  </FormLabel>
                  <FormControl>
                    <Input autoComplete="off" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!form.formState.isDirty}>
              <Trans>save</Trans>
              {isPending && <Loader2 className="animate-spin" />}
            </Button>
          </div>
        </form>
      </Form>
    </PageSection>
  );
}
export default ProfileMainDataSection;
