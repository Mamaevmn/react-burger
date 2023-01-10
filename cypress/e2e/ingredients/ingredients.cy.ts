/// <reference types="cypress" />

import { CY_BASE_URL, INGREDIENTS_SECTION } from "../../const";

describe('ingredient available', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(CY_BASE_URL);
    });

    it('open ingredient in new tab', () => {
        cy.get(`${INGREDIENTS_SECTION} ul li[draggable="true"] > a`).eq(0)
        .invoke('attr', 'href')
        .then(($href) => {
            const href = $href;

            cy.get(`${INGREDIENTS_SECTION} ul li[draggable="true"] > a p[data-cy-ingredient="name"]`).eq(0)
            .invoke('text').then(($text) => {
                const text = $text;
    
                cy.visit(`${CY_BASE_URL}${href}`)
                cy.get('section[data-cy-ingredient="page"] p[data-cy-modal="title"]').should('have.text', text)
            })
        })
    })
}); 