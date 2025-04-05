import { USER_API_URL } from "../config";

export async function fetchItem<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${USER_API_URL}${url}`, options);

  if (!response.ok) {
    throw new Error(`Network response was not ok. Response status: ${response.status}`);
  }

  return (await response.json()) as T;
}
