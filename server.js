const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

// lire les formulaires
app.use(express.urlencoded({ extended: true }));

// fichiers statiques (HTML, CSS)
app.use(express.static(path.join(__dirname, "public")));

// session
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));

// page login
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// login
app.post("/login", (req, res) => {
  const { user, pass } = req.body;

  if (
    (user === "clement" && pass === "azerty") ||
    (user === "pablo" && pass === "1234")
  ) {
    req.session.user = user;
    res.redirect("/home");
  } else {
    res.send("Erreur login");
  }
});

// 🔥 PAGE HOME AVEC NOM UTILISATEUR
app.get("/home", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/");
  }

  res.send(`
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="UTF-8">
      <title>Accueil</title>
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>

      <div class="navbar">
        <h1>MonSite</h1>
        <div>
          <a href="/logout" class="btn">Déconnexion</a>
        </div>
      </div>

      <div class="center">
        <div class="card">
          <h2>🏠 Accueil</h2>
          <p>Bienvenue <strong>${req.session.user}</strong> 👋</p>
        </div>
      </div>

    </body>
    </html>
  `);
});

// logout
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

// port Render
app.listen(process.env.PORT || 3000, () => {
  console.log("Serveur lancé");
});