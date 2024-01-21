import { Metadata } from "next";
import SearchView from "./view";
import { monthsInTextShort } from "@/const/others.const";
import { CategoryService } from "@/services/category.service";

type Props = {
  searchParams: { [key: string]: string };
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let title = "";

  if (searchParams["keyword"]) {
    title = searchParams["keyword"];
  } else {
    if (searchParams["c"]) {
      const response = await CategoryService.getCategoryDetailsBySlug(
        searchParams["c"]
      );
      if (response) title = response["category_name"];
    }
  }

  const currentDT = new Date();
  const monthYearStr = `${
    monthsInTextShort[currentDT.getMonth()]
  } ${currentDT.getFullYear()}`;
  return {
    title: `${title} - Best deals for ${monthYearStr}`,
    description: `${title} - Best deals for ${monthYearStr}`,
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return <SearchView searchParams={searchParams} />;
}
