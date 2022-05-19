import datas from '../../fixtures/testData.json';

describe('customer registration journey', () => {
    datas.forEach((data) => {
        context(`viewport: ${data.viewport}`, () => {
            beforeEach(() => {
                cy.viewport(data.viewport);

            });
            it('should invoke API and validate response', () => {
                    cy.request({
                        method: "GET",
                        url: "https://dog.ceo/api/breeds/list/all",
                        body: {
                        },
                        headers: {
                            "content-type": "application/json",
                        },
                    }).then(function (response) {
                        expect(response.status).to.equal(200);
                        expect(response.body.status).to.equal("success")
                        expect(response.body.message.retriever).exist
                        expect(response.body.message.retriever[0]).to.equal("chesapeake")
                        expect(response.body.message.retriever[1]).to.equal("curly")
                        expect(response.body.message.retriever[2]).to.equal("flatcoated")
                        expect(response.body.message.retriever[3]).to.equal("golden")
                    });
            });
        });
    });
});
