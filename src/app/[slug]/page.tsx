import { ProductService } from "@/services/product.service";
import ProductView from "./view";
import { TAttribute } from "./components/variancesDesktop";
import { Metadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const productName = params.slug
    .split("-")
    .slice(0, -1)
    .reduce(
      (prev, curr) =>
        `${prev.charAt(0).toUpperCase() + prev.substring(1)}${
          curr.charAt(0).toUpperCase() + curr.substring(1)
        } `,
      ""
    );
  return {
    title: productName.trim(),
    description: productName.trim(),
  };
}

const Page = async ({ params }: { params: { slug: string } }) => {
  const [similarProducts, productDetails] = await Promise.all([
    ProductService.getSimilarProducts(params.slug),
    ProductService.getProductDetails(params.slug),
  ]);

  if (!productDetails) return <div>Not Found</div>;

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
    />
  );
};

export default Page;
