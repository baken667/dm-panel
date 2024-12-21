import { PropsWithChildren, ReactNode } from "react";

interface Props extends PropsWithChildren {
  sectionDescription?: ReactNode;
}

export function PageSectionHeader({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-2">{children}</div>;
}

export function PageSectionTitle({ children }: PropsWithChildren) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

export function PageSectionDescription({ children }: PropsWithChildren) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

function PageSection({ children, sectionDescription }: Props) {
  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div>{sectionDescription}</div>
      <div>{children}</div>
    </section>
  );
}
export default PageSection;
