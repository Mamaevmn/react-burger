/// <reference types="cypress" />

describe('modal e2e', () => {
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

    it('open and close on press ESCAPE ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `http://localhost:3000${href}`)
                cy.get('section[data-cy-section="modal"').should('exist')
            })
        
        cy.get('body').trigger('keyup', { keyCode: 27});
        cy.get('section[data-cy-section="modal"]').should('not.exist')
    });

    it('open and close on press btn ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `http://localhost:3000${href}`)
                cy.get('section[data-cy-section="modal"').should('exist')
            })

        cy.get('section[data-cy-section="modal"] > button').click()
        cy.get('section[data-cy-section="modal"]').should('not.exist')
    });

    it('open and close on press btn constructor ingredient modal', () => {
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"] > a').eq(0).click()
        .invoke('attr', 'href')
        .then(($href) => {
            const href = $href;

            cy.url().should('eq', `http://localhost:3000${href}`)
            cy.get('section[data-cy-section="modal"]').should('exist')
        })

        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"] > a .constructor-element__text').eq(0)
        .invoke('text').then(($text) => {
            const text = $text;

            cy.get('section[data-cy-section="modal"] p[data-cy-modal="title"]').should('have.text', text)
        })
        
        cy.get('section[data-cy-section="modal"] > button').click()
        cy.get('section[data-cy-section="modal"]').should('not.exist')
    });

    it('open and close on press ESCAPE constructor ingredient modal', () => {
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"] > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `http://localhost:3000${href}`)
                cy.get('section[data-cy-section="modal"]').should('exist')
            })
        
        cy.get('section[data-cy-section="burger-constructor"] ul li[draggable="true"] > a .constructor-element__text').eq(0)
            .invoke('text').then(($text) => {
                const text = $text;

                cy.get('section[data-cy-section="modal"] p[data-cy-modal="title"]').should('have.text', text)
            })

        cy.get('body').trigger('keyup', { keyCode: 27});
        cy.get('section[data-cy-section="modal"]').should('not.exist')
    });
}); 