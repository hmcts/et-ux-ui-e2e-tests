import { BasePage } from "./basePage";
import { params } from "../utils/config";
import { expect } from "@playwright/test";


export default class CitizenHubPage extends BasePage {

  elements = {
    returnToExistingClaim:this.page.locator('[href="/return-to-existing?lng=en"]'),
    employmentTribunalAccount:this.page.locator( '#return_number_or_account-2'),
    veiwResponseLink: '[href="/case-document/response-acknowledgement"]',
    et3ResponseLink: '[href="/case-document/response-from-respondent"]',
    statusBeforeView: '.govuk-tag--blue',
    statusAfterView: '//strong[contains(.,"Viewed")]',
    welshToggle: '//a[.="Cymraeg"]',
    linkToAttachedDocument: '[class="govuk-link"]',
    linkToReplyRespondentApplications: '//a[contains(.,"Respondent\'s applications")]',
    respondButton: '#respond-button',
    responseTextElement: '.govuk-label--m',
    providingMaterialYes: '#supporting-material-yes-no',
    addTextToResponse: '#respond-to-application-text',
    supportingMaterialAttachment: '#supportingMaterialFile',
    uploadButton: '#upload',
    contactTribunalAboutMyCase: '[href="/contact-the-tribunal"]',
    linkToET3Response: '[href="/case-document/response-from-respondent"]',
    contactTribunalLinkRegistered: this.page.locator('[href="/contact-the-tribunal"]'),
    openAllApplicationType: '//span[@class="govuk-accordion__show-all-text"]',
    welshContactTribunalLinkRegistered: '[href="/contact-the-tribunal?lng=cy"]',
    showAllApplicationType: '#contact-options',
    withdrawClaimLink: this.page.locator('[href="/contact-the-tribunal/withdraw?lng=en"]'),
    applicationTextField: this.page.locator('#Contact-Application-Text'),
    changePersonalDetail: '[href="/contact-the-tribunal/change-details"]',
    postponeMyHearing: '[href="/contact-the-tribunal/postpone"]',
    revokeAnOrder: '[href="/contact-the-tribunal/vary"]',
    reconsiderDecision: '[href="/contact-the-tribunal/reconsider-decision"]',
    amendClaim: '[href="/contact-the-tribunal/amend"]',
    orderRespondent: '[href="/contact-the-tribunal/respondent"]',
    orderWitness: '[href="/contact-the-tribunal/witness"]',
    respondentNotComplied: '[href="/contact-the-tribunal/non-compliance"]',
    restrictPublicity: '[href="/contact-the-tribunal/publicity"]',
    strikeOutResponse: '[href="/contact-the-tribunal/strike"]',
    reconsiderJudgment: '[href="/contact-the-tribunal/reconsider-judgement"]',
    somethingElse: '[href="/contact-the-tribunal/other"]',
    submitHearingDocument: '[href="/prepare-documents?lng=en"]',
    startPreparingHearingDoc: '//a[contains(.,"Start now")]',
    hearingDocAgreeDoc: '#bundlesRespondentAgreedDocWith',
    continueButton: '#main-form-submit',
    firstListedCase: '#about-hearing-documents1',
    myDocumentOption: '[value="My hearing documents only"]',
    witnessStatementOnly: '[value="Witness statements only"]',
    uploadHearingDocButton: '#hearingDocument',
    uploadHearingFile: '#upload',
    backButton: '//a[.="Back"]',
    quidanceTextPayload: '.govuk-template__body .govuk-grid-column-two-thirds > .govuk-body',
    changeYourDocument: '//a[contains(.,"Change Your documents")]',
    closeAndReturnButton: '//a[contains(.,"Close and return to case overview")]',
    yesOptionOnRule92: this.page.locator('#copyToOtherPartyYesOrNo'),
    noOptionOnRule92: this.page.locator('#copyToOtherPartyYesOrNo-2'),
    addInfoToNoOption: this.page.locator('#copyToOtherPartyText'),
    submitApplicationButton: this.page.locator('#main-form-submit'),
    returntoCUIcaseOverviewButton:this.page.locator( '//a[contains(.,"Close and return to case overview")]'),
    notificationFlagBefore: '.govuk-tag--red',
    notificationLink: '[href="/tribunal-orders-and-requests"]',
    seeNotificationDetailsLink: 'td:nth-of-type(2) > .govuk-link',
    sendNotifButton: 'td:nth-of-type(2) > .govuk-link',
   // respondButton: '.govuk-template__body .govuk-grid-row .govuk-button',
    tribunalResponseField: '#response-text',
    noSupportingMaterialOption: '[for="supporting-material-yes-no-2"]',
    responseSubmitButton: '#main-form-submit',
    yesRule92Button: '[for="copyToOtherPartyYesOrNo-2"]',
    closeStoredApplication: '#main-content .govuk-button',
    returnOverviewButton: '.govuk-template__body > .govuk-width-container > .govuk-button-group > .govuk-button',
    notificationFlagAfter: '.app-task-list > li:nth-of-type(5) .govuk-tag',
    closeAndReturnToCaseOverview: '#main-content .govuk-button',
    viewCorrespondenceLink: '//a[.="View correspondence"]',
    confirmedCopyCheckBox: '#confirmCopied',
    submit:this.page.locator('[type="submit"]')
  }

