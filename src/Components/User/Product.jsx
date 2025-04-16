import React from 'react';
import './products.css';

const Products = ({ activeMenu, activeFilter }) => {
  // Value deals products data
  const valueDeals = [
    { 
      id: 1, 
      name: 'Apollo Pharmacy Activated Charcoal Soap', 
      weight: '250 gm', 
      price: 100, 
      mrp: 160, 
      discount: '38% off',
      image: 'charcoal-soap.jpg' 
    },
    { 
      id: 2, 
      name: 'Apollo Essentials Aqua Blue Hand Wash', 
      weight: '500 ml (2×250 ml)', 
      price: 100, 
      mrp: 160, 
      discount: '38% off',
      image: 'hand-wash.jpg' 
    },
    { 
      id: 3, 
      name: 'Apollo Essentials Refreshing Body Wash', 
      weight: '400 ml', 
      price: 125, 
      mrp: 160, 
      discount: '38% off',
      image: 'body-wash.jpg' 
    },
    { 
      id: 4, 
      name: 'Apollo Life Premium Citrus Refreshing Wet Wipes', 
      weight: '60 count', 
      price: 100, 
      mrp: 160, 
      discount: '38% off',
      image: 'wet-wipes.jpg' 
    },
    { 
      id: 5, 
      name: 'Apollo Life Aloe Vera Skin Care Gel', 
      weight: '200 gm (2×100 gm)', 
      price: 100, 
      mrp: 160, 
      discount: '80% off',
      image: 'aloe-gel.jpg' 
    },
    { 
      id: 6, 
      name: 'Apollo Essentials Sandal Soap', 
      weight: '250 gm (2×125 gm)', 
      price: 100, 
      mrp: 160, 
      discount: '38% off',
      image: 'sandal-soap.jpg' 
    }
  ];

  return (
    <div className="products-container">
      <h2 className="section-title">Value Deals at Rs 100</h2>
      <div className="products-grid">
        {valueDeals.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img src={`/images/${product.image}`} alt={product.name} />
            </div>
            <div className="product-details">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-weight">{product.weight}</p>
              <div className="price-section">
                <span className="current-price">₹{product.price}</span>
                <span className="original-price">M.R.P: ₹{product.mrp}</span>
                <span className="discount">{product.discount}</span>
              </div>
              <button className="add-to-cart-btn">ADD</button>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-btn">View All</button>
    </div>
  );
};

export default Products;