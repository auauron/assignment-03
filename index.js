import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const users = {};

app
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, "public")));

app.post(["/api/signup", "/signup"], (req, res) => {
  const { firstname, lastname, email, birthdate, password, repassword } =
    req.body || {};

  if (
    !firstname ||
    !lastname ||
    !email ||
    !birthdate ||
    !password ||
    !repassword
  ) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  if (password !== repassword) {
    return res
      .status(400)
      .json({ success: false, message: "Passwords do not match." });
  }

  if (String(password).length <= 8) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const isValidEmail = normalizedEmail.includes("@") && normalizedEmail.endsWith(".com");
  if (!isValidEmail) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email must contain @ and end with .com",
      });
  }
  if (users[normalizedEmail]) {
    return res
      .status(409)
      .json({ success: false, message: "User already exists." });
  }

  users[normalizedEmail] = {
    firstname: String(firstname).trim(),
    lastname: String(lastname).trim(),
    email: normalizedEmail,
    birthdate: String(birthdate).trim(),
    password: String(password),
  };

  return res.json({ success: true, message: "Signup successful." });
});

app.post(["/api/login", "/login"], (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required." });
  }

  const normalizedEmail = String(email).toLowerCase().trim();
  const isValidEmail =
    normalizedEmail.includes("@") && normalizedEmail.endsWith(".com");
  if (!isValidEmail) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Email must contain @ and end with .com",
      });
  }
  if (String(password).length <= 8) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 8 characters.",
      });
  }
  const user = users[normalizedEmail];
  if (!user || user.password !== String(password)) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid credentials." });
  }

  return res.json({
    success: true,
    message: "Login successful.",
    user: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      birthdate: user.birthdate,
    },
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server has started at http://localhost:${PORT}`);
});
