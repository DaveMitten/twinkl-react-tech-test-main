import { Input } from "@/components/ui/input";

const SearchBar = ({
  filterPosts,
}: {
  filterPosts: (title: string) => Promise<void>;
}) => {
  function debouncer(func: Function, delay: number) {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  return (
    <div className="w-full md:w-1/2 px-3">
      <Input
        placeholder="Enter title search"
        className="w-full bg-gray-200"
        onChange={(e) => debouncer(filterPosts, 1000)(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
