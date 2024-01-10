type TBase = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type TProductImage = {
  image_url: string;
  image_type: string;
  product_id: string;
} & TBase;

export type TVariance = {
  [key: string]: {
    [key: string]: {
      qty: number;
      price: number;
      imageURL: string;
    };
  };
};

export type TProductDetails = {
  product_name: string;
  description: string;
  brand_id: string;
  category_id: string;
  attribute_set_id: string;
  slug: string;
  brand: {
    id: string;
    createdAt: string;
    updatedAt: string;
    brand_name: string;
  };
  images: TProductImage[];
  attributeSet: {
    attributeSetValueMappings: [
      {
        attribute_set_id: string;
        attribute_value_id: string;
        attributeValue: {
          attribute_id: string;
          value_decimal: number | null;
          value_int: number | null;
          value_string: string | null;
          attribute: {
            attribute_name: string;
            value_type: number;
            is_primary: boolean;
          } & TBase;
        } & TBase;
      } & TBase
    ];
  } & TBase;
  product_variance: TVariance;
  category_path: { name: string; id: string; slug: string }[];
} & TBase;

export type TProducItem = {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  description: string;
  brand_id: string;
  category_id: string;
  attribute_set_id: string;
  slug: string;
  price_lowest: number;
  price_highest: number;
  product_images: string[];
} & TBase;
