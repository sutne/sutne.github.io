import Cookies from 'universal-cookie';

const cookies = new Cookies();

/**
 * Stores all key-value pairs as cookies in the form `description.key: value`
 */
export function updateCookieSettings<T>(description: string, values: T) {
  for (const [key, value] of Object.entries(values as object)) {
    cookies.set(`${description}.${key}`, value, { path: '/' });
  }
}

/**
 * Returns all cookies that match the `description` and keys in the
 * given `defaultValues`
 */
export function getCookies<T>(description: string, defaultValues: T): T {
  const values = { ...defaultValues };
  for (const [key] of Object.entries(values as object)) {
    let cookieValue = cookies.get(`${description}.${key}`);
    if (cookieValue === undefined || cookieValue === 'undefined') continue; // use default
    // JSON.parse to correctly convert datatypes ("false" => false, "0" => 0)
    cookieValue = JSON.parse(cookieValue);
    (values[key as keyof T] as typeof cookieValue) = cookieValue;
  }
  return values;
}

/**
 * Deletes all stored cookies, regardless of their description
 */
export function deleteAllCookies() {
  const allCookies = cookies.getAll();
  for (const [key] of Object.entries(allCookies)) {
    cookies.remove(key);
  }
}
