import React, { useState } from 'react';
import { Star, ThumbsUp, MessageCircle, Flag, Search, Filter, ChevronDown } from 'lucide-react';

const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState('product');
  const [selectedRating, setSelectedRating] = useState('all');

  // Sample review data
  const reviews = [
    {
      id: 1,
      username: "Sarah M.",
      rating: 5,
      date: "Feb 10, 2025",
      content: "Excellent product quality and fast shipping. The seller was very responsive to my questions.",
      productName: "Wireless Headphones",
      seller: "TechHub Store",
      helpful: 24,
      replies: 3,
      verified: true
    },
    {
      id: 2,
      username: "John D.",
      rating: 4,
      date: "Feb 9, 2025",
      content: "Good product overall, but the delivery took a bit longer than expected. Still, the seller kept me updated throughout.",
      productName: "Smart Watch Pro",
      seller: "Electronics Plus",
      helpful: 15,
      replies: 1,
      verified: true
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            style={{
              fill: index < rating ? '#fbbf24' : 'none',
              stroke: '#fbbf24',
              marginRight: '2px'
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '24px'
      }}>
        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>Reviews & Ratings</h1>
          <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            <button
              onClick={() => setActiveTab('product')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                backgroundColor: activeTab === 'product' ? '#3b82f6' : 'transparent',
                color: activeTab === 'product' ? 'white' : 'black',
                border: activeTab === 'product' ? 'none' : '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Product Reviews
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              style={{
                padding: '8px 16px',
                borderRadius: '6px',
                backgroundColor: activeTab === 'seller' ? '#3b82f6' : 'transparent',
                color: activeTab === 'seller' ? 'white' : 'black',
                border: activeTab === 'seller' ? 'none' : '1px solid #e5e7eb',
                cursor: 'pointer'
              }}
            >
              Seller Ratings
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          padding: '16px',
          backgroundColor: '#f9fafb',
          borderRadius: '8px',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9ca3af'
            }} />
            <input
              type="text"
              placeholder="Search reviews..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 40px',
                border: '1px solid #e5e7eb',
                borderRadius: '6px'
              }}
            />
          </div>
          
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select
            style={{
              padding: '8px 12px',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              backgroundColor: 'white'
            }}
          >
            <option>Most Recent</option>
            <option>Highest Rated</option>
            <option>Lowest Rated</option>
            <option>Most Helpful</option>
          </select>
        </div>

        {/* Reviews List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                padding: '20px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '500' }}>{review.username}</span>
                    {review.verified && (
                      <span style={{
                        backgroundColor: '#dcfce7',
                        color: '#166534',
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '12px'
                      }}>
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StarRating rating={review.rating} />
                    <span style={{ color: '#6b7280', fontSize: '14px' }}>{review.date}</span>
                  </div>
                </div>
                <button style={{
                  padding: '4px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '4px',
                  backgroundColor: 'white'
                }}>
                  <Flag size={16} />
                </button>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontWeight: '500', marginBottom: '4px' }}>{review.productName}</div>
                <div style={{ color: '#6b7280', fontSize: '14px' }}>Sold by: {review.seller}</div>
              </div>

              <p style={{ marginBottom: '16px', lineHeight: '1.5' }}>{review.content}</p>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  backgroundColor: 'white'
                }}>
                  <ThumbsUp size={16} />
                  <span>Helpful ({review.helpful})</span>
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  backgroundColor: 'white'
                }}>
                  <MessageCircle size={16} />
                  <span>Reply ({review.replies})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '8px 16px',
            border: '1px solid #e5e7eb',
            borderRadius: '6px',
            backgroundColor: 'white',
            margin: '0 auto',
            cursor: 'pointer'
          }}>
            <span>Load More Reviews</span>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;