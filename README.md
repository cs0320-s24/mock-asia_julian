# Project Details
### MOCK: "SeeSV V320"

##### Team Members
Asia Nguyen (anguyen), Julian Dhanda (jdhanda).

##### Total Time Spent
20 hours.

# Design Choices
## Overall Structure
First, index.tsx Generates a root element containing the main element App.tsx.

### App.tsx
Contains a header and LoginButton.tsx, which when clicked also contains a REPL.tsx.

#### LoginButton.tsx
Modifies the logged in boolean when clicked.

#### REPL.tsx
Builds the repl including a REPLHistory.tsx and REPLInput.tsx.

##### REPLHistory.tsx
A scrollable box that displays the command history.

##### REPLInput.tsx
A command line interface that uses a ControlledInput.

###### ControlledInput.tsx
A modified input box for the repl.

## Interfacing and Functions

##### REPLFunction.tsx
An interface for functions that can be called by the REPL.

##### Functions.tsx
A function class that returns a map of the default functions.

## Data Structures Used
##### Map<string, REPLFunction>
The Map of strings to REPLFunctions allows a more generalized calling of the different
functions. This is leveraged in REPLInput to enable adding and removing of functions as 
desired by the developer.

##### Constants.ts
A constants class containing a few frontend strings, and mocked csv data.

##### MockedCSVs.tsx
A class that mocks the unimplemented CSV functionality.

# Errors/Bugs
### No Known Errors or Bugs.

# Tests
### Login and Mode Change

### CSV Functionality
##### Load

##### View

##### Search

# How to
### To Run Page
To run the page, navigate to the "mock" directory, using "cd mock" in the terminal window.

Then run the command "npm start" and navigate to the link provided in the terminal response.

##### How to Use REPL
First click the button to log in.

Then, you can use the input box and the submit button on the bottom of the page to execute
the following commands.

"mode verbose"
- Switches the history style to display the command as well as the output.

"mode brief"
- Switches the history style to display just the outputs.

"load <csv-file-path>"
- Will attempt to load the given csv, which must be in the local diretory (just frontend).

"search <value> <column>"
- Will attempt to search a csv, if there is one, for any rows with the <value> in the 
specified <column> which can either be an index or header name.

"view"
- Will attempt to view the loaded csv, if there is one.

Click Sign Out when done, or to clear the history.

### To Run Tests

### To Import Alternative Functions as a Developer
You will need to create your own Map mapping strings to your own functions which must
implement the REPLFunction interface.

It must take the form...
functions: Map<string, REPLFunction>;

Where REPLFunction is described in REPLFunction.tsx

This will be passed in as a parameter to the REPLInput object as the parameter addCommands. This will
add your commands to the default build in commands described above. If you would like to remove those
commands, you will pass in the name of those commands in a list, as the parameter removeCommands to 
REPLInput. For example, removeCommands={["view"]} will make you unable to use the view command.

It attempts to remove the commands before adding the new ones, so you can override the default commands
by providing similarly named replacements, and removing them as well.

# Collaboration
Conceptual collaboration with 32 student Gavin Dhanda (cs login: gdhanda).

ChatGPT Help formatting table with different colors for alternating rows (near line 105 in main.css).