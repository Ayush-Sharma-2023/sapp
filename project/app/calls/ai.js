const http = require('https');

function getProductInfo(productCode, callback) {
    const options = {
        method: 'GET',
        hostname: 'myhealthbox.p.rapidapi.com',
        port: null,
        path: `/product/documents?nman_code=${productCode}`,
        headers: {
            'x-rapidapi-key': 'c0ce457d46mshf251fdafa6dd123p10342bjsn86754a4a2d44',
            'x-rapidapi-host': 'myhealthbox.p.rapidapi.com'
        }
    };

    const req = http.request(options, function (res) {
        const chunks = [];

        res.on('data', function (chunk) {
            chunks.push(chunk);
        });

        res.on('end', function () {
            const body = Buffer.concat(chunks);
            callback(body.toString());
        });
    });

    req.end();
}

// Simple chatbot function
function chatbot(userInput) {
    if (userInput.toLowerCase().includes('product x')) {
        // If the user asks for product X, fetch the details from API
        getProductInfo('eu_hum_EMEA_H_C_000471', (response) => {
            console.log('Chatbot response:', response);
        });
    } else {
        console.log("Chatbot: I'm sorry, I didn't understand that.");
    }
}

// Example usage: user sends a message
chatbot('Tell me about product X');
