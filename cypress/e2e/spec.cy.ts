import dotenv from 'dotenv';

describe('Navigation', () => {
  it.only('should create and save a cv', () => {
    cy.visit('https://cv-creator-three.vercel.app/');

    cy.get('[data-testid="sign_in"]').click();

    cy.url().should(
      'include',
      'https://cv-creator-three.vercel.app/api/auth/signin?callbackUrl=http%3A%2F%2Fhttps://cv-creator-three.vercel.app/%3A3000%2F',
    );

    cy.get('span').contains('Sign in with GitHub').click();

    cy.origin('https://github.com', () => {
      cy.get('[id="login_field"]').type(Cypress.env('NAME'));

      cy.get('[id="password"]').type(Cypress.env('PASSWORD'));

      cy.get('[class="btn btn-primary btn-block js-sign-in-button"]').click();
    });

    // write new tests from here!

    cy.get('[data-testid="create_cv"]').click();

    cy.url().should('include', 'https://cv-creator-three.vercel.app/cv-form');

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

    cy.url().should(
      'include',
      'https://cv-creator-three.vercel.app/cv-form/templates',
    );

    cy.get('[data-testid="template_b"]').click();
    cy.url().should(
      'include',
      'https://cv-creator-three.vercel.app/cv-form/templates/template-b',
    );
    cy.get('[data-testid="save_template"]').click();
    cy.get('[data-testid="name_cv"]').type('Cypress test cv');

    cy.go('back');
    cy.go('back');
    cy.go('back');
    cy.reload();
    cy.url().should('include', 'https://cv-creator-three.vercel.app/');
    cy.get('[data-testid="Cypress test cv"]');
  });

  it.only('should go to job search', () => {
    cy.visit('https://cv-creator-three.vercel.app/');

    cy.get('[data-testid="sign_in"]').click();

    cy.url().should(
      'include',
      'https://cv-creator-three.vercel.app/api/auth/signin?callbackUrl=http%3A%2F%2Fhttps://cv-creator-three.vercel.app/%3A3000%2F',
    );

    cy.get('span').contains('Sign in with GitHub').click();

    cy.origin('https://github.com', () => {
      cy.get('[id="login_field"]').type(Cypress.env('NAME'));
      cy.get('[id="password"]').type(Cypress.env('PASSWORD'));
      cy.get('[class="btn btn-primary btn-block js-sign-in-button"]').click();
    });

    // write new tests from here!

    cy.get('[data-testid="job_search"]').click();

    cy.url().should(
      'include',
      'https://cv-creator-three.vercel.app/job-search',
    );

    cy.get('[name="job"]').clear().type('JavaScript in Stockholm');
    cy.get('[class="button__Button-sc-4e3eac9a-1 eYtzJl"]').click();
    cy.get('span').contains('Loading');
    cy.scrollTo(0, 500);
    cy.get('[data-testid="fav_job"]').first().click();
    cy.go('back');
    cy.url().should('include', 'https://cv-creator-three.vercel.app/');
    cy.scrollTo('bottom');
    cy.get('[data-testid="fav_job"]').first().scrollIntoView();
  });
});