    async processCitizenHubLogin(username, password) {
      await this.page.goto(params.TestUrlCitizenUi);
      await this.elements.returnToExistingClaim.click();
      await this.elements.employmentTribunalAccount.check();
      await this.clickContinue();
      await this.loginCitizenUi(username, password);
    }

    async loginCitizenUi(username, password){
      await this.page.locator('#username').fill(username);
      await this.page.locator('#password').fill(password);
      await this.elements.submit.click();
    }

    async verifyCitizenHubCaseOverviewPage(caseNumber) {
      await expect(this.page.locator('#main-content')).toContainText('Case overview');
      await expect(this.page.locator('#caseNumber')).toContainText('Case number ' + caseNumber);
    }

   async clicksViewLinkOnClaimantApplicationPage(submissionReference) {
      await this.page.goto(params.TestUrlCitizenUi + '/citizen-hub/' + submissionReference);
    }
  //
  //   verifyET3RespondentResponseonCUI() {
  //     I.waitForElement(this.veiwResponseLink, 10);
  //     I.see("The tribunal has acknowledged the respondent's response.");
  //     I.scrollTo(this.et3ResponseLink);
  //     I.wait(2);
  //     I.see('Ready to view', { css: this.statusBeforeView });
  //     I.click(this.veiwResponseLink);
  //     I.waitForElement(this.linkToAttachedDocument, 20);
  //     I.see('Acknowledgement of response');
  //     I.click(this.linkToAttachedDocument);
  //     I.forceClick(this.backButton);
  //     I.waitForElement(this.et3ResponseLink, 20);
  //     // the change of status is failing to be fixed by PET team
  //     //I.see('Viewed', { css: this.statusAfterView });
  //   },
    async regAccountContactTribunal(applicationType) {
      await this.elements.contactTribunalLinkRegistered.isVisible();
      await this.elements.contactTribunalLinkRegistered.click();
      await expect(this.page.locator('h1')).toContainText('Contact the tribunal about your case');
      await expect(this.page.locator('#main-content')).toContainText('Call the Employment Tribunal customer contact centre');
      await this.page.getByRole('button', { name: 'Show all sections' }).click();
      try {
        switch (applicationType) {
          case 'withdraw all or part of my claim':
            await this.page.locator('#contact-options-heading-1').isVisible();
            await this.elements.withdrawClaimLink.isVisible();
            await this.elements.withdrawClaimLink.click();
            await this.elements.applicationTextField.isVisible();
            await this.elements.applicationTextField.fill( 'blah blah');
            await this.clickContinue();
            break;
          // case 'change personal details':
          //   I.waitForElement('#contact-options-content-2', 5);
          //   I.click(this.changePersonalDetail);
          //   I.waitForElement('#main-content', 20);
          //   I.see('I want to change my personal details');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'postpone hearing':
          //   I.waitForElement('#contact-options-content-3', 5);
          //   I.click(this.postponeMyHearing);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply to postpone my hearing');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'revoke an order':
          //   I.waitForElement('#contact-options-content-4', 5);
          //   I.click(this.revokeAnOrder);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply to vary or revoke an order');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'decision consider afresh':
          //   I.waitForElement('#contact-options-content-5', 5);
          //   I.click(this.reconsiderDecision);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply to have a decision considered afresh');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'amend my claim':
          //   I.waitForElement('#contact-options-content-6', 5);
          //   I.click(this.amendClaim);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply to amend my claim');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'order respondent':
          //   I.waitForElement('#contact-options-content-7', 5);
          //   I.click(this.orderRespondent);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Order the respondent to do something');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'order witness':
          //   I.waitForElement('#contact-options-content-8', 5);
          //   I.click(this.orderWitness);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Order a witness to attend to give evidence');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'respondent has not complied':
          //   I.waitForElement('#contact-options-content-9', 5);
          //   I.click(this.respondentNotComplied);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Tell the tribunal the respondent has not complied with an order');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'restrict publicity':
          //   I.waitForElement('#contact-options-content-10', 5);
          //   I.click(this.restrictPublicity);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply to restrict publicity');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'strike out response':
          //   I.waitForElement('#contact-options-content-11', 5);
          //   I.click(this.strikeOutResponse);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Strike out all or part of the response');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'reconsider judgment':
          //   I.waitForElement('#contact-options-content-12', 5);
          //   I.click(this.reconsiderJudgment);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Apply for a judgment to be reconsidered');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          // case 'contact tribunal about something else':
          //   I.waitForElement('#contact-options-content-13', 5);
          //   I.click(this.somethingElse);
          //   I.waitForElement('#main-content', 20);
          //   I.see('Contact the tribunal');
          //   I.scrollPageToBottom();
          //   I.fillField(this.applicationTextField, 'blah blah');
          //   I.click('Continue');
          //   break;
          case 'submit document for hearing':
            await this.page.waitForSelector(this.elements.submitHearingDocument, { timeout: 20000 });
            await this.page.locator(this.elements.submitHearingDocument).click();
            await this.page.waitForSelector('#main-content', { timeout: 20000 });
            await expect(this.page.locator('h2.govuk-heading-l')).toContainText('Prepare and submit documents for a hearing');
            break;
          default:
            throw new Error('... invalid option, check you options');
        }
      } catch (e) {
        console.error('invalid option', e.message);
      }
    }
   async rule92Question(option) {
      switch (option) {
        case 'yes':
          await this.elements.yesOptionOnRule92.check();
          break;
        case 'no':
          await this.elements.noOptionOnRule92.check();
          await this.elements.addInfoToNoOption.fill('dont want other party to see this')
          break;
        default:
          throw new Error('... you can only select a yes or no option on rule 92 page');
      }
      await this.clickContinue();
    }
    async cyaPageVerification() {
      await expect(this.page.locator('dl')).toContainText('Application type');
      await expect(this.page.locator('dl')).toContainText('What do you want to tell or ask the tribunal?');
      await expect(this.page.locator('dl')).toContainText('Supporting material');
      await expect(this.page.locator('dl')).toContainText('Do you want to copy this correspondence to the other party to satisfy the Rules of Procedure?');
      await this.elements.submitApplicationButton.click();
      await expect(this.page.locator('h1')).toContainText('You have sent your application to the tribunal');
      await this.elements.returntoCUIcaseOverviewButton.click();
    }

