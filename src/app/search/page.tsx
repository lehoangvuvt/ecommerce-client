import { ProductService } from "@/services/product.service";
import SearchView from "./view";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) => {
  const foundProducts = await ProductService.searchProducts(searchParams);
  return <SearchView foundProducts={foundProducts}/>;
};

export default Page;
