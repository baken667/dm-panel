import EstablishmentMainDataSection from "@/components/establishments/EstablishmentMainDataSection";
import EstablishmentLogoSection from "@/components/establishments/EstablishmentLogoSection";

function EstablishmentPage() {
  return (
    <div className="flex flex-col gap-10">
      <EstablishmentLogoSection />
      <EstablishmentMainDataSection />
    </div>
  );
}
export default EstablishmentPage;
