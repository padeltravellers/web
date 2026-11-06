import LegalLayout from "@/components/LegalLayout";
import { condicionesHtml } from "@/data/condiciones";
import { legalCompany } from "@/data/legal";

export const metadata = {
  title: "Condiciones de contratación",
  description: "Condiciones del viaje que aceptas al reservar tu plaza en un viaje de Padel Travellers.",
};

export default function CondicionesPage() {
  return (
    <LegalLayout kicker="Legal" title="Condiciones de contratación">
      <p>
        Estas son las condiciones que aceptas al reservar tu plaza. El servicio lo presta{" "}
        <strong>{legalCompany.name}</strong> ({legalCompany.brand}), EIN {legalCompany.ein}, {legalCompany.address}. Tus datos,
        la salida elegida y el desglose del precio figuran en el Anexo I que recibes por email al reservar.
      </p>
      <div dangerouslySetInnerHTML={{ __html: condicionesHtml }} />
    </LegalLayout>
  );
}
