/// <reference types="cypress" />

describe('main e2e', () => {
    beforeEach(() => {
        cy.viewport('macbook-11')
        cy.visit('http://localhost:3000');
    });

    it('click on feed link', () => {
        cy.get('header nav a').contains('Лента заказов').click()
        cy.visit('http://localhost:3000/feed');
    });

    it('click on not auth profile link', () => {
        cy.get('header nav a').contains('Личный кабинет').click()
        cy.visit('http://localhost:3000/login');
    });

    it('click on auth profile link', () => {
        cy.get('header nav a').contains('Личный кабинет').click()

        cy.get('input[type="email"]').type('mamaevmn@yandex.ru')
        cy.get('input[type="password"]').type('qwerty123')
        cy.get('button[type="submit"]').click()

        cy.get('header nav a').should('not.have.text', 'Личный кабинет')
        cy.url().should('eq', `http://localhost:3000/profile`)
    });
}); 