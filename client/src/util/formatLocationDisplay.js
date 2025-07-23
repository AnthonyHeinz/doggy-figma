/**
 * Format location display text for user-friendly presentation
 * @param {string} locationString - Raw location string that might contain prefixes
 * @param {Object} suggestion - Optional suggestion object for better formatting
 * @returns {string} - Formatted, user-friendly location text
 */
export const formatLocationDisplay = (locationString, suggestion = null) => {
  // If we have the suggestion object, use the proper formatting
  if (suggestion) {
    return formatSuggestionText(suggestion);
  }
  
  // If we only have the location string, clean it up
  if (!locationString) return '';
  
  // Remove common prefixes
  const prefixesToRemove = [
    'city:',
    'postal_code:',
    'neighborhood:',
    'county:',
    'state:',
    'school:',
    'university:'
  ];
  
  let cleanedLocation = locationString;
  
  // Remove any of the prefixes
  for (const prefix of prefixesToRemove) {
    if (cleanedLocation.startsWith(prefix)) {
      cleanedLocation = cleanedLocation.substring(prefix.length).trim();
      break;
    }
  }
  
  return cleanedLocation;
};

/**
 * Format suggestion display text based on area type
 * @param {Object} suggestion - Suggestion object from API
 * @returns {string} - Formatted display text
 */
export const formatSuggestionText = (suggestion) => {
  if (!suggestion) return '';
  
  switch (suggestion.area_type) {
    case 'city':
      if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.city || suggestion.id;

    case 'neighborhood':
      if (suggestion.neighborhood && suggestion.city && suggestion.state_code) {
        return `${suggestion.neighborhood}, ${suggestion.city}, ${suggestion.state_code}`;
      } else if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.neighborhood || suggestion.city || suggestion.id;

    case 'postal_code':
      if (suggestion.postal_code && suggestion.city && suggestion.state_code) {
        return `${suggestion.postal_code}, ${suggestion.city}, ${suggestion.state_code}`;
      } else if (suggestion.postal_code) {
        return suggestion.postal_code;
      } else if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.postal_code || suggestion.city || suggestion.id;

    case 'county':
      if (suggestion.county && suggestion.state_code) {
        return `${suggestion.county}, ${suggestion.state_code}`;
      } else if (suggestion.county) {
        return suggestion.county;
      } else if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.county || suggestion.city || suggestion.id;

    case 'state':
      if (suggestion.state) {
        return suggestion.state;
      } else if (suggestion.state_code) {
        return suggestion.state_code;
      } else if (suggestion.city) {
        return suggestion.city;
      }
      return suggestion.state || suggestion.state_code || suggestion.city || suggestion.id;

    case 'school':
      if (suggestion.school && suggestion.city && suggestion.state_code) {
        return `${suggestion.school}, ${suggestion.city}, ${suggestion.state_code}`;
      } else if (suggestion.school && suggestion.state_code) {
        return `${suggestion.school}, ${suggestion.state_code}`;
      } else if (suggestion.school) {
        return suggestion.school;
      } else if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.school || suggestion.city || suggestion.id;

    case 'university':
      if (suggestion.university && suggestion.city && suggestion.state_code) {
        return `${suggestion.university}, ${suggestion.city}, ${suggestion.state_code}`;
      } else if (suggestion.university && suggestion.state_code) {
        return `${suggestion.university}, ${suggestion.state_code}`;
      } else if (suggestion.university) {
        return suggestion.university;
      } else if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.university || suggestion.city || suggestion.id;

    default:
      if (suggestion.city && suggestion.state_code) {
        return `${suggestion.city}, ${suggestion.state_code}`;
      }
      return suggestion.city || suggestion.id;
  }
}; 