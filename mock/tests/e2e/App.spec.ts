import { expect, test } from "@playwright/test";

/**
 * Testing class. The label at the start of each test corresponds to a test that is
 * described in the README.
 */

// If you needed to do something before every test case...
test.beforeEach(() => {
  // Nothing yet...
});

/////////////////////////// GENERAL UTILITY TESTING ///////////////////////////

test("L1 -> On page load, I see a login button.", async ({ page }) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Login")).toBeVisible();
});

test("L1 -> On page load, I dont see the input box until login.", async ({
  page,
}) => {
  // Notice: http, not https! Our front-end is not set up for HTTPs.
  await page.goto("http://localhost:8000/");
  await expect(page.getByLabel("Sign Out")).not.toBeVisible();
  await expect(page.getByLabel("Command input")).not.toBeVisible();

  // click the login button
  await page.getByLabel("Login").click();
  await expect(page.getByLabel("Sign Out")).toBeVisible();
  await expect(page.getByLabel("Command Prompt")).toBeVisible();
});

test("L2 -> After I type into the input box, its text changes.", async ({
  page,
}) => {
  // Step 1: Navigate to a URL
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  // Step 2: Interact with the page
  // Locate the element you are looking for
  await page.getByLabel("Command Prompt").click();
  await page.getByLabel("Command Prompt").fill("Awesome command");

  // Step 3: Assert something about the page
  // Assertions are done by using the expect() function
  const mock_input = `Awesome command`;
  await expect(page.getByLabel("Command Prompt")).toHaveValue(mock_input);
});

test("L2 -> On REPL page load, I see a submit button.", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await expect(
    page.getByRole("button", { name: "Submit Command!" })
  ).toBeVisible();
});

test("L3, C1 -> After I click the button, my command gets pushed.", async ({
  page,
}) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("Awesome command");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Command not found. ");
});

/////////////////////////// MODE SWITCH TESTING ///////////////////////////

test("M1, M2 -> Switch to brief mode with no history.", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("mode brief");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Mode has been changed to brief. ");
});

test("M1 -> Switch to verbose mode with no history.", async ({ page }) => {
  // CHANGED
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("mode verbose");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  // you can use page.evaulate to grab variable content from the page for more complex assertions
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual(
    "Command: mode verbose Output: Mode has been changed to verbose."
  );
});

test("M3 -> Mode of the history is changed as well.", async ({ page }) => {
  // Submit command.
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("Awesome command");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  // Use page.evaulate to grab variable content from the page for more complex assertions.
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Command not found. ");

  // Switch to verbose mode.
  await page.getByLabel("Command Prompt").fill("mode verbose");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const updatedFirstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(updatedFirstChild).toEqual(
    "Command: Awesome command Output: Command not found."
  );

  const updatedSecondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(updatedSecondChild).toEqual(
    "Command: mode verbose Output: Mode has been changed to verbose."
  );
});

/////////////////////////// LOAD TESTING ///////////////////////////

test("L1 -> Load basic CSV file", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load basic csv
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  //view basic csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });

  expect(secondChild).toEqual(" JulianYellowMonkeyBananasAsiaPinkCatNerds ");
});

test("L2 -> Load CSV file that doesn't exist", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load a file that doesn't exist
  await page.getByLabel("Command Prompt").fill("load CS32.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Invalid file. ");
});

test("L3 -> Load with no file provided", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load with no file
  await page.getByLabel("Command Prompt").fill("load ");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Invalid file. ");
});

test("L4 -> Load not accessible filepath", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //loading file outside of data directory
  await page.getByLabel("Command Prompt").fill("load data/../partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" Invalid file. ");
});

test("L5 -> Load given extra arguments", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load with extra arguments
  await page.getByLabel("Command Prompt").fill("load children.csv extra arguments");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  //will still load as long as first argument is a file
  expect(firstChild).toEqual(" The file children.csv was loaded! ");
});

test("L6 -> Load view load view", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load first csv
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file partners.csv was loaded! ");
  //view first csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" JulianYellowMonkeyBananasAsiaPinkCatNerds ");

  //load second csv
  await page.getByLabel("Command Prompt").fill("load children.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(thirdChild).toEqual(" The file children.csv was loaded! ");
  //view second csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const fourthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(fourthChild).toEqual(" 0123kirbyqorbqorvettetoothy ");
});

