export const CY_BASE_URL = 'http://localhost:3000' as const;
export const INGREDIENTS_SECTION = 'section[data-cy-section="burger-ingredients"]' as const;
export const CONSTRUCTOR_SECTION = 'section[data-cy-section="burger-constructor"]' as const;
export const MODAL_SECTION = 'section[data-cy-section="modal"]' as const;
export const HEADER_LINK = 'header nav a' as const;

export const CONSTRUCTOR_SECTION_DRAGGEBLE_ELEMENT = `${CONSTRUCTOR_SECTION} ul li[draggable="true"]` as const;

export const LOGIN = 'mamaevmn@yandex.ru' as const;
export const PASSWORD = 'qwerty123' as const;

export function dragOnConstructorSectionSomeIngredients () {
    const dataTransfer = new DataTransfer;
    
    const draggable_bun = cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="bun"] > ul li[draggable="true"] > a`).eq(0)
    const draggable_main = cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="main"] > ul li[draggable="true"] > a`).eq(0)
    const draggable_sauce = cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="sauce"] > ul li[draggable="true"] > a`).eq(0)
    const droppable = cy.get('section[data-cy-section="burger-constructor"]')

    draggable_bun.trigger('dragstart', { dataTransfer})
    droppable.trigger('drop', { dataTransfer})
    draggable_main.trigger('dragstart', { dataTransfer})
    droppable.trigger('drop', { dataTransfer})
    draggable_sauce.trigger('dragstart', { dataTransfer})
    droppable.trigger('drop', { dataTransfer})

    cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="bun"] > ul li > a .counter__num`).eq(0).should('have.text', '2')
    cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="main"] > ul li > a .counter__num`).eq(0).should('have.text', '1')
    cy.get(`${INGREDIENTS_SECTION} ul li[data-tab-content="sauce"] > ul li > a .counter__num`).eq(0).eq(0).should('have.text', '1')
}