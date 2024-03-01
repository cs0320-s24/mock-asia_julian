# Project Details
### MOCK: "SeeSV V320"

##### Team Members
Asia Nguyen (anguyen), Julian Dhanda (jdhanda).

##### Total Time Spent
20 hours.

# Design Choices

# Errors/Bugs
No Known Errors or Bugs.

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

This will be passed in as a parameter to the REPL object, where, by default, it will be passed into 
REPLInput and REPLHistory seperately so they can access and use the functions.

# Collaboration
Conceptual collaboration with 32 student Gavin Dhanda (cs login: gdhanda).

ChatGPT Help formatting table with different colors for alternating rows (near line 105 in main.css).