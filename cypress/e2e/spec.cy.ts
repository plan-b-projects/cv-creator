describe('Navigation', () => {
  it.only('should create and save a cv', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="sign_in"]').click();

    cy.url().should(
      'include',
      'http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
    );

    cy.get('span').contains('Sign in with GitHub').click();

    cy.origin('https://github.com', () => {
      cy.get('[id="login_field"]').type(process.env.GITHUB_USER_NAME!);

      cy.get('[id="password"]').type(process.env.GITHUB_PASSWORD!);

      cy.get('[class="btn btn-primary btn-block js-sign-in-button"]').click();
    });

    // write new tests from here!

    cy.get('[data-testid="create_cv"]').click();

    cy.url().should('include', 'http://localhost:3000/cv-form');

    cy.get('[data-testid="basic_info"]').click();
    cy.get('[name="basicInfo.profilePicture"]')
      .clear()
      .type('https://imgur.com/a/fIAPJg0');
    cy.get('[name="basicInfo.name"]').clear().type('Cypress');
    cy.get('[name="basicInfo.profileIntro"]')
      .clear()
      .type(
        'I am Cypress and even I need a job. I have digital mouths to feed!',
      );
    cy.get('[name="basicInfo.location"]').clear().type('Your computer');
    cy.get('[name="basicInfo.email"]')
      .clear()
      .type('cypress.fakemail@imadethisup.test');
    cy.get('[name="basicInfo.tel"]').clear().type('0000000000');
    cy.get('[name="basicInfo.linkedIn"]').clear().type('Fake-linkedin-here');
    cy.get('[name="basicInfo.gitHub"]').clear().type('Fake-github-here');
    cy.get('[name="basicInfo.website"]')
      .clear()
      .type('https://r.mtdv.me/qycgXApSXf');

    cy.get('[data-testid="save_and_create_cv"]').click();

    cy.url().should('include', 'http://localhost:3000/cv-form/templates');

    cy.get('[class="template-a__Template-sc-46e711c2-0 bSBrXZ"]').click();
    cy.url().should(
      'include',
      'http://localhost:3000/cv-form/templates/template-a',
    );
    cy.get('[data-testid="save_template"]').click();
  });

  it.only('should go to job search', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="sign_in"]').click();

    cy.url().should(
      'include',
      'http://localhost:3000/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F',
    );

    cy.get('span').contains('Sign in with GitHub').click();

    cy.origin('https://github.com', () => {
      cy.get('[id="login_field"]').type(process.env.GITHUB_USER_NAME!);
      cy.get('[id="password"]').type(process.env.GITHUB_PASSWORD!);
      cy.get('[class="btn btn-primary btn-block js-sign-in-button"]').click();
    });

    // write new tests from here!

    cy.get('[data-testid="create_cv"]').click();

    cy.url().should('include', 'http://localhost:3000/cv-form');

    cy.get('[data-testid="basic_info"]').click();
    cy.get('[name="basicInfo.profilePicture"]')
      .clear()
      .type('https://imgur.com/a/fIAPJg0');
    cy.get('[name="basicInfo.name"]').clear().type('Cypress');
    cy.get('[name="basicInfo.profileIntro"]')
      .clear()
      .type(
        'I am Cypress and even I need a job. I have digital mouths to feed!',
      );
    cy.get('[name="basicInfo.location"]').clear().type('Your computer');
    cy.get('[name="basicInfo.email"]')
      .clear()
      .type('cypress.fakemail@imadethisup.test');
    cy.get('[name="basicInfo.tel"]').clear().type('0000000000');
    cy.get('[name="basicInfo.linkedIn"]').clear().type('Fake-linkedin-here');
    cy.get('[name="basicInfo.gitHub"]').clear().type('Fake-github-here');
    cy.get('[name="basicInfo.website"]')
      .clear()
      .type('https://r.mtdv.me/qycgXApSXf');

    cy.get('[data-testid="save_and_create_cv"]').click();

    cy.url().should('include', 'http://localhost:3000/cv-form/templates');

    cy.get('[class="template-a__Template-sc-46e711c2-0 bSBrXZ"]').click();
    cy.url().should(
      'include',
      'http://localhost:3000/cv-form/templates/template-a',
    );
    cy.get('[data-testid="save_template"]').click();
  });
});
