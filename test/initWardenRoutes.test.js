const request = require('supertest');
const express = require('express');
const { initWardenRoutes } = require('./wardenRoutes');
const { WardenEp } = require('../end-points/warden-ep');
const { Authentication } = require('../middleware/authentication');

// Mocking the Express app
const app = express();

// Mock middleware functions
jest.mock('../middleware/authentication', () => ({
  wardenUserVerification: jest.fn(),
}));

// Mock endpoint functions
jest.mock('../end-points/warden-ep', () => ({
  viewPropertiesToApprove: jest.fn(),
  approveProperty: jest.fn(),
  rejectProperty: jest.fn(),
}));

// Initialize routes
initWardenRoutes(app);

describe('Warden Routes', () => {
  it('should view all properties to approve', async () => {
    const res = await request(app)
      .get('/api/auth/view-all/properties');
    expect(res.status).toBe(200); // Assuming success response status is 200
    expect(WardenEp.viewPropertiesToApprove).toHaveBeenCalled();
  });

  it('should approve a property', async () => {
    const res = await request(app)
      .post('/api/auth/approve/property/post123/warden123');
    expect(res.status).toBe(200); // Assuming success response status is 200
    expect(WardenEp.approveProperty).toHaveBeenCalled();
  });

  it('should reject a property', async () => {
    const res = await request(app)
      .post('/api/auth/reject/property/post123/warden123');
    expect(res.status).toBe(200); // Assuming success response status is 200
    expect(WardenEp.rejectProperty).toHaveBeenCalled();
  });
});
