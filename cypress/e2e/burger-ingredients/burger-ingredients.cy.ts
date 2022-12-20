/// <reference types="cypress" />

describe('main e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit('http://localhost:3000');
    });

    it('open ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `http://localhost:3000${href}`)
                cy.get('section[data-cy-section="modal"').should('exist')
            })
    });
}); 