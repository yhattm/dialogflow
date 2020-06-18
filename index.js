const express = require("express");
const { WebhookClient, Card, Suggestion } = require("dialogflow-fulfillment");
const { invest, bus, gas, token } = require("yhattmtslib");

// bus.status().then(busStatus => console.log(busStatus))
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/", (req, res) => processWebhook(req, res));
app.get("/option", (req, res) => processOption(req, res));

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port;
  console.log("App now running on port", port);
});

var processWebhook = (request, response) => {
  const agent = new WebhookClient({
    request,
    response
  });
  console.log("Dialogflow Request headers: " + JSON.stringify(request.headers));
  console.log("Dialogflow Request body: " + JSON.stringify(request.body));

  const welcome = agent => {
    agent.add(`Welcome to my agent!`);
  };

  const fallback = agent => {
    agent.add(`I didn't understand`);
  };

  const busToCompany = async agent => {
    const busStatus = await bus.ToCompany();
    console.log(busStatus);
    agent.add(busStatus);
  };

  const busFromCompany = async agent => {
    const busStatus = await bus.FromCompany();
    console.log(busStatus);
    agent.add(busStatus);
  };

  const busStatus = async agent => {
    const busStop = agent.parameters.busStop;
    if (busStop) {
      agent.add("Bus stop: " + busStop);
    } else {
      agent.add("What is bus stop?");
    }
  };

  const exchangeFn = async agent => {
    const exchangeRate = await invest.GetExchange();
    console.log(exchangeRate);
    agent.add(exchangeRate);
  };

  const stockFn = async agent => {
    const stockPrice = await invest.GetStock();
    console.log(stockPrice);
    agent.add(stockPrice);
  };

  const goldFn = async agent => {
    const goldPrice = await invest.GetGold();
    console.log(goldPrice);
    agent.add(goldPrice);
  };

  const gasFn = async agent => {
    const gasPrice = await gas.getPrice();
    console.log(gasPrice);
    agent.add(gasPrice);
  };

  const investFn = async agent => {
    const [gasPrice, exchangeRate, stockPrice, goldPrice] = [
      await gas.getPrice(),
      await invest.GetExchange(),
      await invest.GetStock(),
      await invest.GetGold()
    ];

    console.log(gasPrice + exchangeRate + stockPrice + goldPrice);
    agent.add(gasPrice + exchangeRate + stockPrice + goldPrice);
  };

  const awsTokenFn = agent => {
    const awsToken = token.GetAWS();
    console.log(awsToken);
    agent.add(awsToken);
  };

  const timestampFn = agent => {
    const date = new Date(agent.parameters.number);
    console.log(date.toString());
    agent.add(date.toString());
  };

  // // Uncomment and edit to make your own intent handler
  // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function yourFunctionHandler(agent) {
  //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
  //   agent.add(new Card({
  //       title: `Title: this is a card title`,
  //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
  //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
  //       buttonText: 'This is a button',
  //       buttonUrl: 'https://assistant.google.com/'
  //     })
  //   );
  //   agent.add(new Suggestion(`Quick Reply`));
  //   agent.add(new Suggestion(`Suggestion`));
  //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  // }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Bus status to company", busToCompany);
  intentMap.set("Bus status from company", busFromCompany);
  intentMap.set("Bus status", busStatus);
  intentMap.set("Get exchange rate", exchangeFn);
  intentMap.set("Get stock", stockFn);
  intentMap.set("Get gold", goldFn);
  intentMap.set("Get gas price", gasFn);
  intentMap.set("Get invest", investFn);
  intentMap.set("Get AWS token", awsTokenFn);
  intentMap.set("Parse timestamp", timestampFn);
  agent.handleRequest(intentMap);
};

var processOption = async (req, res) => {
  const option = await invest.GetOption(req.query);
  console.log(option);
  res.send(option);
};
