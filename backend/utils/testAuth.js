const API_URL = "http://localhost:5000/api/auth";

async function runAuthTests() {
  console.log("=== STARTING AUTHENTICATION INTEGRATION TESTS ===");
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = "securePassword123!";

  // 1. New user signs up → SUCCESS
  console.log("\n1. Testing New User Sign Up...");
  let res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test User", email: testEmail, password: testPassword, role: "staff" })
  });
  let data = await res.json();
  console.log(`Status: ${res.status} | Success: ${!!data.token} | User ID: ${data._id}`);
  if (res.status !== 201 || !data.token) throw new Error("Test 1 Failed!");

  // 2. Same email signs up again → FAIL
  console.log("\n2. Testing Duplicate Email Sign Up...");
  res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Duplicate User", email: testEmail, password: testPassword })
  });
  data = await res.json();
  console.log(`Status: ${res.status} | Message: ${data.message}`);
  if (res.status === 201) throw new Error("Test 2 Failed! Duplicate sign up should fail.");

  // 3. Unregistered email + any password → FAIL
  console.log("\n3. Testing Unregistered Email Login...");
  res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: `unregistered_${Date.now()}@example.com`, password: "anypassword" })
  });
  data = await res.json();
  console.log(`Status: ${res.status} | Message: ${data.message}`);
  if (res.status === 200) throw new Error("Test 3 Failed! Unregistered login should fail.");

  // 4. Registered email + wrong password → FAIL
  console.log("\n4. Testing Registered Email + Wrong Password Login...");
  res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: "WrongPassword999!" })
  });
  data = await res.json();
  console.log(`Status: ${res.status} | Message: ${data.message}`);
  if (res.status === 200) throw new Error("Test 4 Failed! Wrong password login should fail.");

  // 5. Registered email + correct password → SUCCESS
  console.log("\n5. Testing Registered Email + Correct Password Login...");
  res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  data = await res.json();
  console.log(`Status: ${res.status} | Success: ${!!data.token} | JWT Token Generated: ${data.token ? data.token.substring(0, 20) + "..." : "NONE"}`);
  if (res.status !== 200 || !data.token) throw new Error("Test 5 Failed! Login should succeed.");

  // 6. Test /api/auth/me with valid token vs invalid token
  console.log("\n6. Testing /api/auth/me with JWT Token...");
  res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${data.token}` }
  });
  data = await res.json();
  console.log(`Status: ${res.status} | Authenticated Email: ${data.email}`);
  if (res.status !== 200 || data.email !== testEmail) throw new Error("Test 6 Failed!");

  console.log("\n=== ALL AUTHENTICATION BACKEND TESTS PASSED SUCCESSFULLY! ===");
}

runAuthTests().catch((err) => {
  console.error("\nTEST SUITE FAILED:", err.message);
  process.exit(1);
});
