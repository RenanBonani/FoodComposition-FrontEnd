import { useState } from "react";

export function Header() {
  const [isLoading, setIsLoading] = useState(false);

  function handleWebScrapping() {
    var url = "https://localhost:7122/api/webScrapping";
    setIsLoading(true);

    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro na requisição!");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Erro ao fazer a requisição:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="flex items-center py-2">
      <button
        onClick={handleWebScrapping}
        disabled={isLoading}
        className="border-2 border-white/15 py-3 px-5 font-semibold rounded-md"
      >
        WebScrapping
      </button>
    </div>
  );
}
