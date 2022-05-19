import datas from '../../fixtures/testData.json';

describe('customer registration journey', () => {
  datas.forEach((data) => {
    context(`viewport: ${data.viewport}`, () => {
      beforeEach(() => {
        cy.viewport(data.viewport);
        cy.visit({
          url: '',
        });


      });
      it('should complete the registration process with unique customer details', () => {
      const uuid1 = () => Cypress._.random(0, 1e6)
      const id1 = uuid1()
      const faker = require('faker');
      const firstName = faker.name.firstName();
      const lastName = faker.name.lastName();
      cy.url().should('include', 'https://www.mainstagebingo.com/')
      cy.get('[id="joinnow"]').click();
          cy.wait(1500)
      cy.url().should('include', 'https://www.mainstagebingo.com/create-account/personal-details')
       cy.get('.btn.btn-primary').as('Button')
      cy.get('@Button').should('be.disabled')
      cy.get('h1').should('have.text','Sign up')
      cy.get('[id="firstname"]').type(firstName)
      cy.get('[id="lastname"]').type(lastName)
      cy.get('[id="gender"]').select(data.gender)
      cy.get('[id="dob"]').clear();
      cy.get('[id="dob"]').type(data.underAgeDob)
      cy.get('.form-text.text-danger').should('have.text','You must be over 18 to play')
      cy.get('[id="dob"]').clear();
      cy.get('[id="dob"]').type(data.dob)
      cy.get('.form-text.text-danger').should('not.exist')
      cy.get('[id="country"]').select(data.country)
      cy.get('@Button').click()
      cy.url().should('include', 'https://www.mainstagebingo.com/create-account/address-details')
      cy.get('h1').should('have.text', 'Hi ' + firstName)
      const emailAddress = data.email + `${id1}` + "@whitehatgaming.com"
      cy.get('[id="email"]').type(emailAddress)
      const uuid2 = () => Cypress._.random(0, 1e11)
      const id2 = uuid2()
      cy.get('@Button').should('be.disabled')
      cy.get('[id="phone"]').type(id2)
      cy.get('[type="search"]').type('Triq')
      cy.wait(1900)
      cy.get('.address-results__item:nth-child(1)').click()
      cy.get('@Button').click()
      cy.url().should('include', 'https://www.mainstagebingo.com/create-account/account-details')
      cy.get('h1').should('have.text', 'Almost there')
      cy.get('@Button').should('be.disabled')
      cy.get('[id="username"]').type('test01')
      cy.get('[id="password"]').type('password01')
      cy.get('[id="termsPrivacyFunds"]').check()
      cy.get('@Button').should('be.enabled')
      });

    });
  });
});
