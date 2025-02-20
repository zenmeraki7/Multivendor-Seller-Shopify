import React, { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
    padding: '48px 16px'
  },
  wrapper: {
    // maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    padding: '32px',
    marginBottom: '32px'
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '24px'
  },
  sellerInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '24px'
  },
  sellerText: {
    fontSize: '14px',
    color: '#4b5563'
  },
  ratingContainer: {
    marginBottom: '24px'
  },
  ratingLabel: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
    marginBottom: '12px',
    display: 'block'
  },
  starContainer: {
    display: 'flex',
    gap: '8px'
  },
  starButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    transition: 'transform 0.2s',
  },
  textarea: {
    width: '100%',
    height: '128px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    marginBottom: '24px',
    resize: 'none',
    fontSize: '14px'
  },
  submitButton: {
    width: '100%',
    backgroundColor: 'blue',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  submitButtonDisabled: {
    backgroundColor: '#3498db',
    cursor: 'not-allowed'
  },
  successMessage: {
    textAlign: 'center',
    padding: '48px 0'
  },
  successText: {
    color: '#059669',
    fontSize: '20px',
    marginBottom: '16px'
  },
  reviewContainer: {
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: '32px',
    marginBottom: '32px'
  },
  reviewHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  userAvatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#dbeafe',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#2563eb',
    fontWeight: '500'
  },
  userName: {
    fontWeight: '500',
    color: '#1f2937'
  },
  reviewDate: {
    fontSize: '14px',
    color: '#6b7280'
  },
  reviewText: {
    color: '#4b5563',
    lineHeight: '1.5',
    marginBottom: '16px'
  },
  helpfulButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '14px',
    color: '#6b7280',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  }
};

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Sample seller data
  const seller = {
    name: "John's Electronics",
    id: "SE123",
    averageRating: 4.5,
    totalReviews: 128
  };

  // Sample previous reviews
  const previousReviews = [
    {
      id: 1,
      userName: "Sarah M.",
      rating: 5,
      date: "2025-02-15",
      feedback: "Excellent service! The product arrived earlier than expected and was exactly as described. John was very helpful with all my questions.",
      helpful: 24
    },
    {
      id: 2,
      userName: "Mike R.",
      rating: 4,
      date: "2025-02-10",
      feedback: "Good experience overall. The item was in perfect condition. Would have given 5 stars but shipping took a bit longer than expected.",
      helpful: 12
    },
    {
      id: 3,
      userName: "Emily K.",
      rating: 5,
      date: "2025-02-05",
      feedback: "Outstanding customer service! Had an issue with my order and John resolved it immediately. Will definitely buy from this seller again.",
      helpful: 31
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      sellerId: seller.id,
      rating,
      feedback,
      timestamp: new Date().toISOString()
    });
    setSubmitted(true);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        {/* Feedback Form */}
        <div style={styles.card}>
          <h2 style={styles.title}>Rate Your Experience with {seller.name}</h2>
          
          {!submitted ? (
            <form onSubmit={handleSubmit}>
              <div style={styles.sellerInfo}>
                <span style={styles.sellerText}>Seller ID: {seller.id}</span>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <Star fill="#facc15" color="#facc15" size={16} />
                  <span style={{fontWeight: '500'}}>{seller.averageRating}</span>
                  <span style={styles.sellerText}>({seller.totalReviews} reviews)</span>
                </div>
              </div>

              <div style={styles.ratingContainer}>
                <label style={styles.ratingLabel}>Your Rating</label>
                <div style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      style={styles.starButton}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <Star
                        size={40}
                        fill={star <= (hoverRating || rating) ? '#facc15' : 'none'}
                        color={star <= (hoverRating || rating) ? '#facc15' : '#e5e7eb'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                style={styles.textarea}
                placeholder="Share your experience with this seller..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              />

              <button
                type="submit"
                style={{
                  ...styles.submitButton,
                  ...((!rating || !feedback) && styles.submitButtonDisabled)
                }}
                disabled={!rating || !feedback}
              >
                Submit Feedback
              </button>
            </form>
          ) : (
            <div style={styles.successMessage}>
              <div style={styles.successText}>Thank you for your feedback!</div>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setRating(0);
                  setFeedback('');
                }}
                style={{color: '#2563eb', fontWeight: '500', background: 'none', border: 'none', cursor: 'pointer'}}
              >
                Submit another review
              </button>
            </div>
          )}
        </div>

        {/* Previous Reviews */}
        <div style={styles.card}>
          <h2 style={styles.title}>Previous Reviews</h2>
          {previousReviews.map((review, index) => (
            <div 
              key={review.id} 
              style={{
                ...styles.reviewContainer,
                marginBottom: index === previousReviews.length - 1 ? 0 : '32px',
                borderBottom: index === previousReviews.length - 1 ? 'none' : '1px solid #e5e7eb'
              }}
            >
              <div style={styles.reviewHeader}>
                <div style={styles.userInfo}>
                  <div style={styles.userAvatar}>
                    {review.userName.charAt(0)}
                  </div>
                  <div>
                    <div style={styles.userName}>{review.userName}</div>
                    <div style={{display: 'flex', gap: '2px', marginTop: '4px'}}>
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < review.rating ? '#facc15' : 'none'}
                          color={i < review.rating ? '#facc15' : '#e5e7eb'}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span style={styles.reviewDate}>{formatDate(review.date)}</span>
              </div>
              <p style={styles.reviewText}>{review.feedback}</p>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <button style={styles.helpfulButton}>
                  <ThumbsUp size={16} />
                  <span>Helpful</span>
                </button>
                <span style={{color: '#6b7280'}}>·</span>
                <span style={{fontSize: '14px', color: '#6b7280'}}>
                  {review.helpful} people found this helpful
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;