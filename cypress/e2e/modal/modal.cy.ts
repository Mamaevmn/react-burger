/// <reference types="cypress" />

import { CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT, CY_BASE_URL, dragOnConstructorSectionSomeIngredients, MODAL_SECTION } from "../../const";

describe('modal e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(CY_BASE_URL);

        dragOnConstructorSectionSomeIngredients()
    });

    it('open and close on press ESCAPE ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `${CY_BASE_URL}${href}`)
                cy.get('section[data-cy-section="modal"').should('exist')
            })
        
        cy.get('body').trigger('keyup', { keyCode: 27});
        cy.get(MODAL_SECTION).should('not.exist')
    });

    it('open and close on press btn ingredient modal', () => {
        cy.get('section ul li[data-tab-content="main"] > ul li > a').eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `${CY_BASE_URL}${href}`)
                cy.get('section[data-cy-section="modal"').should('exist')
            })

        cy.get(`${MODAL_SECTION} > button`).click()
        cy.get(MODAL_SECTION).should('not.exist')
    });

    it('open and close on press btn constructor ingredient modal', () => {
        cy.get(`${CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT} > a`).eq(0).click()
        .invoke('attr', 'href')
        .then(($href) => {
            const href = $href;

            cy.url().should('eq', `${CY_BASE_URL}${href}`)
            cy.get(MODAL_SECTION).should('exist')
        })

        cy.get(`${CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT} > a .constructor-element__text`).eq(0)
        .invoke('text').then(($text) => {
            const text = $text;

            cy.get(`${MODAL_SECTION} p[data-cy-modal="title"]`).should('have.text', text)
        })
        
        cy.get(`${MODAL_SECTION} > button`).click()
        cy.get(MODAL_SECTION).should('not.exist')
    });

    it('open and close on press ESCAPE constructor ingredient modal', () => {
        cy.get(`${CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT} > a`).eq(0).click()
            .invoke('attr', 'href')
            .then(($href) => {
                const href = $href;

                cy.url().should('eq', `${CY_BASE_URL}${href}`)
                cy.get(MODAL_SECTION).should('exist')
            })
        
        cy.get(`${CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT} > a .constructor-element__text`).eq(0)
            .invoke('text').then(($text) => {
                const text = $text;

                cy.get(`${MODAL_SECTION} p[data-cy-modal="title"]`).should('have.text', text)
            })

        cy.get('body').trigger('keyup', { keyCode: 27});
        cy.get(MODAL_SECTION).should('not.exist')
    });
}); 