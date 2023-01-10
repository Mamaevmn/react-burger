/// <reference types="cypress" />

import { CY_BASE_URL, HEADER_LINK, LOGIN, PASSWORD } from "../../const";

describe('main e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(CY_BASE_URL);
    });

    it('click on feed link', () => {
        cy.get(HEADER_LINK).contains('Лента заказов').click()
        cy.visit(`${CY_BASE_URL}/feed`);
    });

    it('click on not auth profile link', () => {
        cy.get(HEADER_LINK).contains('Личный кабинет').click()
        cy.visit(`${CY_BASE_URL}/login`);
    });

    it('click on auth profile link', () => {
        cy.get(HEADER_LINK).contains('Личный кабинет').click()

        cy.get('input[type="email"]').type(LOGIN)
        cy.get('input[type="password"]').type(PASSWORD)
        cy.get('button[type="submit"]').click()

        cy.get(HEADER_LINK).should('not.have.text', 'Личный кабинет')
        cy.url().should('eq', `${CY_BASE_URL}/react-burger/profile`)
    });
}); 