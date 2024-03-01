/**
 * A constants class!
 */

// Front end visibles.
export const REPL_BOX_PROMPT = "Enter Command   |   TO LOAD A FILE >> load <csv-file-path>   |   TO SEARCH A FILE >> search <value> <column>   |   TO VIEW A FILE >> view"
export const PAGE_TITLE = "SeeSV V320"
export const COMMAND_BOX_LEGEND = "Enter a Command!"

/**
 * Mock csv data.
 */
export const MOCK_CSV_1: string[][] = [["Julian", "Yellow", "Monkey", "Bananas"], ["Asia", "Pink", "Cat", "Nerds"]]
export const MOCK_CSV_2: string[][]= [["0", "1", "2", "3"], ["kirby", "qorb", "qorvette", "toothy"]]
export const MOCK_CSV_MALFORMED: string[][] = [["red", "blue", " "], ["grass"]];
export const MOCK_CSV_SEARCH_NO_HEADERS: string [][] = [["Julian", "Yellow", "Monkey", "Bananas"]];
export const MOCK_CSV_UNFOUND_VALUE: string = "Could not find specified value.";