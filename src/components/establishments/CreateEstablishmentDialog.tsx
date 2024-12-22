import { useState } from "react";
import { toast } from "sonner";
import { Trans } from "react-i18next";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import {
  ESTABLISHMENTS_KEY,
  useEstablishmentCreateMutation,
} from "@/queries/establishments";
import {
  CreateEstablishmentSchema,
  CreateEstablishmentSchemaType,
} from "@/schema/establishment";
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
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

function CreateEstablishmentDialog() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = useEstablishmentCreateMutation();

  const form = useForm<CreateEstablishmentSchemaType>({
    resolver: yupResolver(CreateEstablishmentSchema),
    defaultValues: {
      name: "",
      slug: "",
      active: false,
    },
  });

  function onSubmit(data: CreateEstablishmentSchemaType) {
    toast.promise(
      mutateAsync(data).then(() => {
        setOpen(false);
        queryClient.invalidateQueries({
          queryKey: ESTABLISHMENTS_KEY,
        });
        form.reset();
      }),
      {
        loading: <Trans>loading</Trans>,
        success: <Trans>establishment_created_successfully</Trans>,
        error: <Trans>error</Trans>,
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Trans>add_establishment</Trans>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Trans>add_establishment</Trans>
          </DialogTitle>
          <DialogDescription>
            <Trans>add_establishment_description</Trans>
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
                    <FormLabel>
                      <Trans>name</Trans>
                    </FormLabel>
                    <Input required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Trans>slug</Trans>
                    </FormLabel>
                    <Input required {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel>
                        <Trans>{field.value ? "active" : "inactive"}</Trans>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                <Trans>add_establishment</Trans>
                {isPending && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEstablishmentDialog;
