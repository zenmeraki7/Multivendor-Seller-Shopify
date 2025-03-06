import React from "react";
import { Row, Col, Card, Badge } from "react-bootstrap";
import "./Commission.css";

const Commission = ({ commissionType, globalCommission, enableMaxCommission }) => {
  return (
    <Card className="commission-card">
      <Card.Header as="h5">Global Commission Settings</Card.Header>
      <Card.Body>
        {/* Note Section */}
        <div className="note-section mb-4">
          <h6 className="font-weight-bold">Note:</h6>
          <ul className="commission-notes">
            <li>
              <strong>%:</strong> In this type of commission, the percentage amount will be deducted from the base price of the product.
            </li>
            <li>
              <strong>Fixed:</strong> In this type of commission, the fixed amount will be deducted from the base price.
            </li>
            <li>
              <strong>% + Fixed:</strong> First, the percentage amount will be deducted from the base price of the product, and then a fixed amount will be deducted from the remaining amount.
            </li>
            <li>
              <strong>Fixed + %:</strong> First, a fixed amount will be deducted from the base price, and then the percentage amount will be deducted from the remaining price.
            </li>
          </ul>
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Card className="info-card">
              <Card.Body>
                <Card.Title className="text-muted mb-1">Global Commission Type</Card.Title>
                <Card.Text className="commission-value">{commissionType || "Fixed"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="info-card">
              <Card.Body>
                <Card.Title className="text-muted mb-1">Global Commission</Card.Title>
                <Card.Text className="commission-value">{globalCommission || "10"}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <Card className="info-card">
              <Card.Body>
                <Card.Title className="text-muted mb-1">Maximum Commission Status</Card.Title>
                <div className="d-flex align-items-center">
                  <Badge 
                    bg={enableMaxCommission ? "success" : "danger"}
                    className="status-badge me-2"
                  >
                    {enableMaxCommission ? "Enabled" : "Disabled"}
                  </Badge>
                  <Card.Text className="mb-0 text-muted">
                    Maximum commission per order is {enableMaxCommission ? "enabled" : "disabled"} by admin.
                  </Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Commission;