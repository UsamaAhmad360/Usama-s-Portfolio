const tabs = ["generator", "custom", "strength", "stronger", "multi"];
let websitePasswords = [];

function showTab(id) {
  tabs.forEach(t => {
    document.getElementById(t).classList.toggle("active", t === id);
  });
  document.getElementById("passwordDisplay").innerHTML = "";
}

function generateRandomPassword(length, sym, num, up, low, avoid) {
  let chars = '';
  if (low) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (up) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (num) chars += '0123456789';
  if (sym) chars += '!@#$%^&*()-_=+[{]};:<>?/';
  if (avoid) chars = chars.replace(/[l1O0]/g, '');
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
}

document.querySelector('button[onclick="showTab(\'generator\')"]').addEventListener('click', () => {
  const pass = generateRandomPassword(16, true, true, true, true, true);
  document.getElementById("passwordDisplay").innerHTML = `<strong>Generated:</strong> ${pass}`;
});

function generateCustomPassword() {
  const length = +document.getElementById("length").value || 16;
  const numPasswords = +document.getElementById("numPasswords").value || 1;
  const s = document.getElementById("symbols").checked;
  const n = document.getElementById("numbers").checked;
  const u = document.getElementById("uppercase").checked;
  const l = document.getElementById("lowercase").checked;
  const a = document.getElementById("avoidSimilar").checked;

  let output = [];
  for (let i = 0; i < numPasswords; i++) {
    output.push(generateRandomPassword(length, s, n, u, l, a));
  }

  document.getElementById("passwordDisplay").innerHTML = `<strong>Custom Password(s):</strong><ol>${output.map(pass => `<li>${pass}</li>`).join('')}</ol>`;
}

function checkStrength() {
  const pw = document.getElementById("passwordToCheck").value.trim();
  let result = "❌ Weak";

  if (pw.length >= 16 && /[A-Z]/.test(pw) && /[a-z]/.test(pw) && /\d/.test(pw) && /[!@#$%^&*]/.test(pw)) {
    result = "✅ Strong";
  } else if (pw.length >= 12) {
    result = "⚠️ Medium";
  }

  document.getElementById("strengthResult").innerHTML = `<strong>Strength:</strong> ${result}`;
}

function makeStrongerNow() {
  let pw = document.getElementById("passwordToImprove").value.trim();
  if (!pw) {
    document.getElementById("passwordDisplay").innerHTML = `<strong>Please enter a password to improve.</strong>`;
    return;
  }

  // Swap case
  let swapped = '';
  for (let i = 0; i < pw.length; i++) {
    const ch = pw[i];
    if (ch === ch.toUpperCase()) {
      swapped += ch.toLowerCase();
    } else {
      swapped += ch.toUpperCase();
    }
  }

  // Capitalize words
  let capitalized = swapped.replace(/\b\w/g, c => c.toUpperCase());

  // Add random symbol and number
  const symbols = ['@', '#', '!', '$'];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const number = Math.floor(100 + Math.random() * 900);

  const finalPassword = capitalized + symbol + number;

  document.getElementById("passwordDisplay").innerHTML = `<strong>Stronger Password:</strong> ${finalPassword}`;
  document.getElementById("passwordToImprove").value = finalPassword;
}

function generatePasswords() {
  const websites = document.getElementById("websitesInput").value.trim().split("\n").map(w => w.trim());
  const length = +document.getElementById("multiLength").value || 16;
  const s = document.getElementById("multiSymbols").checked;
  const n = document.getElementById("multiNumbers").checked;
  const u = document.getElementById("multiUppercase").checked;
  const l = document.getElementById("multiLowercase").checked;
  const a = document.getElementById("multiAvoidSimilar").checked;

  websitePasswords = websites.map(website => ({
    website: website,
    password: generateRandomPassword(length, s, n, u, l, a),
  }));

  document.getElementById("output").innerHTML = `<ol>${websitePasswords.map(wp => `<li>${wp.website}: <strong>${wp.password}</strong></li>`).join('')}</ol>`;
}

function exportToCSV() {
  const csvContent = "Website,Password\n" + websitePasswords.map(wp => `${wp.website},${wp.password}`).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "passwords.csv";
  link.click();
}