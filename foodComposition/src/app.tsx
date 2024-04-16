import { FoodCompositionList } from "./components/foodComposition-list";
import { Header } from "./components/header";

export function App() {
  return (
    <div className="max-w-[1720px] mx-auto py-5 flex flex-col gap-5">
      <Header />
      <FoodCompositionList />
    </div>
  );
}
