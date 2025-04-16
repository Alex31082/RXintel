import React from 'react';
import './products.css';

const DealsSection = () => {
  const deals = [
    { 
      id: 1, 
      title: 'SANDA+SOAP', 
      description: 'Apollo Essentials Sandal Soap', 
      weight: '250 gm (2×125 gm)', 
      price: 100, 
      mrp: 160, 
      discount: '38% off',
      image: 'sandal-soap-combo.jpg'
    },
    // Add more combo deals here
  ];

  return (
    <div className="deals-section">
      <h2 className="section-title">Special Combos</h2>
      <div className="deals-grid">
        {deals.map(deal => (
          <div key={deal.id} className="deal-card">
            <div className="deal-badge">{deal.title}</div>
            <div className="deal-image">
              <img src={`/images/${deal.image}`} alt={deal.description} />
            </div>
            <div className="deal-details">
              <h3>{deal.description}</h3>
              <p className="deal-weight">{deal.weight}</p>
              <div className="deal-price">
                <span className="current-price">₹{deal.price}</span>
                <span className="original-price">M.R.P: ₹{deal.mrp}</span>
                <span className="discount">{deal.discount}</span>
              </div>
              <button className="add-to-cart-btn">ADD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;