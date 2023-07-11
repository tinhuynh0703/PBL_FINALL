import { useEffect, useState } from 'react';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import './Product.scss';
import ListDrinkItem from '../../components/ListDrinkItem/ListDrinkItem';
import { useAppDispatch } from '../../../../storage/hooks';
import { useSelector } from 'react-redux';
import { getAllCategory, selectCategoryState } from '../../actions/getCategoryData';
import { getProductsByCategory, selectProductState } from '../../actions/getProductData';

const ProductPage = () => {
  const [categoryId, setCategoryId] = useState('');
  const dispatch = useAppDispatch();
  const categories = useSelector(selectCategoryState);
  const dataProduct = useSelector(selectProductState);
  console.log(dataProduct);

  useEffect(() => {
    async function fetchCategories() {
      const categoriesData = await dispatch(getAllCategory()).unwrap();
      if (categoriesData.length > 0) {
        const id = categoriesData[0].id;
        handleGetProductsByCategory(id);
      }
    }
    fetchCategories();
  }, []);

  const handleGetProductsByCategory = async (id: string) => {
    if (categoryId !== id) {
      setCategoryId(id);
      await dispatch(getProductsByCategory(id));
    }
  };

  const listProducts = dataProduct.products;

  return (
    <div className="product">
      <div className="product-left">
        <CategoryBar
          categoryId={categoryId}
          onGetIdHandler={(categoryId: string) => handleGetProductsByCategory(categoryId)}
          listCategory={categories.categories}
        />
      </div>
      <div className="product-right">
        <ListDrinkItem categoryId={categoryId} listDrink={listProducts} />
      </div>
    </div>
  );
};

export default ProductPage;
