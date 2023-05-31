export default async function getTags(): Promise<string[] | undefined> {
  try {
    const api = await fetch("https://api.realworld.io/api/tags");
    const response = await api.json();
    return response.tags;
  } catch (error) {
    console.error(error);
  }
}
