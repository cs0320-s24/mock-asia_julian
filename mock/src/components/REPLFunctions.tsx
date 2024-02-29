/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */
export interface REPLFunction {
  (args: Array<string>): String | String[][];
}
const map = new Map();

function load() {
  return "load";
};






















function view() {}

function search() {}

map.set("load", load);
map.set("view",view);
map.set("search", search);