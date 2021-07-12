// module.exports = async function (context, req) {
//     context.log('JavaScript HTTP trigger function processed a request.');

//     const name = (req.query.name || (req.body && req.body.name));
//     const responseMessage = name
//         ? "Hello, " + name + ". This HTTP triggered function executed successfully."
//         : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

//     context.res = {
//         // status: 200, /* Defaults to 200 */
//         body: responseMessage
//     };
// }

const cosmosClient = require('./cosmos').cosmosClient;

const GenerateCartActionData = require('./cosmos').GenerateCartActionData;

module.exports = async function (context, req) {
    const database = cosmosClient.database('RetailDatabase');
    const container = database.container('ShoppingCart');
    // const { resource: createdItem } = await container.items.create(req.body);

    for (let i = 0; i < 1000; i++) {
        var shoppingCartData = GenerateCartActionData();

        shoppingCartData.forEach(async (cartAction) => {
            await container.items.create(cartAction)
        });
    };

    context.res = {
        // body: createdItem
        body: "Generating data ***************"
    };
}

