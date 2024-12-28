import { extractFormFields } from "./helper";

/**
 * Extracts input IDs and their corresponding values from a given form,
 * and updates each field's value to "test".
 * @param {string} formId - The ID of the form element to extract fields from.
 */
export function fillForm(formId) {
    extractFormFields(formId);
}
