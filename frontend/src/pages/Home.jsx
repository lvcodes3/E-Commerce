import { CategoryItem } from "../components/CategoryItem.jsx";

const Home = () => {
  const categories = [
    { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
    { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
    { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
    { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
    { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
    { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
    { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
  ];

  return (
    <div className="min-h-screen relative text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <h1 className="mb-4 text-5xl sm:text-6xl text-center text-emerald-400 font-bold">
          Explore Our Categories
        </h1>

        <p className="mb-12 text-xl text-center text-gray-300">
          Discover the latest trends in eco-friendly fashion!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <CategoryItem key={category.name} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
