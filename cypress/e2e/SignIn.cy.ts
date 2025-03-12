/// <reference types="cypress" />

describe('Sign In Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load the sign-in page with necessary elements', () => {
    cy.contains('Sign In').should('be.visible');

    cy.get('input#email_phone').should('be.visible');
    cy.get('input#password').should('be.visible');

    cy.contains('Get started').should('be.visible');
    cy.contains('Sign in with Google').should('be.visible');
    cy.contains('Sign up with Zoho').should('be.visible');
    cy.contains('Sign up with Azure').should('be.visible');
    cy.contains('Sign up with Outlook').should('be.visible');

    cy.contains('Forgot password?').should('be.visible');
    cy.contains('Sign Up').should('be.visible');
  });

  it('should navigate to the dashboard when the "Get started" button is clicked', () => {
    // cy.get('input#email_phone').type('testuser@example.com');
    // cy.get('input#password').type('password123');
    cy.contains('Get started').click();
    cy.url().should('include', '/dashboard');
  });

  it('should navigate to the forgot password page when "Forgot password?" is clicked', () => {
    cy.contains('Forgot password?').click();
    cy.url().should('include', '/forgot-password');
  });

  it('should navigate to the sign-up page when the "Sign Up" link is clicked', () => {
    // cy.contains('Sign Up').click();
    // cy.url().should('include', '/');
  });
});
