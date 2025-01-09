import { Link } from "react-router-dom";

export const CategoryItem = ({ category }) => {
  return (
    <div className="w-full h-96 relative overflow-hidden rounded-lg group">
      <Link to={`category${category.href}`}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent to-gray-900 opacity-50" />

          <img
            src={category.imageUrl}
            alt={category.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          <div className="p-4 absolute left-0 right-0 bottom-0 z-20">
            <h3 className="mb-2 text-2xl text-white font-bold">
              {category.name}
            </h3>
            <p className="text-sm text-gray-200">Explore {category.name}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
