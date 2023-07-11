import {Given} from "cypress-cucumber-preprocessor/steps";
import * as cypress from "cypress";


Given('I visit The Coffee App', () => {
  cy.visit('http://localhost:3333/')
})
