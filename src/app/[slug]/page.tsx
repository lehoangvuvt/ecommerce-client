import { ProductService } from "@/services/product.service";
import ProductView from "./productView";
import { TAttribute } from "./components/variancesDesktop";
import { Metadata } from "next";
import SearchView from "../search/view";
import StoreView from "./storeView";
import { StoreService } from "@/services/store.service";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const wordsSplitArr = params.slug.split(".")[0].split("-");
  const slugTypeSuffix = wordsSplitArr[wordsSplitArr.length - 1];
  let title = params.slug.trim() + ", Online Shop | Ecommerce";
  if (slugTypeSuffix === "i" || slugTypeSuffix === "cate") {
    title = params.slug
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
  return {
    title,
    description: title,
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const wordsSplitArr = params.slug.split(".")[0].split("-");
  const slugTypeSuffix = wordsSplitArr[wordsSplitArr.length - 1];

  const renderProduct = async () => {
    const [similarProducts, productDetails] = await Promise.all([
      ProductService.getSimilarProducts(params.slug),
      ProductService.getProductDetails(params.slug),
    ]);

    if (!productDetails) return <div>Not Found</div>;

    const [productReviews, storeOverview] = await Promise.all([
      ProductService.getProductReviews(productDetails.id, 0),
      StoreService.getStoreOverview(productDetails.store_id),
    ]);

    const variances = productDetails.product_variance;
    const attributes: TAttribute = {
      mainAttribute: { name: "", values: [] },
      subAttribute: { name: "", values: [] },
    };
    for (var key in variances) {
      const mainAttributeValue = key.split(":")[0];
      const mainAttributeName = key.split(":")[1];
      attributes.mainAttribute.name = mainAttributeName;

      let imgUrl = "";

      for (var subKey in variances[key]) {
        const subAttributeValue = subKey.split(":")[0];
        const subAttributeName = subKey.split(":")[1];
        if (attributes.subAttribute.name === "") {
          attributes.subAttribute.name = subAttributeName;
        }
        if (!attributes.subAttribute.values.includes(subAttributeValue)) {
          attributes.subAttribute.values.push(subAttributeValue);
        }
        if (imgUrl === "") {
          imgUrl = variances[key][subKey].imageURL;
        }
      }

      attributes.mainAttribute.values.push({
        value: mainAttributeValue,
        imgURL: imgUrl,
      });
    }

    return (
      <ProductView
        attributes={attributes}
        details={productDetails}
        similarProducts={similarProducts}
        storeOverview={storeOverview}
        productReviews={productReviews}
      />
    );
  };

  const renderStore = async () => {
    const storeDetails = await StoreService.getStoreDetails(params.slug);
    if (!storeDetails) return <h1>Not found</h1>;
    return <StoreView details={storeDetails} />;
  };

  if (slugTypeSuffix === "i") return renderProduct();
  if (slugTypeSuffix === "cat") {
    return <SearchView searchParams={{ c: params.slug }} />;
  }
  return renderStore();
};

export default Page;
