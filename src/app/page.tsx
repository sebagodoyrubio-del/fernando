import { CatalogPage } from "@/components/CatalogPage";
import { horses } from "@/data/horses";

export default function Home() {
  return <CatalogPage horses={horses} />;
}
