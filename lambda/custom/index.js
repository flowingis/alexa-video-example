const Alexa = require('ask-sdk-core')
const myDocument = require('./main.json')
const data = require('./data.json')

const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest'
  },
  handle (handlerInput) {
    const speakOutput = 'Ecco l\'elenco dei video disponibili'
    return handlerInput.responseBuilder
      .speak(speakOutput)
      .addDirective({
        type: 'Alexa.Presentation.APL.RenderDocument',
        token: 'nuovotoken',
        version: '1.0',
        document: myDocument,
        datasources: data
      })
      .getResponse()
  }
}

const ShowVideoHandler = {
  canHandle (handlerInput) {
    return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'ShowVideoIntent'
  },
  handle (handlerInput) {
    return handlerInput.responseBuilder
      .addVideoAppLaunchDirective('https://files-4oukdahlf.now.sh', 'Calcio TV', 'Video')
      .withShouldEndSession(true)
      .getResponse()
  }
}

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(`Error handled: ${error.stack}`)
    const speakOutput = `Sorry, I had trouble doing what you asked. Please try again.`

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse()
  }
}

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    ShowVideoHandler
  )
  .addErrorHandlers(
    ErrorHandler
  )
  .lambda()
