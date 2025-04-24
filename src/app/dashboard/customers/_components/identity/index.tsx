/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Skeleton, Empty, Divider } from 'antd';
import './style.css';
import { useParams } from 'next/navigation';
import { selectIdentity, selectIdentityLoading } from '@/store/customers/selectors';
import { fetchIdentityRequest } from '@/store/customers/actions';
import { Identity as IdentityType } from '@/store/customers/types';
import { AppDispatch } from '@/store';

const Identity: React.FC = () => {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const dispatch = useDispatch<AppDispatch>();

  const identities = useSelector(selectIdentity) as IdentityType[];
  const loading = useSelector(selectIdentityLoading) as boolean;

  useEffect(() => {
    if (id) {
      dispatch(fetchIdentityRequest(id));
    }
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!identities || identities.length === 0) {
    return (
      <Empty description="No identity documents found for this customer" className="empty-state" />
    );
  }

  const renderInfoItem = (label: string, value: string): React.ReactNode => (
    <div className="info-item">
      <span className="info-label">{label}</span>
      <span className="info-value">{value || 'N/A'}</span>
    </div>
  );

  const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <div className="identity-details">
      {identities.map((identity, index) => (
        <Card title={`Identity Document ${index + 1}`} className="details-card" key={identity._id}>
          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12}>
              {renderInfoItem('Document Type', identity.documentType)}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Document Number', identity.documentNumber)}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('First Name', identity.firstName)}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Last Name', identity.lastName)}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Date of Birth', formatDate(identity.dateOfBirth))}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Expiry Date', formatDate(identity.expiryDate))}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Issuing Country', identity.issuingCountry)}
            </Col>
            <Col xs={24} sm={12}>
              {renderInfoItem('Facial Match', identity.facialMatch ? 'Yes' : 'No')}
            </Col>
            {identity.facialMatchScore && (
              <Col xs={24} sm={12}>
                {renderInfoItem('Facial Match Score', `${identity.facialMatchScore}%`)}
              </Col>
            )}
          </Row>

          <Divider orientation="left">Document Images</Divider>

          <Row gutter={[24, 16]} className="document-images">
            {identity.documentFrontImageUrl && (
              <Col xs={24} sm={12}>
                <div className="image-container">
                  <h4>Front</h4>
                  <img src={identity.documentFrontImageUrl} alt="Document Front" />
                </div>
              </Col>
            )}

            {identity.documentBackImageUrl && (
              <Col xs={24} sm={12}>
                <div className="image-container">
                  <h4>Back</h4>
                  <img src={identity.documentBackImageUrl} alt="Document Back" />
                </div>
              </Col>
            )}

            {identity.selfieImageUrl && (
              <Col xs={24} sm={12}>
                <div className="image-container">
                  <h4>Selfie</h4>
                  <img src={identity.selfieImageUrl} alt="Selfie" />
                </div>
              </Col>
            )}
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default Identity;
