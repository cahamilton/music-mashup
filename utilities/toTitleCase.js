/** @format */

/**
 * Converts string to Title Case
 * @param string
 * @returns {String}
 */
const toTitleCase = (string) => {
  return string
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, (match) => match.toUpperCase());
};

module.exports = toTitleCase;
