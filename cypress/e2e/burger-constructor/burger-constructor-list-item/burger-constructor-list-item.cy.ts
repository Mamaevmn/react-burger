/// <reference types="cypress" />

describe('constructor item e2e', () => {
    beforeEach(() => {
        const dataTransfer = new DataTransfer;
        cy.viewport('macbook-11')
        cy.visit('http://localhost:3000');

        const draggable_bun = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="bun"] > ul li[draggable="true"] > a').eq(0)
        const draggable_main = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="main"] > ul li[draggable="true"] > a').eq(0)
        const draggable_sauce = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="sauce"] > ul li[draggable="true"] > a').eq(0)
        const droppable = cy.get('section[data-cy-section="burger-constructor"]')

        draggable_bun.trigger('dragstart', { dataTransfer})
        droppable.trigger('drop', { dataTransfer})
        cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="bun"] > ul li > a .counter__num').eq(0).should('have.text', '2')

        draggable_main.trigger('dragstart', { dataTransfer})
        droppable.trigger('drop', { dataTransfer})
        cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="main"] > ul li > a .counter__num').eq(0).should('have.text', '1')

        draggable_sauce.trigger('dragstart', { dataTransfer})
        droppable.trigger('drop', { dataTransfer})
        cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="sauce"] > ul li > a .counter__num').eq(0).eq(0).should('have.text', '1')
    });

    it('delete ingredient', () => {
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"]').should('have.length', 2)
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"] > a .constructor-element__action').eq(0).click().should('not.exist')
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"]').should('have.length', 1)
    });

}); 