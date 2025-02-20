import React from 'react';
import { Bell, LogOut, Eye, Home, Settings, Package, ShoppingCart, User } from 'lucide-react';

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#1a2942',
    padding: '15px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
  },
  headerActions: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  nav: {
    backgroundColor: 'white',
    padding: '10px 20px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    gap: '20px',
  },
  navItem: {
    padding: '8px 15px',
    textDecoration: 'none',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
  activeNavItem: {
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: '4px',
  },
  maintenanceBanner: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeeba',
    padding: '15px 20px',
    margin: '20px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
  },
  warningIcon: {
    color: '#856404',
    fontSize: '20px',
  },
  maintenanceText: {
    color: '#856404',
  },
  contentArea: {
    padding: '20px',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  pageDescription: {
    color: '#666',
    marginBottom: '30px',
  },
  emptyStateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
    backgroundColor: 'white',
    borderRadius: '8px',
    textAlign: 'center',
  },
  emptyStateImage: {
    width: '300px',
    height: '300px',
    marginBottom: '20px',
    opacity: '0.6',
  }
};

const PaymentDetails = () => {
  return (
    <div style={styles.container}>
      {/* <div style={styles.maintenanceBanner}>
        <div style={styles.warningIcon}>!</div>
        <div style={styles.maintenanceText}>
          <div>The Maintenance of the app is scheduled for 2025-02-20 from 08:30AM to 11:00AM UTC.</div>
          <div>It is recommended <strong>DO NOT make changes</strong> while the app is in maintenance mode.</div>
        </div>
      </div> */}

      {/* Content Area */}
      <div style={styles.contentArea}>
        <h1 style={styles.pageTitle}>Payment Details</h1>
        <p style={styles.pageDescription}>Enter the payment details to receive your order earnings</p>
        
        {/* Empty State / Placeholder */}
        <div style={styles.emptyStateContainer}>
          <img 
            src="https://img.freepik.com/free-vector/hands-holding-credit-card-mobile-phone-with-banking-app-person-paying-with-bank-card-transferring-money-shopping-online-flat-vector-illustration-payment-finance-concept_74855-24760.jpg"
            alt="Payment illustration"
            style={styles.emptyStateImage }
            // style={{width: '300px', height: '300px'}}
          />
          <p>Configure your payment details to start receiving payments</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
