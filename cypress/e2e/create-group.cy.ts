describe('Create Group', () => {
  beforeEach(() => {
    // Assuming we have a login command
    cy.login();
    cy.visit('/dashboard/role-management/create-group');
  });

  it('should create a new group successfully', () => {
    // Fill in required fields
    cy.get('input[placeholder="Enter group name"]').type('Test Group');
    cy.get('input[placeholder="Enter group description"]').type(
      'Test Description'
    );

    // Add and fill optional fields
    cy.contains('button', 'Country').click();
    cy.get('input[placeholder="Enter country"]').type('Nigeria');

    cy.contains('button', 'State').click();
    cy.get('input[placeholder="Enter state"]').type('Lagos');

    cy.contains('button', 'Address').click();
    cy.get('input[placeholder="Enter address"]').type('123 Test Street');

    // Submit form
    cy.contains('button', 'Create New Group').click();

    // Assert success
    cy.contains('Group created successfully').should('be.visible');
    cy.url().should('include', '/dashboard/role-management');
  });

  it('should show validation errors for required fields', () => {
    // Try to submit without required fields
    cy.contains('button', 'Create New Group').click();

    // Assert validation messages
    cy.contains('Please enter group name').should('be.visible');
    cy.contains('Please enter group description').should('be.visible');
  });

  it('should show error message when API fails', () => {
    // Intercept API call and force it to fail
    cy.intercept('POST', '**/role-permission/groups', {
      statusCode: 500,
      body: {
        message: 'Internal server error',
      },
    }).as('createGroup');

    // Fill in required fields
    cy.get('input[placeholder="Enter group name"]').type('Test Group');
    cy.get('input[placeholder="Enter group description"]').type(
      'Test Description'
    );

    // Submit form
    cy.contains('button', 'Create New Group').click();

    // Wait for API call
    cy.wait('@createGroup');

    // Assert error message
    cy.contains('Internal server error').should('be.visible');
  });
});
