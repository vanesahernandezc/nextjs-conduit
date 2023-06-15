export default async function getCurrentUser() {
  try {
    const token = localStorage.getItem("userLogged");
    if (!token) {
      return;
    }

    const response = await fetch("https://api.realworld.io/api/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
      },
    });

    const userInfo = await response.json();
  } catch (error) {
    console.error(error);
  }
}
