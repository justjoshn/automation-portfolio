/* eslint-disable jest/valid-expect */
/* eslint-disable jest/valid-expect-in-promise */
describe('REST API Tests', () => {
    const baseUrl = 'https://jsonplaceholder.typicode.com'
    const singleResourceUrl = baseUrl + '/posts/1'
    const invalidResourceUrl = baseUrl + '/posts/999999'

    it('GET /posts/1: verify the response payload contains the expected keys', () => {
        cy.request('GET', singleResourceUrl).then((response) => {
            expect(response.body).to.have.all.keys('id', 'title', 'body', 'userId')
        })
    });

    it('GET /posts/1: verify the status code is 200', () => {
        cy.request('GET', singleResourceUrl).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('GET /posts/1: verify the response time is less than 200', () => {
        cy.request('GET', singleResourceUrl).then((response) => {
            expect(response.duration).to.be.lessThan(200)
        })
    });

    it('GET /posts/999999: request a post with an id that doesnt exist and verify the server returns a 404 status code', () => {
        cy.request({method: 'GET', url: invalidResourceUrl, failOnStatusCode: false}).then((response) => {
            expect(response.status).to.eq(404)
        })
    });
});