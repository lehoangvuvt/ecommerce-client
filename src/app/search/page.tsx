import { ProductService } from "@/services/product.service";
import SearchView from "./view";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const [result, searchFilters] = await Promise.all([
    ProductService.searchProducts(searchParams),
    ProductService.getSearchFilters(searchParams),
  ]);
  return <SearchView result={result} searchFilters={searchFilters} />;
};

export default Page;
