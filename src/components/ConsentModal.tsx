import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConsentModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onReject: () => void;
  language: 'en' | 'es' | 'pt';
}

const translations = {
  en: {
    title: "Flexible Match",
    description: "This is a flexible match for one or more players. Do you want to proceed?",
    confirm: "Confirm",
    respin: "Re-spin"
  },
  es: {
    title: "Emparejamiento Flexible",
    description: "Este es un emparejamiento flexible para uno o más jugadores. ¿Quieres continuar?",
    confirm: "Confirmar",
    respin: "Volver a girar"
  },
  pt: {
    title: "Combinação Flexível",
    description: "Esta é uma combinação flexível para um ou mais jogadores. Quer continuar?",
    confirm: "Confirmar",
    respin: "Girar novamente"
  }
};

export default function ConsentModal({ isOpen, onConfirm, onReject, language }: ConsentModalProps) {
  const t = translations[language];
  
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">{t.title}</DialogTitle>
          <DialogDescription className="text-center">
            {t.description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-center space-x-4">
          <Button onClick={onConfirm} className="btn-romantic">
            {t.confirm}
          </Button>
          <Button onClick={onReject} variant="outline">
            {t.respin}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}