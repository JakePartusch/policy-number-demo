module.exports.checkForTransfer = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));
  const { policyNumber } = event.Details.Parameters;
  return {
    isTransfer: policyNumber.startsWith("12")
  };
};

module.exports.handlePolicyNumberLex = async event => {
  console.log(JSON.stringify(event, null, 2));

  const { policyNumber } = event.currentIntent.slots;
  const { confirmationStatus } = event.currentIntent;

  if (confirmationStatus === "Confirmed") {
    const response = {
      sessionAttributes: {},
      dialogAction: {
        type: "Close",
        fulfillmentState: "Fulfilled",
        message: {
          contentType: "SSML",
          content: "<speak>Thank you.</speak>"
        }
      }
    };
    console.log(JSON.stringify(response, null, 2));
    return response;
  }

  const response = {
    sessionAttributes: {},
    dialogAction: {
      type: "ConfirmIntent",
      message: {
        contentType: "SSML",
        content: `<speak>For policy number I got <say-as interpret-as="digits">${policyNumber}</say-as>. Is that correct?</speak>`
      },
      intentName: event.currentIntent.name,
      slots: {
        policyNumber
      }
    }
  };
  console.log(JSON.stringify(response, null, 2));
  return response;
};
