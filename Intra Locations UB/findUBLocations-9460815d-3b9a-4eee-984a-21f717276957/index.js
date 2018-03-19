/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';
const Alexa = require('alexa-sdk');

//=========================================================================================================================================
//TODO: The items below this comment need your attention.
//=========================================================================================================================================

//Replace with your app ID (OPTIONAL).  You can find this value at the top of your skill's page on http://developer.amazon.com.
//Make sure to enclose your value in quotes, like this: const APP_ID = 'amzn1.ask.skill.bb4045e6-b3e8-4133-b650-72923c5980f1';
const APP_ID = undefined;

const SKILL_NAME = 'SRMCampusHelpDesk';
const GET_FACT_MESSAGE = "Hi! Welcome to UB";
const HELP_MESSAGE = 'You can ask me for locations... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Have a great day!';


var ub_locations = {"library":"ground","own book reading":"first","digital library":"first","international relations":"second","admission":"second","research":"fourth","ITKM":"fourth","student affairs":"fourth","Tamil":"fourth","incubation center":"fourth","physics":"sixth","physics lab":"sixth","nanotechnology":"sixth","software development lab":"seventh","software quality lab":"seventh","information technology":"eighth","career development center":"ninth","CDC":"ninth","director office":"ninth","administration":"ninth","academia":"ninth","account section":"ninth","maths":"tenth","mathematics":"tenth","math":"tenth","English and foreign":"eleventh","software engineering":"eleventh","university learning center":"eleventh","dual degree":"twelfth","Taiwan":"twelfth","research scholar":"twelfth","chemistry":"twelfth","chem":"twelfth","material science":"thirteenth","microbiology":"thirteenth","biochemistry":"thirteenth","high performance computing":"thirteenth","chemical science":"thirteenth","environmental":"thirteenth","scanning tunneling spectroscopy":"thirteenth","green energy":"thirteenth","photoluminescence":"thirteenth","research institute":"thirteenth","COE":"fourteenth","controller of examination":"fourteenth","registrar":"fifteenth","chancellor":"fifteenth","vice chancellor":"fifteenth","washroom":"every single floor","restroom":"every single floor","toilet":"every single floor","canteen":"fith floor","English":"eleventh"};
var full_mapping={"international relations":"Office of International Relations","admission":"Admission Enquiry","research":"Director of Research","Tamil":"Tamil Perayam","canteen":"food","controller of examination":"Controller Of Examination Office","COE":"Controller Of Examination Office","physics":"Department of Physics","physics lab":"Physics Laboratory","nanotechnology":"Department of Nanotechnology","CDC":"Career Development Center","administration":"Administration Office","academia":"Academia Help Desk","mathematics":"Department of Mathematics","maths":"Department of Mathematics","math":"Department of Mathematics","English and foreign":"Department of English and Foreign Languages","English":"Department of English and Foreign Languages","software engineering":"Department of Software Engineering","Taiwan":"Taiwan Education Center","research scholar":"Research Scholar Room","chemistry":"Department of Chemistry","chem":"Department of Chemistry","material science":"Material Science Laboratory","microbiology":"Microbiology and Biochemistry Laboratory","biochemistry":"Microbiology and Biochemistry Laboratory","chemical science":"Chemical Science Laboratory","environmental":"Environmental and Science Technology","scanning tunneling spectroscopy":"Scanning Tunneling Spectroscopy Laboratory","green energy":"Green Energy Material","photoluminescence":"Photoluminescence Spectroscopy Laboratory","registrar":"Registrar Office","chancellor":"Chancellor Office","vice chancellor":"Vice Chancellor Office","toilet":"Restrooms","restroom":"Restrooms","washroom":"Restrooms","washrooms":"Restrooms","restrooms":"Restrooms","toilets":"Restrooms","information technology":"Department of Information Technology","dual degree":"Dual Degree Center","snack":"Food","coffee":"Food","tea":"Food","food":"Food"};
var food=["food","breakfast","lunch","canteen","tea","coffee","snack","snacks"];
var washroom=["washroom","washrooms","toilets","toilet","restrooms","restroom"];
exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.registerHandlers(handlers);
    alexa.execute();
};



var handlers = {
    'LaunchRequest': function() { //Executes when a new session is launched
        this.emit('LaunchIntent');
    },

    'LaunchIntent': function() {
        this.emit(':ask', "Hi, Welcome to U.B. ... I can help you out with locations. Where would you like to go?");
    },

    'askUBLocationIntent': function() {
        var location = this.event.request.intent.slots.ub_locations.value;
        var val=ub_locations[location];
        if(val === undefined || val == null || val.length <= 0){
         this.emit(':tell',"Not sure such a place exists here! Please try again.");
         
        }
        else if(location=="canteen"){
         /*food*/
         this.emit(":tell","There is Orange Tree in the ground floor and there are canteens in every floor starting from the fifth. Do save me some food!");
         
        }
        else if(location=="washroom" || location=="toilet" || location=="restroom"){
         /*washrooms*/
         this.emit(":tell","Washrooms are availble in every single floor!");
         
        }
        else if(location in full_mapping){
         /*handling short phrases and mapping them to full phrases*/
         var phrase=full_mapping[location];
         this.emit(":tell",phrase+" would be in the "+val+" floor. Have a great day!");
         
        }
        else{
          this.emit(':tell', location+" would be in the " + val+"floor. Have a great day!");
        }
       
       
    }
};
