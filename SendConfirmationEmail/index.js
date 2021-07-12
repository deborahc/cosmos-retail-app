module.exports = async function (context, documents) {
    if (!!documents && documents.length > 0) {
        for (let i = 0; i < documents.length; i++) {
            if (documents[i].Event == "Checkout") {
                SendConfirmationEmail(documents[i].UserId, documents[i].Order)
            }

        }
    }
}
