import { HeroSection, CategoryGrid, FeaturedProducts, TrustBadges } from '../components/HomeComponents.jsx';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustBadges />
    </div>
  );
}