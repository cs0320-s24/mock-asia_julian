import { expect, test } from "@playwright/test";

/**
 * Testing class. The label at the start of each test corresponds to a test that is
 * described in the README.
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
    // Nothing yet...
  })

/////////////////////////// GENERAL UTILITY TESTING ///////////////////////////

test('L1 -> On page load, I see a login button.', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Login')).toBeVisible()
})


test('L1 -> On page load, I dont see the input box until login.', async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto('http://localhost:8000/');
  await expect(page.getByLabel('Sign Out')).not.toBeVisible()
  await expect(page.getByLabel('Command input')).not.toBeVisible()
  
  // click the login button
  await page.getByLabel('Login').click();
  await expect(page.getByLabel('Sign Out')).toBeVisible()
  await expect(page.getByLabel('Command Prompt')).toBeVisible()
})


test('L2 -> After I type into the input box, its text changes.', async ({ page }) => {
  // Step 1: Navigate to a URL
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel('Command Prompt').click();
  await page.getByLabel('Command Prompt').fill('Awesome command');

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`
  await expect(page.getByLabel('Command Prompt')).toHaveValue(mock_input)
});


test('L2 -> On REPL page load, I see a submit button.', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await expect(page.getByRole('button', {name: 'Submit Command!'})).toBeVisible()
});


test('L3, C1 -> After I click the button, my command gets pushed.', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command Prompt').fill('Awesome command');
  await page.getByRole('button', {name: 'Submit Command!'}).click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Command not found. ");
});

/////////////////////////// MODE SWITCH TESTING ///////////////////////////

test('M1, M2 -> Switch to brief mode with no history.', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command Prompt').fill('mode brief');
  await page.getByRole('button', {name: 'Submit Command!'}).click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Mode has been changed to brief. ");
});


test('M1 -> Switch to verbose mode with no history.', async ({ page }) => {
  // CHANGED
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command Prompt').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit Command!'}).click()

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual("Command: mode verbose Output: Mode has been changed to verbose.");
});


test('M3 -> Mode of the history is changed as well.', async ({ page }) => {
  // Submit command.
  await page.goto('http://localhost:8000/');
  await page.getByLabel('Login').click();
  await page.getByLabel('Command Prompt').fill('Awesome command');
  await page.getByRole('button', {name: 'Submit Command!'}).click()

  // Use page.evaulate to grab variable content from the page for more complex assertions.
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Command not found. ");

  // Switch to verbose mode.
  await page.getByLabel('Command Prompt').fill('mode verbose');
  await page.getByRole('button', {name: 'Submit Command!'}).click()

  const updatedFirstChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[0]?.textContent;
  });
  expect(updatedFirstChild).toEqual("Command: Awesome command Output: Command not found.");

  const updatedSecondChild = await page.evaluate(() => {
    const history = document.querySelector('.repl-history');
    return history?.children[1]?.textContent;
  });
  expect(updatedSecondChild).toEqual("Command: mode verbose Output: Mode has been changed to verbose.");
});