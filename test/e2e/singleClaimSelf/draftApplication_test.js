Feature('daftApplication');

Scenario('Make Draft Application', async ({ I, basePage }) => {
  I.amOnPage('/');
  await basePage.startDraftApplication();
});
