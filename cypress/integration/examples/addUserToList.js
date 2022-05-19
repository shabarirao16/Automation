import datas from '../../fixtures/testData.json';
import faker from "faker";

describe('customer registration journey', () => {
    datas.forEach((data) => {
        context(`viewport: ${data.viewport}`, () => {
            beforeEach(() => {
                cy.viewport(data.viewport);
            });
            const uuid1 = () => Cypress._.random(0, 1e6)
            let id1 = uuid1()
            let faker = require('faker');
            let firstName = faker.name.firstName();
            let lastName = faker.name.lastName();
            it('should add new user to the list', () => {
                cy.visit("https://www.way2automation.com/angularjs-protractor/webtables/")
                cy.url().should('include', 'https://www.way2automation.com/angularjs-protractor/webtables/')
                cy.get('.smart-table-header-row').should('be.visible')
                cy.get('[type="add"]').click();
                cy.get('.modal-header').findByText('Add User').should('be.visible')
                cy.get('[name="FirstName"]').type(firstName)
                cy.get('[name="LastName"]').type(lastName)
                cy.get('[name="UserName"]').type(firstName+id1)
                cy.get('[name="Password"]').type("asdfgh")
                cy.get('[name="optionsRadios"]').eq(0).check()
                cy.get('[name="optionsRadios"]').eq(1).check()
                cy.get('[name="RoleId"]').select(data.Role)
                cy.get('[name="Email"]').type(data.Email)
                cy.get('[name="Mobilephone"]').type(data.CellPhone)
                cy.get('.btn.btn-success').click()
                cy.get('.modal-header').should('not.exist')
            })
            it('should check user exist in the table', () => {
                cy.get('tbody > tr').each((entry) => {
                    const StoreText1 = entry.find('td').eq(0).text();
                    const StoreText2 = entry.find('td').eq(1).text();
                    if (StoreText1 === firstName && StoreText2 === lastName){
                        cy.get(entry).find('td').eq(2).should('have.text',firstName+id1)
                        cy.get(entry).find('td').eq(4).should('have.text','')
                        cy.get(entry).find('td').eq(5).should('have.text',data.Role)
                        cy.get(entry).find('td').eq(6).should('have.text',data.Email)
                        cy.get(entry).find('td').eq(7).should('have.text',data.CellPhone)

                    }
                })
            });
        });
    });
});
