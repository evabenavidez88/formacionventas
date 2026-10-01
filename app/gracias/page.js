import GraciasCliente from './GraciasCliente';
import { enPromo } from '../config/entrenamiento';

export const dynamic = 'force-dynamic';

export default function GraciasPage() {
  return <GraciasCliente conDescuento={enPromo()} />;
}
