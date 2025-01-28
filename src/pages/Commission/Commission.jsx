import React from "react";
import("./Commission.css");
import { Row, Col, Card, Badge } from "react-bootstrap";

const Commission = ({ commissionType, globalCommission, enableMaxCommission }) => {
    return (
        <div className="container mt-5">
            <Card className="shadow-sm rounded border-1 no-hover">
                <Card.Body>
                    <h3 className="mb-4">Global Commission Settings</h3>

                    {/* Note Section */}
                    <div
                        className="p-3 mb-4"
                        style={{ backgroundColor: "#fff8d6", borderRadius: "8px", border: "1px solid #ffe8a1" }}
                    >
                        <p className="text-muted mb-2">
                            <strong className="text-danger">Note:</strong>
                        </p>
                        <ul className="text-muted ps-4">
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

                    {/* Read-only Global Commission Type */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <div>
                                <p className="fw-bold">Global Commission Type</p>
                                <p>{commissionType}</p>
                                <small className="text-muted">Fixed.</small>
                            </div>
                        </Col>
                    </Row>

                    {/* Read-only Global Commission Value */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <div>
                                <p className="fw-bold">Global Commission</p>
                                <p>{globalCommission}</p>
                                <small className="text-muted">10.</small>
                            </div>
                        </Col>
                    </Row>

                    {/* Read-only Maximum Commission Status with Chip */}
                    <Row className="mb-4">
                        <Col md={6}>
                            <div>
                                <p className="fw-bold">Maximum Commission Status</p>
                                <Badge
                                    bg={enableMaxCommission ? "success" : "danger"}
                                    className="fs-6 p-2"
                                >
                                    {enableMaxCommission ? "Enabled" : "Disabled"}
                                </Badge>
                                <small className="text-muted d-block mt-2">
                                    Maximum commission per order is {enableMaxCommission ? "enabled" : "disabled"} by admin.
                                </small>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Commission;