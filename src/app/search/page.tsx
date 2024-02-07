import { Metadata } from "next";
import SearchView from "./view";
import { monthsInTextShort } from "@/const/others.const";

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
      title = searchParams["c"]
        .split("-")
        .slice(0, -1)
        .reduce(
          (prev, curr) =>
            `${prev.charAt(0).toUpperCase() + prev.substring(1)}${
              curr.charAt(0).toUpperCase() + curr.substring(1)
            } `,
          ""
        )
        .trim();
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

export default async function Page() {
  return <SearchView />;
}
