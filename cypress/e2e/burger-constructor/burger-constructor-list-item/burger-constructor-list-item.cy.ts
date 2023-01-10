/// <reference types="cypress" />

import { CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT, CY_BASE_URL, dragOnConstructorSectionSomeIngredients } from "../../../const";

describe('constructor item e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(CY_BASE_URL);

        dragOnConstructorSectionSomeIngredients()
    });

    it('delete ingredient', () => {
        cy.get(CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT).should('have.length', 2)
        cy.get(`${CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT} > a .constructor-element__action`).eq(0).click().should('not.exist')
        cy.get(CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT).should('have.length', 1)
    });
}); 