  //   respondToSendNotification(notificationType) {
  //     I.see('The tribunal requires some information from you.');
  //     I.scrollTo(this.notificationLink);
  //     I.wait(2);
  //     I.see('Not started yet', { css: this.notificationFlagBefore });
  //     I.click(this.notificationLink);
  //     I.see('All orders and requests');
  //     I.click(this.sendNotifButton);
  //     I.see('You must respond to the tribunal');
  //     I.click(this.respondButton);
  //     I.see('Your response');
  //     I.see("What's your response to the tribunal?");
  //     I.fillField(this.tribunalResponseField, 'Testing');
  //     I.click(this.noSupportingMaterialOption);
  //     I.click(this.responseSubmitButton);
  //     I.see('Copy this correspondence to the other party');
  //     I.click(this.yesOptionOnRule92);
  //     I.click(this.responseSubmitButton);
  //     switch (notificationType) {
  //       case 'cmo':
  //         I.see('Check your answers');
  //         I.click(this.responseSubmitButton);
  //         I.see('You have sent your response to the tribunal');
  //         break;
  //       case 'request':
  //         I.see('Respond to the tribunal');
  //         I.click(this.responseSubmitButton);
  //         I.see('You have stored your application');
  //         I.click(this.closeStoredApplication);
  //         I.see('You have stored correspondence which you have not submitted to the tribunal');
  //         I.click(this.viewCorrespondenceLink);
  //         I.see('Confirm you have copied this correspondence to the other party');
  //         I.see('Have you copied this correspondence to the other party?');
  //         I.checkOption(this.confirmedCopyCheckBox);
  //         I.click(this.responseSubmitButton);
  //         I.see('You have sent your application to the tribunal');
  //         break;
  //       default:
  //         throw new Error('... invalid option, check you options');
  //
  //     }
  //     //I.waitForElement(this.veiwResponseLink, 10);
  //     I.waitForElement(this.returnOverviewButton, 10);
  //     I.click(this.returnOverviewButton);
  //     I.scrollTo(this.notificationLink);
  //     switch (notificationType) {
  //       case 'cmo':
  //         I.see('Submitted', { css: this.notificationFlagAfter });
  //         break;
  //       case 'request':
  //         I.see('Viewed', { css: this.notificationFlagAfter });
  //         break;
  //       default:
  //         throw new Error('... invalid option, check you options');
  //
  //     }
  //   },
  //   verifyContentInWelsh() {
  //     I.click(this.welshToggle);
  //     I.wait(10);
  //     I.see('Eich hawliad');
  //     I.see('Yr ymateb');
  //     I.see('Eich gwrandawiadau');
  //     I.see('Ceisiadau i’r tribiwnlys');
  //     I.see('Gorchmynion a cheisiadau gan y tribiwnlys');
  //     I.see('Dyfarniadau gan y tribiwnlys');
  //     I.see('Dogfennau’r achos');
  //     I.seeInCurrentUrl('?lng=cy');
  //     I.click(this.contactTribunalLinkRegistered);
  //     I.wait(10);
  //     I.see('Cuddio pob adran');
  //     I.see('Ffonio canolfan gyswllt cwsmeriaid y Tribiwnlys Cyflogaeth');
  //     I.see('Cymru a Lloegr');
  //     I.see('Gwasanaeth Cymraeg');
  //   },
  //
  //   claimantViewAndRespondToECC() {
  //     //I.waitForElement(this.veiwResponseLink, 10);
  //     I.refreshPage();
  //     I.waitForText('The tribunal has sent you a notification: Send Notification Title', 15);
  //     I.scrollTo(this.notificationLink);
  //     I.wait(2);
  //     I.see('Not started yet', { css: this.notificationFlagBefore });
  //     I.click(this.notificationLink);
  //     I.see('All orders and requests');
  //     I.click(this.sendNotifButton);
  //     I.see('Send Notification Title');
  //     I.click(this.respondButton);
  //     I.see('Your response');
  //     I.see("What's your response to the tribunal?");
  //     I.fillField(this.tribunalResponseField, 'Testing');
  //     I.click(this.noSupportingMaterialOption);
  //     I.click(this.responseSubmitButton);
  //     I.see('Check your answers');
  //     I.click(this.responseSubmitButton);
  //     I.see('You have sent your response to the tribunal');
  //     I.click(this.returnOverviewButton);
  //     I.scrollTo(this.notificationLink);
  //     I.see('Submitted', { css: this.notificationFlagAfter });
  //   },
  //
  //   cliamantViewEccAcceptanceNotification() {
  //     //I.waitForElement(this.veiwResponseLink, 10);
  //     I.refreshPage();
  //     I.waitForText('The tribunal has sent you a notification: Send Notification Title', 15);
  //     I.scrollTo(this.notificationLink);
  //     I.wait(2);
  //     I.see('Not started yet', { css: this.notificationFlagBefore });
  //     I.click(this.notificationLink);
  //     I.see('All orders and requests');
  //     I.click(this.sendNotifButton);
  //     I.waitForText('Claimant only', 10);
  //   },
  //
    async submitDocumentForHearingClaimant() {
      await this.page.waitForSelector(this.elements.startPreparingHearingDoc, { timeout: 10000 });
      await expect(this.page.locator('h2.govuk-heading-l')).toContainText('Prepare and submit documents for a hearing');
      await this.page.locator(this.elements.startPreparingHearingDoc).click();
      await this.page.waitForSelector(this.elements.hearingDocAgreeDoc, { timeout: 5000 });
      await this.page.locator(this.elements.hearingDocAgreeDoc).check();
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.firstListedCase, { timeout: 10000 });
      await this.page.locator(this.elements.firstListedCase).check();
      await expect(this.page.locator('h1')).toContainText('About your hearing documents');
      await this.page.locator(this.elements.myDocumentOption).check();
      await this.page.locator(this.elements.witnessStatementOnly).check();
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.uploadHearingFile, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('Upload your file of documents');
      await this.page.setInputFiles(this.elements.uploadHearingDocButton, 'test/data/welshTest.pdf');
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.elements.uploadHearingFile).click();
      await this.page.waitForTimeout(3000);
      await this.page.locator(this.elements.continueButton).click();
      await this.page.waitForSelector(this.elements.changeYourDocument, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('Check your answers');
      await this.elements.submitApplicationButton.click();
      await this.page.waitForSelector(this.elements.closeAndReturnButton, { timeout: 10000 });
      await expect(this.page.locator('h1')).toContainText('You have sent your hearing documents to the tribunal');
      await expect(this.page.locator('//*[@id="main-content"]/div/div[1]/p')).toHaveText(
      'Your documents are now uploaded. The tribunal will let you know ' +
      'if they have any questions about the documents you have submitted.'
      );
      await this.page.locator(this.elements.closeAndReturnButton).click();
    }
  //
  //   claimantReplyToRespondApplication(app_type) {
  //     I.waitForElement(this.linkToReplyRespondentApplications, 10);
  //     I.click(this.linkToReplyRespondentApplications);
  //     const appToRep = `//tbody[@class='govuk-table__body']/tr[1]//a[contains(.,"${app_type}")]`;
  //     console.log(appToRep);
  //     I.click(appToRep);
  //     I.waitForElement(this.respondButton, 10);
  //     I.click(this.respondButton);
  //     I.waitForElement(this.responseTextElement, 10);
  //     I.see('What\'s your response to the application?');
  //     I.fillField(this.responseTextElement, 'Testing Claimant Response to LR');
  //     I.checkOption(this.providingMaterialYes);
  //     I.click(this.continueButton);
  //     I.waitForElement(this.supportingMaterialAttachment, 10);
  //     I.see('Provide supporting material');
  //     I.attachFile(this.supportingMaterialAttachment, 'test/data/welshTest.pdf');
  //     I.wait(2);
  //     I.click(this.uploadButton);
  //     I.waitForText('Remove', 10);
  //     I.click(this.continueButton);
  //
  //   }
  // };
}
