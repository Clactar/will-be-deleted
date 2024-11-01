import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className='h-full w-full flex flex-col items-center justify-center gap-6 px-4'>
      {/* Nombre 404 stylisé */}
      <h1 className='text-8xl font-bold text-primary'>404</h1>

      {/* Message principal avec une touche d'humour */}
      <h2 className='text-2xl font-semibold text-center'>
        Cette page semble avoir manqué son cours
      </h2>

      {/* Sous-titre humoristique */}
      <p className='text-muted-foreground text-center max-w-md'>
        Même nos meilleurs professeurs n&apos;arrivent pas à retrouver cette
        page. Elle a dû sécher les cours !
      </p>

      {/* Bouton de retour stylisé */}
      <Link href='/'>
        <Button variant='outline' className='gap-2'>
          <ArrowLeft className='h-4 w-4' />
          Retour à l&apos;accueil
        </Button>
      </Link>
    </div>
  );
}
