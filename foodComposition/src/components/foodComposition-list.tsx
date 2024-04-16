import { useState, useEffect, ChangeEvent } from "react";
import { Table } from "./table/table";
import { TableCell } from "./table/table-cell";
import { TableHeader } from "./table/table-header";
import { TableRow } from "./table/table-row";
import { Search } from "lucide-react";

interface FoodComposition {
  id: string;
  code: string;
  nameFood: string;
  scientificName: string;
  groupFood: string;
  componentes: string[];
}

export function FoodCompositionList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());

    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }

    return "";
  });

  const [total, setTotal] = useState(0);
  const [foodCompositions, setFoodCompositions] = useState<FoodComposition[]>(
    []
  );

  useEffect(() => {
    var url = `https://localhost:7122/api/foodcomposition/${search}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFoodCompositions(data);
        setTotal(data.total);
      });
  }, [search]);

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center">
        <h1 className="text-2xl font-bold">Composição de alimentos</h1>
        <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
          <Search className="size-4 text-emerald-300" />
          <input
            className="bg-transparent focus:ring-0 flex-1 outline-none border-0 p-0 text-sm"
            placeholder="Buscar nome do alimento..."
            value={search}
            onChange={onSearchInputChanged}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader>Código</TableHeader>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Nome Científico</TableHeader>
            <TableHeader>Grupo</TableHeader>
            <TableHeader>Componentes</TableHeader>
          </tr>
        </thead>

        <tbody>
          {foodCompositions.map((foodComposition) => (
            <TableRow key={foodComposition.id}>
              <TableCell>{foodComposition.code}</TableCell>
              <TableCell>{foodComposition.nameFood}</TableCell>
              <TableCell>{foodComposition.scientificName}</TableCell>
              <TableCell>{foodComposition.groupFood}</TableCell>
              <TableCell>{foodComposition.componentes.join(", ")}</TableCell>
            </TableRow>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {foodCompositions.length} de {total} itens
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  );
}
