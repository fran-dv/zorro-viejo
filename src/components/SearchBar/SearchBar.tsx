import { Search } from "lucide-react";
import styles from "./SearchBar.module.css";
import { useEffect, useRef, useState } from "react";
import { SearchSuggestions } from "@/components";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { Popover } from "radix-ui";
import { getSlug } from "@/utils";
interface Props {
  placeholder: string;
  autoFocus?: boolean;
}

export const SearchBar = ({ placeholder, autoFocus }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const slug = getSlug(term);
    navigate(Paths.getProductDetailPath(slug));
    inputRef.current!.value = "";
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    inputRef.current?.focus();
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <div className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <form
            onSubmit={handleSubmit}
            id="search-form"
            className={styles.form}
          >
            <Popover.Trigger asChild onClick={(e) => handleClick(e)}>
              <input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                className={styles.input}
                onChange={(e) => setTerm(e.target.value)}
                onFocus={() => setOpen(true)}
                maxLength={60}
              />
            </Popover.Trigger>
          </form>

          <button type="submit" form="search-form" className={styles.button}>
            <Search className={styles.icon} />
          </button>
        </div>

        <Popover.Portal>
          <Popover.Content
            align="start"
            className={styles.content}
            forceMount
            style={{ zIndex: 10000 }}
          >
            <SearchSuggestions
              term={term}
              className={styles.suggestionsContainer}
              emptyElementClassName={styles.noSuggestions}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
