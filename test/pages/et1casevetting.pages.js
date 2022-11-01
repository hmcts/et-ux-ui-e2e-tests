const { I } = inject();
const Continue = 'Continue';
const et1CaseVetting = 'ET1 case vetting';

module.exports = {
  locators: {
    //ET1 Vetting Pages...
    can_we_serve_claim_yes_option: { xpath: "//input[@id='et1VettingCanServeClaimYesOrNo_Yes']" },
    is_there_an_acas_certificate_yes_option: { xpath: "//input[@id='et1VettingAcasCertIsYesOrNo1_Yes']" },
    are_these_codes_correct_yes_option: { xpath: "//input[@id='areTheseCodesCorrect_Yes']" },
    is_track_allocation_correct_yes_option: { xpath: "//input[@id='isTrackAllocationCorrect-Yes']" },
    is_location_correct_yes_option: { xpath: "//input[@id='isLocationCorrect-Yes']" },
    do_you_want_to_suggest_a_hearing_venue_yes_option: { xpath: "//input[@id='et1SuggestHearingVenue_Yes']" },
    hearing_venues_options: { xpath: "//select[@id='et1HearingVenues']" },
    is_the_respondent_a_major_government_agency_no_option: { xpath: "//input[@id='et1GovOrMajorQuestion_No']" },
    reasonable_adjustment_questions_no_option: { xpath: "//input[@id='et1ReasonableAdjustmentsQuestion_No']" },
    can_claimant_attend_a_video_hearing_yes_option: { xpath: "//input[@id='et1VideoHearingQuestion_Yes']" },
    suggest_hearing_venue_yes_option: { xpath: "//input[@id='et1SuggestHearingVenue_Yes']" },
  },

  async processET1CaseVettingPages(caseNumber) {
    await this.processBeforeYourStartPage(caseNumber);
    await this.processMinimumRequiredInformationPage(caseNumber);
    await this.processACASCertificatePage(caseNumber);
    await this.processPossibleSubstantiveDefectsPage(caseNumber);
    await this.processJurisdictionCodePage(caseNumber);
    await this.processTrackAllocationPage(caseNumber);
    await this.processTribunalLocationPage(caseNumber);
    await this.processListingDetailsPage(caseNumber);
    await this.processFurtherQuestionsPage(caseNumber);
    await this.processPossibleReferralToACaseOfficerPage(caseNumber);
    await this.processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage(caseNumber);
    await this.processOtherFactorsPage(caseNumber);
    await this.processFinalNotesPage(caseNumber);
    await this.processCheckYourAnswersPage(caseNumber);
    await this.processET1CaseVettingPage(caseNumber);
  },

  async verifyET1CasePageHeading(caseNumber) {
    I.waitForText(et1CaseVetting, 30);
    I.waitForText('Case Number: ' + caseNumber, 30);
  },

  async processBeforeYourStartPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Before you start', 30);
    await I.click(Continue);
  },

  async processMinimumRequiredInformationPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Minimum required information', 30);
    I.checkOption(this.locators.can_we_serve_claim_yes_option);
    await I.click(Continue);
  },

  async processACASCertificatePage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForElement(this.locators.is_there_an_acas_certificate_yes_option, 30);
    I.checkOption(this.locators.is_there_an_acas_certificate_yes_option);
    await I.click(Continue);
  },

  async processPossibleSubstantiveDefectsPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Possible substantive defects (Optional)', 30);
    await I.click(Continue);
  },

  async processJurisdictionCodePage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Jurisdiction Codes', 30);
    I.checkOption(this.locators.are_these_codes_correct_yes_option);
    await I.click(Continue);
  },

  async processTrackAllocationPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Track allocation', 30);
    I.checkOption(this.locators.is_track_allocation_correct_yes_option);
    await I.click(Continue);
  },

  async processTribunalLocationPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Tribunal location', 30);
    I.checkOption(this.locators.is_location_correct_yes_option);
    await I.click(Continue);
  },

  async processListingDetailsPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Listing details', 30);
    I.checkOption(this.locators.suggest_hearing_venue_yes_option);
    I.selectOption(this.locators.hearing_venues_options, '5: Leeds');
    await I.click(Continue);
  },

  async processFurtherQuestionsPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Further questions', 30);
    I.checkOption(this.locators.is_the_respondent_a_major_government_agency_no_option);
    I.checkOption(this.locators.reasonable_adjustment_questions_no_option);
    I.checkOption(this.locators.can_claimant_attend_a_video_hearing_yes_option);
    await I.click(Continue);
  },

  async processPossibleReferralToACaseOfficerPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Possible referral to a judge or legal officer', 30);
    await I.click(Continue);
  },

  async processPossibleReferralToARegionalEmploymentJudgeOrPresidentPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Possible referral to Regional Employment Judge or Vice-President', 30);
    await I.click(Continue);
  },

  async processOtherFactorsPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Other factors', 30);
    await I.click(Continue);
  },

  async processFinalNotesPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Final notes', 30);
    await I.click(Continue);
  },

  async processCheckYourAnswersPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Check your answers', 30);
    I.see('Check the information below carefully.');
    I.see('Contact Details');
    I.see('Can we serve the claim with these contact details?');
    I.see('Are these codes correct?');
    I.see('Is the track allocation correct?');
    I.see('Is this location correct?');
    I.see('Do you want to suggest a hearing venue?');
    I.see('Hearing venue selected');
    I.see('Is the respondent a government agency or a major employer?');
    I.see('Are reasonable adjustments required?');
    I.see('Can the claimant attend a video hearing?');
    await I.click('Submit');
  },

  async processET1CaseVettingPage(caseNumber) {
    await this.verifyET1CasePageHeading(caseNumber);
    I.waitForText('Do this next', 30);
    I.see('You must accept or reject the case or refer the case.');
    I.click("//a[contains(text(),'accept or reject the case')]");
  },
};
