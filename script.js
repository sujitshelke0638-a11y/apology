(function () {
  var grid = document.getElementById("sorry-grid");
  if (grid) {
    var count = 1000;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < count; i++) {
      var cell = document.createElement("span");
      cell.className = "sorry__cell";
      cell.textContent = "sorry";
      fragment.appendChild(cell);
    }

    grid.appendChild(fragment);
  }

  var heartsRoot = document.getElementById("hearts-bg");
  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (heartsRoot && !mq.matches) {
    var heartCount = 64;
    var fragmentH = document.createDocumentFragment();

    for (var h = 0; h < heartCount; h++) {
      var heart = document.createElement("span");
      heart.className = "floating-heart";
      heart.setAttribute("aria-hidden", "true");
      heart.textContent = "\u2665";
      heart.style.left = Math.random() * 100 + "%";
      heart.style.animationDelay = Math.random() * 14 + "s";
      heart.style.animationDuration = 11 + Math.random() * 16 + "s";
      heart.style.fontSize = 14 + Math.random() * 28 + "px";
      heart.style.color =
        "rgba(" +
        (240 + Math.floor(Math.random() * 15)) +
        "," +
        (90 + Math.floor(Math.random() * 50)) +
        "," +
        (150 + Math.floor(Math.random() * 40)) +
        "," +
        (0.4 + Math.random() * 0.35) +
        ")";
      heart.style.setProperty("--drift", (Math.random() * 130 - 65) + "px");
      fragmentH.appendChild(heart);
    }

    heartsRoot.appendChild(fragmentH);
  }

  function placeNoButton() {
    var arena = document.getElementById("forgive-no-arena");
    var btn = document.getElementById("btn-no");
    if (!arena || !btn) return;
    var maxL = Math.max(4, arena.clientWidth - btn.offsetWidth - 8);
    var maxT = Math.max(4, arena.clientHeight - btn.offsetHeight - 8);
    var left = 4 + Math.random() * maxL;
    var top = 4 + Math.random() * maxT;
    btn.style.left = left + "px";
    btn.style.top = top + "px";
  }

  function burstPinkHearts() {
    var root = document.getElementById("confetti-root");
    if (!root || mq.matches) return;

    var n = 56;
    var cx = window.innerWidth / 2;
    var cy = window.innerHeight / 2;

    for (var i = 0; i < n; i++) {
      (function (idx) {
        var el = document.createElement("span");
        el.className = "pop-heart";
        el.textContent = Math.random() > 0.12 ? "\u2665" : "\u2764";
        el.style.left = cx + (Math.random() - 0.5) * 24 + "px";
        el.style.top = cy + (Math.random() - 0.5) * 24 + "px";
        var angle = (Math.PI * 2 * idx) / n + Math.random() * 0.4;
        var dist = 140 + Math.random() * 260;
        el.style.setProperty("--tx", Math.cos(angle) * dist + "px");
        el.style.setProperty("--ty", Math.sin(angle) * dist + "px");
        el.style.setProperty("--rot", Math.floor(Math.random() * 540 - 180) + "deg");
        el.style.fontSize = 16 + Math.random() * 24 + "px";
        root.appendChild(el);
        window.setTimeout(function () {
          if (el.parentNode) el.parentNode.removeChild(el);
        }, 1200);
      })(i);
    }
  }

  var btnYes = document.getElementById("btn-yes");
  var btnNo = document.getElementById("btn-no");
  var forgiveButtons = document.getElementById("forgive-buttons");
  var forgiveOutput = document.getElementById("forgive-output");
  var forgiveLine = document.getElementById("forgive-line");

  function showForgiveOutput(text, mode) {
    if (!forgiveLine || !forgiveOutput) return;
    forgiveLine.textContent = text;
    forgiveLine.className = "forgive__output-line forgive__output-line--" + mode;
    forgiveOutput.removeAttribute("hidden");
    forgiveLine.setAttribute("aria-hidden", "false");
  }

  if (btnNo && document.getElementById("forgive-no-arena")) {
    placeNoButton();
    window.addEventListener("resize", function () {
      placeNoButton();
    });

    function dodgeNo() {
      placeNoButton();
    }

    btnNo.addEventListener("mouseenter", dodgeNo);
    btnNo.addEventListener("touchstart", function () {
      dodgeNo();
    }, { passive: true });
    btnNo.addEventListener("click", function (e) {
      e.preventDefault();
      showForgiveOutput("nope you can't do that", "no");
      dodgeNo();
    });
  }

  if (btnYes && forgiveButtons && forgiveOutput && forgiveLine) {
    btnYes.addEventListener("click", function () {
      showForgiveOutput("Thank you. It means everything.", "yes");
      forgiveButtons.setAttribute("hidden", "");
      burstPinkHearts();
    });
  }
})();
