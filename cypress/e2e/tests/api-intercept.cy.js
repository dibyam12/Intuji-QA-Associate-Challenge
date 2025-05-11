describe('API Intercepts', () => {
//  1. GET /productsList 
  it('GET ProductsList API', () => {
    cy.request('GET', 'https://automationexercise.com/api/productsList')
    .then((response) => {
      expect(response.status).to.eq(200);
    });
  });


    // 2. POST /productsList 
  it('POST ProductsList API', () => {
    cy.request('POST', 'https://automationexercise.com/api/productsList')
    .then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // 3. GET /brandsList
  it('GET /BrandsList API ', () => {
    cy.request('GET','https://automationexercise.com/api/brandsList')
      .then((response) => {
        expect(response.status).to.eq(200);
      });
  });

});