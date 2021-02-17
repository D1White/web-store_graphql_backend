import { ProductModel } from "../models/ProductModel";
import { CategoryModel } from "../models/CategoryModel";

const productResolvers = {
  Query: {
    products: (_, { filter, orderBy, priceRange, limit }) => {
      let filterQuery = {};

      for (const key in filter) {
        if (
          key === "name" ||
          key === "full_name" ||
          key === "price" ||
          key === "category"
        ) {
          filterQuery[key] = filter[key];
        } else if (key === "design") {
          filterQuery["design.name"] = filter[key];
        } else {
          filterQuery[`info.${key}`] = filter[key];
        }
      }

      if (priceRange && priceRange.from >= 0 && priceRange.to) {
        filterQuery["price"] = {
          $gte: priceRange.from,
          $lte: priceRange.to,
        };
      }

      return ProductModel.find(filterQuery, null, {
        sort: orderBy,
        limit: limit,
      });
    },
    product: (_, { id }) => {
      return ProductModel.findById(id)
    }
  },
  Mutation: {
    product: () => ({}),
  },
  ProductMutations: {
    create: async(_, { product }) => {
      // console.log(arg);
      if (product.category) {
        const category = await CategoryModel.findById(product.category).exec();

        if (!category) {
          throw new TypeError(`Сategory with such id does not exist: ${product.category}`);
        }
      }

      const info = {...product.info}

      const data = {...product, info}

      console.log(data);

      const newProduct = await ProductModel.create(data);

      return newProduct;
    },
  },
};

export default productResolvers;
