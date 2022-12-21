/// <reference types="cypress" />

import { CONSTRUCTOR_SECTION, CY_BASE_URL, dragOnConstructorSectionSomeIngredients, INGREDIENTS_SECTION } from "../../const";

describe('main e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit(CY_BASE_URL);
    });

    it('should have 2 sections', () => {
        cy.get(`main ${INGREDIENTS_SECTION}`)
        cy.get(`main ${CONSTRUCTOR_SECTION}`)
    });

    it('drag ingredient item to constructor field', () => {
        dragOnConstructorSectionSomeIngredients()
    });
}); 