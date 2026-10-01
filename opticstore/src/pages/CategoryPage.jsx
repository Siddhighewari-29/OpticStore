import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import ProductList from '../components/ProductList';
import './ListingPage.css';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { products, productsLoading } = useApp();
  const decodedCategory = decodeURIComponent(categoryName);

  const categoryProducts = products.filter((p) => p.category === decodedCategory);

  return (
    <div className="listing-page">
      <div className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>{decodedCategory}</span>
          </div>
          <h1>{decodedCategory}</h1>
          <p>Browse our full range of {decodedCategory.toLowerCase()} — {categoryProducts.length} styles available.</p>
        </div>
      </div>

      <div className="section-tight">
        <div className="container">
          {productsLoading ? (
            <div className="loading-wrap">
              <div className="spinner" />
              <span>Loading products…</span>
            </div>
          ) : (
            <ProductList products={categoryProducts} />
          )}
        </div>
      </div>
    </div>
  );
}
