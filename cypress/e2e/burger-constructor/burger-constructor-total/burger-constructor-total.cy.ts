/// <reference types="cypress" />

import { CONSTRUCTOR_SECTION, CY_BASE_URL, dragOnConstructorSectionSomeIngredients, LOGIN, MODAL_SECTION, PASSWORD } from "../../../const";

describe('constructor e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(`${CY_BASE_URL}/login`);

        cy.get('input[type="email"]').type(LOGIN)
        cy.get('input[type="password"]').type(PASSWORD)
        cy.get('button[type="submit"]').click()

        cy.url().should('eq', `${CY_BASE_URL}/`)

        dragOnConstructorSectionSomeIngredients()
    });

    it('create order', () => {
        cy.get(`${CONSTRUCTOR_SECTION} button[type="button"]`).should('have.text', 'Оформить заказ').click()
        cy.get(MODAL_SECTION).should('exist')
    });
}); 