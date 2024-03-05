const PROXY_CONFIG = [
  {
    context: [
      "/NumberProcessing",
    ],
    target: "https://localhost:7050/NumberProcessing", // Alterei o target para corresponder ao endpoint correto
    secure: false
  }
];

module.exports = PROXY_CONFIG;
