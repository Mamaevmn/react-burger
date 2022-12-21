/// <reference types="cypress" />

describe('ingredient available', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit('http://localhost:3000');
    });

    it('open ingredient in new tab', () => {
        cy.get('section[data-cy-section="burger-ingredients"] ul li[draggable="true"] > a').eq(0)
        .invoke('attr', 'href')
        .then(($href) => {
            const href = $href;

            cy.get('section[data-cy-section="burger-ingredients"] ul li[draggable="true"] > a p[data-cy-ingredient="name"]').eq(0)
            .invoke('text').then(($text) => {
                const text = $text;
    
                cy.visit(`http://localhost:3000${href}`)
                cy.get('section[data-cy-ingredient="page"] p[data-cy-modal="title"]').should('have.text', text)
            })
        })
    })
}); 