/// <reference types="cypress" />

describe('main e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit('http://localhost:3000');
    });

    it('should have 2 sections', () => {
        cy.get('main section[data-cy-section="burger-ingredients"]')
        cy.get('main section[data-cy-section="burger-constructor"]')
    });

    it('click on feed link', () => {
        cy.get('header nav a').contains('Лента заказов').click()
        cy.visit('http://localhost:3000/feed');
    });

    it('open ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0)
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.visit(`http://localhost:3000${href}`);
            })
    });

    it('drag ingredient item to constructor field', () => {
        const draggable_bun = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="bun"] > ul li[draggable="true"] > a').eq(0)
        const draggable_main = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="main"] > ul li[draggable="true"] > a').eq(0)
        const draggable_sauce = cy.get('section[data-cy-section="burger-ingredients"] ul li[data-tab-content="sauce"] > ul li[draggable="true"] > a').eq(0)
        const droppable = cy.get('section[data-cy-section="burger-constructor"]')

        draggable_bun.trigger('dragstart', { dataTransfer: new DataTransfer })
        droppable.trigger('drop', { dataTransfer: new DataTransfer })
        cy.get('section ul li[data-tab-content="bun"] > ul li > a .counter__num').eq(0).should('have.text', '2')

        draggable_main.trigger('dragstart', { dataTransfer: new DataTransfer })
        droppable.trigger('drop', { dataTransfer: new DataTransfer })
        cy.get('section ul li[data-tab-content="main"] > ul li > a .counter__num').eq(0).should('have.text', '1')

        draggable_sauce.trigger('dragstart', { dataTransfer: new DataTransfer })
        droppable.trigger('drop', { dataTransfer: new DataTransfer })
        cy.get('section ul li[data-tab-content="sauce"] > ul li > a .counter__num').eq(0).eq(0).should('have.text', '1')
    });
}); 