export function formatSlug(input) {
  if (!input) return { value: '', error: '' };

  let formatted = input.toLowerCase().replace(/\s+/g, '-');

  const validSlugRegex = /^[a-z0-9-]*$/;
  if (!validSlugRegex.test(formatted)) {
    return {
      value: formatted.replace(/[^a-z0-9-]/g, ''),
      error: 'Only lowercase letters, numbers, and hyphens are allowed.',
    };
  }

  return { value: formatted, error: '' };
}
