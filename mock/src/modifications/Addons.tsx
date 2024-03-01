import { REPLFunction } from "../components/REPLClasses/REPLFunction";

/**
 * A class that includes a mock add-on function.
 * 
 * @returns a map of an add-on function.
 */
export function Addons() {
  const myFunction = new Map();

  /**
   * A mock add-on function.
   * 
   * @param args is unused.
   * @returns a message.
   */
  const bananas: REPLFunction = (args: string[]) => {
    return "I am going bananas!"
  };

  myFunction.set("bananas", bananas);

  return myFunction;
}
