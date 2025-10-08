export async function getTranslations(locale, namespace) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return messages[namespace];
}
