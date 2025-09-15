function CategoryBadge({ category }: { category: string }) {
  return <p className="bg-green-50 text-green-700 text-xs font-medium me-2 px-2.5 py-1 rounded-md ring-1 ring-inset ring-green-600/20 self-start">{category}</p>;
}

export default CategoryBadge;
