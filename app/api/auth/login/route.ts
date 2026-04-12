import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    // If a backend URL is configured, proxy the request to it
    const backendUrl = process.env.BACKEND_AUTH_URL;
    if (backendUrl) {
      try {
        const backendResponse = await fetch(backendUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });
      } catch {
        // If backend is unreachable, fall through to local auth
        console.warn("Backend unreachable, falling back to local auth");
      }
    }

    // Local authentication using environment variables
    const adminEmail = process.env.ADMIN_EMAIL || "admin@lms.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    if (email === adminEmail && password === adminPassword) {
      return NextResponse.json({
        token: `lms_token_${Date.now()}`,
        role: "admin",
        user: {
          email: adminEmail,
          name: "Admin User",
        },
        message: "Login successful",
      });
    }

    // Check additional credentials from env (format: "email1:password1:role1,email2:password2:role2")
    const extraUsers = process.env.AUTH_USERS || "";
    if (extraUsers) {
      const users = extraUsers.split(",").map((u) => {
        const [userEmail, userPassword, userRole] = u.trim().split(":");
        return { email: userEmail, password: userPassword, role: userRole || "student" };
      });

      const matchedUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (matchedUser) {
        return NextResponse.json({
          token: `lms_token_${Date.now()}`,
          role: matchedUser.role,
          user: {
            email: matchedUser.email,
            name: matchedUser.email.split("@")[0],
          },
          message: "Login successful",
        });
      }
    }

    return NextResponse.json(
      { message: "Invalid email or password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
