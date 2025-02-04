import { BasePage } from "./basePage";
import { expect } from "@playwright/test";
const today = new Date();
export default class Et1CaseServingPage extends BasePage {

  elements = {

    //ET1 Vetting Pages...
    date_accepted_day: this.page.locator('#dateAccepted-day'),
    date_accepted_month: this.page.locator('#dateAccepted-month'),
    date_accepted_year: this.page.locator('#dateAccepted-year'),
  }

  async processET1CaseServingPages() {
    await this.page.getByLabel('Yes').check();
    await this.elements.date_accepted_day.fill(String(today.getDate()));
    await this.elements.date_accepted_month.fill(String(today.getMonth() +1));
    await this.elements.date_accepted_year.fill(String(today.getFullYear()));
    await this.submitButton();
  }


  async getClaimantFirstName() {
    await this.page.locator('//div[@class="mat-tab-labels"]/div[@class="mat-ripple mat-tab-label mat-focus-indicator ng-star-inserted"]/div[.="Claimant"]').click();
    const firstName = await this.page.locator('#case-viewer-field-read--claimantIndType tr:nth-of-type(2) span:nth-of-type(1) span:nth-of-type(1)').innerText();
    const lastName = await this.page.locator('#case-viewer-field-read--claimantIndType tr:nth-of-type(3) span:nth-of-type(1) span:nth-of-type(1)').innerText();
    console.log(firstName);
    console.log(lastName);
    return {
      firstName,
      lastName,
    };
  }
}

