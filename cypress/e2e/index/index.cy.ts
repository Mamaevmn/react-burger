/// <reference types="cypress" />

import { CY_BASE_URL } from "../../const";

describe('service is available', () => {
    it('should be available on localhost:3000', () => {
        cy.visit(CY_BASE_URL);
    });
}); 