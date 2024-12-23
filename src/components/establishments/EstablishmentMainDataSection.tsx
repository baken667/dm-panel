import { Trans } from "react-i18next";
import PageSection, {
  PageSectionDescription,
  PageSectionHeader,
  PageSectionTitle,
} from "../layouts/dashboard/PageSection";
import { useEstablishment } from "@/context/establishment/establishment-context";
import { useAuth } from "@/context/auth/auth-context";
import { Establishment } from "@/types/establishment-type";
import { User } from "@/types/user-type";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  UpdateEstablishmentSchema,
  UpdateEstablishmentSchemaType,
} from "@/schema/establishment";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import {
  ESTABLISHMENT_KEY,
  useEstablishmentUpdateMutation,
} from "@/queries/establishments";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

function EstablishmentForm({
  establishment,
  user,
}: {
  establishment: Establishment;
  user: User;
}) {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useEstablishmentUpdateMutation();
  const form = useForm({
    resolver: yupResolver(UpdateEstablishmentSchema(user.role)),
    defaultValues: {
      name: establishment.name,
      slug: establishment.slug,
      active_at: establishment.active_at,
    },
  });

  function onSubmit(data: UpdateEstablishmentSchemaType) {
    toast.promise(
      mutateAsync({
        id: establishment.id,
        data,
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: [ESTABLISHMENT_KEY],
        });
      }),
      {
        loading: <Trans>updating</Trans>,
        success: <Trans>establishment_update_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  useEffect(() => {
    form.reset({
      name: establishment.name,
      slug: establishment.slug,
      active_at: establishment.active_at,
    });
  }, [establishment, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>name</Trans>
                </FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            disabled={user.role !== "admin"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <Trans>slug</Trans>
                </FormLabel>
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          {user.role === "admin" && (
            <FormField
              control={form.control}
              name="active_at"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Trans>active_at</Trans>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <Trans>pick_date</Trans>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ?? undefined}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isDirty || isPending}>
            <Trans>save</Trans>
            {isPending && <Loader2 className="ml-2 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}

function EstablishmentMainDataSection() {
  const { establishment } = useEstablishment();
  const { user } = useAuth();
  return (
    <PageSection
      sectionDescription={
        <PageSectionHeader>
          <PageSectionTitle>
            <Trans>establishment_main_data</Trans>
          </PageSectionTitle>
          <PageSectionDescription>
            <Trans>establishment_main_data_description</Trans>
          </PageSectionDescription>
        </PageSectionHeader>
      }
    >
      {establishment && user && (
        <EstablishmentForm establishment={establishment} user={user} />
      )}
    </PageSection>
  );
}
export default EstablishmentMainDataSection;
