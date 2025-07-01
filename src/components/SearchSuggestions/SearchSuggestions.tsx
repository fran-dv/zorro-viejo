import { useSearchSuggestions } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";

interface Props {
  term: string;
  className?: string; // fully styleable to adapt to any search component
  emptyElementClassName?: string;
}

export const SearchSuggestions = ({
  term,
  className = "",
  emptyElementClassName = "",
}: Props) => {
  const { data, error, isFetching } = useSearchSuggestions({ term, limit: 5 });
  const navigate = useNavigate();

  if (!term || term === "") return null;

  if (isFetching) {
    return (
      <ul className={className}>
        <li className={emptyElementClassName}>Cargando...</li>
      </ul>
    );
  }

  if (!data || data.length === 0) {
    return (
      <ul className={className}>
        <li className={emptyElementClassName}>
          No tenemos productos con el nombre {term}
        </li>
      </ul>
    );
  }

  if (error) {
    throw new Error(`Error fetching search suggestions: ${error.message}`);
  }

  const handleClick = (slug: string) => {
    navigate(Paths.getProductDetailPath(slug));
  };

  return (
    <ul className={className}>
      {data.map((suggestion) => (
        <li key={suggestion.id} onClick={() => handleClick(suggestion.slug)}>
          {suggestion.name}
        </li>
      ))}
    </ul>
  );
};
