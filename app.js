const CosmosClient = require("@azure/cosmos").CosmosClient;

const cosmosEndpoint = "https://localhost:8081";
const key = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

const cosmosClient = new CosmosClient({
    endpoint: cosmosEndpoint,
    key: key
});

const database = cosmosClient.database('RetailDatabase');
const container = database.container('ShoppingCart');

class CartAction {
    constructor(CartId, Action, Item, Price, BuyerState) {
        this.CartId = CartId;
        this.Action = Action;
        this.Item = Item;
        this.Price = Price;
        this.BuyerState = BuyerState;
    }
}

const items =
    [
        "Unisex Socks", "Women's Earring", "Women's Necklace", "Unisex Beanie",
        "Men's Baseball Hat", "Unisex Gloves", "Women's Flip Flop Shoes", "Women's Silver Necklace",
        "Men's Black Tee", "Men's Black Hoodie", "Women's Blue Sweater", "Women's Sweatpants",
        "Men's Athletic Shorts", "Women's Athletic Shorts", "Women's White Sweater", "Women's Green Sweater",
        "Men's Windbreaker Jacket", "Women's Sandal", "Women's Rainjacket", "Women's Denim Shorts",
        "Men's Fleece Jacket", "Women's Denim Jacket", "Men's Walking Shoes", "Women's Crewneck Sweater",
        "Men's Button-Up Shirt", "Women's Flannel Shirt", "Women's Light Jeans", "Men's Jeans",
        "Women's Dark Jeans", "Women's Red Top", "Men's White Shirt", "Women's Pant", "Women's Blazer Jacket", "Men's Puffy Jacket",
        "Women's Puffy Jacket", "Women's Athletic Shoes", "Men's Athletic Shoes", "Women's Black Dress", "Men's Suit Jacket", "Men's Suit Pant",
        "Women's High Heel Shoe", "Women's Cardigan Sweater", "Men's Dress Shoes", "Unisex Puffy Jacket", "Women's Red Dress", "Unisex Scarf",
        "Women's White Dress", "Unisex Sandals", "Women's Bag"
    ];

const states = [
    "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA", "GU", "HI", "ID", "IL", "IN",
    "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM",
    "NY", "NC", "ND", "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VI",
    "VA", "WA", "WV", "WI", "WY"
];

const prices = [

    3.75, 8.00, 12.00, 10.00,
    17.00, 20.00, 14.00, 15.50,
    9.00, 25.00, 27.00, 21.00, 22.50,
    22.50, 32.00, 30.00, 49.99, 35.50,
    55.00, 50.00, 65.00, 31.99, 79.99,
    22.00, 19.99, 19.99, 80.00, 85.00,
    90.00, 33.00, 25.20, 40.00, 87.50, 99.99,
    95.99, 75.00, 70.00, 65.00, 92.00, 95.00,
    72.00, 25.00, 120.00, 105.00, 130.00, 29.99,
    84.99, 12.00, 37.50
];

const actionTypes = [
    "Viewed",
    "Added",
    "Purchased"
];

const random = (min = 0, max = 50) => {
    let num = Math.random() * (max - min) + min;

    return Math.floor(num);
};

var GenerateCartActionData = function() {

    var actions = new Array();

    var itemIndex = random(0, items.length - 1);
    var stateIndex = random(0, states.length - 1);
    var actionIndex = random(0, actionTypes.length - 1);

    var action = new CartAction(
        random(1000, 99999),
        actionTypes[actionIndex],
        items[itemIndex],
        prices[itemIndex],
        states[stateIndex]
    );

    if (action.Action != "Viewed")
    {
        var previousActions = new Array("Viewed");

        if (action.Action == "Purchased")
        {
            previousActions.push("Added");
        }

        previousActions.forEach(previousAction => {
            var previous = new CartAction(
                action.CartId,
                previousAction,
                action.Item,
                action.Price,
                action.BuyerState
            );

            actions.push(previous);
        });

    }

    actions.push(action);
    return actions;
}

for (let i = 0; i < 3; i++) {
    var shoppingCartData = GenerateCartActionData();
    shoppingCartData.forEach(async (cartAction) => {
        try {
            // await container.items.create(cartAction);
            console.log("Generated sample item for cartId: ", cartAction.CartId)
            await container.items.create(cartAction);

        }
        catch(e){
            console.log("Error Occurred", e)
        }
    });
};