test("L7-S8 -> Load malformed CSV then search it", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load malformed csv
  await page.getByLabel("Command Prompt").fill("load malformed.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file malformed.csv was loaded! ");

  //try and search a value
  await page.getByLabel("Command Prompt").fill("search value");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  //error message
  expect(secondChild).toEqual(" Unable to search due to malformed rows. ");
});

test("L8-V4 -> Load and view empty CSV", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load an empty csv
  await page.getByLabel("Command Prompt").fill("load empty.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file empty.csv was loaded! ");

  //view empty csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  //nothing in the csv
  expect(secondChild).toEqual("  ");
});

/////////////////////////// VIEW TESTING ///////////////////////////

test("V1 -> View normal CSV", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load normal csv
  await page.getByLabel("Command Prompt").fill("load children.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file children.csv was loaded! ");

  //view csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" 0123kirbyqorbqorvettetoothy ");
});

test("V2 -> View malformed CSV", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //load a malformed csv
  await page.getByLabel("Command Prompt").fill("load malformed.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file malformed.csv was loaded! ");

  //view a malformed csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  //space in the middle
  expect(secondChild).toEqual(" redblue grass ");
});

test("V2 -> View with no CSV loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //view without loading first
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" File was not loaded. ");
});

/////////////////////////// SEARCH TESTING ///////////////////////////

test("S1 -> Search by column name", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load withHeaders.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

  //search by header name
  await page.getByLabel("Command Prompt").fill("search Asia Name");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Asia20studentshe/her ");
});

test("S2 -> Search by column id", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load withHeaders.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

  //search by index
  await page.getByLabel("Command Prompt").fill("search Asia 0");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Asia20studentshe/her ");
});

test("S3 -> Search by negative column", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  //search with negative column
  await page.getByLabel("Command Prompt").fill("search Julian -1");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Column is out of range. ");
});

test("S4 -> Search by out of range column", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  //search with a column > #of columns
  await page.getByLabel("Command Prompt").fill("search Julian 20");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Column is out of range. ");
});

test("S5 -> Search with no CSV loaded", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  //search without loading first
  await page.getByLabel("Command Prompt").fill("search Julian");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(secondChild).toEqual(" File was not loaded. ");
});

test("S6 -> Search with no results", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
     const history = document.querySelector(".repl-history");
     return history?.children[0]?.textContent;
   });

  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  //search with a value not in the CSV
  await page.getByLabel("Command Prompt").fill("search unfoundValue");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Could not find specified value. ");
});

test("S7 -> Search string with spaces", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  await page.getByLabel("Command Prompt").fill("search Julian Dhanda");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Not a valid column. ");
});

test("S9 -> Search with no value", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();
  await page.getByLabel("Command Prompt").fill("load partners.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();

  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });

  expect(firstChild).toEqual(" The file partners.csv was loaded! ");

  //search with no value specified
  await page.getByLabel("Command Prompt").fill("search");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" Value was not specified. ");
});


test('L1-V1-S1 x2: load search view twice', async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.getByLabel("Login").click();

  //load first csv
  await page.getByLabel("Command Prompt").fill("load withHeaders.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const firstChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[0]?.textContent;
  });
  expect(firstChild).toEqual(" The file withHeaders.csv was loaded! ");

  //view first csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const secondChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[1]?.textContent;
  });
  expect(secondChild).toEqual(" NameAgeOccupationPronounsAsia20studentshe/herJulian19studenthe/him ");

  //search first csv
  await page.getByLabel("Command Prompt").fill("search Asia 1");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const thirdChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[2]?.textContent;
  });
  expect(thirdChild).toEqual(" Asia20studentshe/her ");

  //load second csv
  await page.getByLabel("Command Prompt").fill("load children.csv");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const fourthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[3]?.textContent;
  });
  expect(fourthChild).toEqual(" The file children.csv was loaded! ");

  //view second csv
  await page.getByLabel("Command Prompt").fill("view");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const fifthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[4]?.textContent;
  });
  expect(fifthChild).toEqual(
    " 0123kirbyqorbqorvettetoothy "
  );

  //search second csv
  await page.getByLabel("Command Prompt").fill("search unfoundValue");
  await page.getByRole("button", { name: "Submit Command!" }).click();
  const sixthChild = await page.evaluate(() => {
    const history = document.querySelector(".repl-history");
    return history?.children[5]?.textContent;
  });
  expect(sixthChild).toEqual(" Could not find specified value. ");


})
