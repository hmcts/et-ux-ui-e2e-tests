const testConfig = require('../../../config.js');

const postcode = 'LS9 9HE';
const workPostcode = 'LS7 4QE';
const selectedWorkAddress = '7, Valley Gardens, Leeds, LS7 4QE';
const addressOption = '3, Skelton Avenue, Leeds, LS9 9HE';
const firstLineOfAddress = '7, Valley Gardens?';

Feature('End To End; Work Allocation - Reconfiguration Tasks --EnW/Scotland via case Transfer  ');
Scenario(
  'Submit a case from England & wales - Case Admin Submit and Reconfiguration Tasks',
  async ({
    I,
    basePage,
    loginPage,
    taskListPage,
    personalDetailsPage,
    employmentAndRespondentDetailsPage,
    claimDetailsPage,
    submitClaimPage,
    caseListPage,
    et1CaseVettingPages,
    et1CaseServingPages,
    listHearingPages,
    workAllocationTaskPages,
    caseTransferPage,
  }) => {
    I.amOnPage('/');
    await loginPage.registerNewAccount();
    await basePage.processPreLoginPagesForTheDraftApplication(postcode);
    await loginPage.processLoginWithNewAccount();
    await taskListPage.processPostLoginPagesForTheDraftApplication();
    await personalDetailsPage.processPersonalDetails(postcode, 'Scotland', addressOption);
    await employmentAndRespondentDetailsPage.processStillWorkingJourney(
      workPostcode,
      selectedWorkAddress,
      firstLineOfAddress,
    );
    await claimDetailsPage.processClaimDetails();
    let submissionReference = await submitClaimPage.submitClaim();
    I.click('Sign out');
    I.amOnPage(testConfig.TestUrlForManageCaseAAT);
    await loginPage.processLoginOnXui(
      testConfig.TestEnvAdminETManageCaseUser,
      testConfig.TestEnvAdminETManageCasePassword,
    );
    await caseListPage.searchCaseApplicationWithSubmissionReference('Eng/Wales - Singles', submissionReference);

    let caseNumber = await caseListPage.processCaseFromCaseList(submissionReference);
    await caseListPage.processCaseFromCaseList(submissionReference);
    //vet the case
    await caseListPage.verifyCaseDetailsPage();
    await caseListPage.selectNextEvent('ET1 case vetting'); //Firing the ET1 Event.
    await et1CaseVettingPages.processET1CaseVettingPages(caseNumber);
    //accept the case
    await caseListPage.selectNextEvent('Accept/Reject Case'); //Case acceptance or rejection Event
    await et1CaseServingPages.processET1CaseServingPages(caseNumber);
    //List a Hearing for the case
    I.wait(10);
    await caseListPage.selectNextEvent('List Hearing');
    await listHearingPages.listCase();
    //Update Hearing
    await caseListPage.selectNextEvent('Hearing Details');
    await listHearingPages.updateHearing();
    await caseListPage.selectTab('tasks', submissionReference);
    await workAllocationTaskPages.clickAssignToLink('Draft And Sign Judgment', 'JUDICIAL');
    await workAllocationTaskPages.assignToAPerson('Owen Montes');
    //Task Reconfiguration -- Transfer a case
    await caseTransferPage.transferCase('Case Transfer (Scotland)', 'Test Transfer');
    I.refreshPage();
    await caseListPage.proceedtoWATaskPage();
    I.wait(10);
    //check Location being Re-configured
    I.see('Glasgow');
  },
).tag('@nightly');
