const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

async function refreshIdToken() {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const res = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error.message || "Failed to refresh token");
  }

  // Save new tokens
  localStorage.setItem("idToken", data.id_token);
  localStorage.setItem("refreshToken", data.refresh_token);
  localStorage.setItem("tokenExpiresIn", data.expires_in);
  localStorage.setItem("localId", data.user_id);

  return data.id_token;
}

export async function fetchWithAuth(url, options = {}) {
  let idToken = localStorage.getItem("idToken");

  const response = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (response.status === 401) {
    try {
      // Token might be expired — try refreshing
      idToken = await refreshIdToken();

      // Retry the request with new token
      return await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${idToken}`,
        },
      });
    } catch (err) {
      console.error("Failed to refresh token", err);
      throw err;
    }
  }

  return response;
}
