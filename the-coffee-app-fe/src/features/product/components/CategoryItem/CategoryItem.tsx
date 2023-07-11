import Category from '../../../../interfaces/category';

type Props = {
  item: Category;
};

function CategoryItem(props: Props) {
  return (
    <div>
      <p>{props.item.name}</p>
    </div>
  );
}

export default CategoryItem;
