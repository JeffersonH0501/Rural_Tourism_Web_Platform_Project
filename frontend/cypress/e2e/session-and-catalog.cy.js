describe('Public platform',()=>{it('loads the catalog and switches language',()=>{cy.visit('/');cy.contains('Explore tours');cy.contains('ES').click();cy.contains('Explorar recorridos')})});
