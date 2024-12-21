import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink } from "react-router";
import { Trans } from "react-i18next";
import { Loader2 } from "lucide-react";
import { AuthLoginSchema, AuthLoginSchemaType } from "@/schema/auth";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthLoginMutate } from "@/queries/auth";

function LoginPage() {
  const { mutateAsync: login, isPending } = useAuthLoginMutate();

  const form = useForm({
    resolver: yupResolver(AuthLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: AuthLoginSchemaType) => {
    login(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 max-w-80"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            <Trans>login</Trans>
          </h1>
          <p className="text-ballance text-sm text-muted-foreground">
            <Trans>login_description</Trans>
          </p>
        </div>
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>email</Trans>
                </FormLabel>
                <Input type="email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>password</Trans>
                </FormLabel>
                <Input type="password" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-6">
          <Button disabled={isPending} type="submit">
            <Trans>login</Trans>
            {isPending && <Loader2 className="animate-spin" />}
          </Button>
          <div className="text-center">
            <Button asChild variant="link" size="sm">
              <NavLink to="/forgot">
                <Trans>forgot_password</Trans>
              </NavLink>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
export default LoginPage;
