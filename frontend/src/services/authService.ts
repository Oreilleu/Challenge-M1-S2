export async function forgotPassword(email: string): Promise<Response> {
  const response = await fetch("http://localhost:3000/forgot-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
  return response;
}

export async function resetPasswordService(token: string, password: string): Promise<Response> {
  const response = await fetch(`http://localhost:3000/reset-password/${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  return response;
}

export async function login(email: string, password: string): Promise<Response> {
  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  return response;
}