
      const container = document.querySelector("#balloon-container");
      const accentPicker = document.querySelector("#accent-picker");

      const BALLOON_LIMIT = 10;
      const SPAWN_INTERVAL = 1450;
      const BALLOON_LIFETIME = 9000;
      const balloonColours = [
        "#ff6284",
        "#6ee955",
        "#9069cf",
        "#62beac",
        "#dd8c45",
        "#babeff",
        "##b8b836",
        "#ff2020",
        /*  "#e88da8",
        "#e9b68f",
        "#b9a6d8",
        "#9fc8c0",
        "#f0c9a7",*/
      ];

      function balloonGen() {
        if (container.childElementCount >= BALLOON_LIMIT) return;

        const balloon = document.createElement("div");
        balloon.className = "balloon";
        balloon.style.left = `${Math.random() * 96}vw`;
        balloon.style.setProperty(
          "--balloon-color",
          balloonColours[Math.floor(Math.random() * balloonColours.length)]
        );
        balloon.style.setProperty("--drift", `${Math.random() * 70 - 35}px`);

        container.appendChild(balloon);

        // animationend is the reliable cleanup fallback for each balloon.
        balloon.addEventListener("animationend", () => balloon.remove(), {
          once: true,
        });
        // Safety cleanup in case an animation event is interrupted.
        window.setTimeout(() => balloon.remove(), BALLOON_LIFETIME + 300);
      }

      balloonGen();
      window.setInterval(balloonGen, SPAWN_INTERVAL);

      function hexToRgba(hex, alpha) {
        const value = hex.replace("#", "");
        const red = parseInt(value.slice(0, 2), 16);
        const green = parseInt(value.slice(2, 4), 16);
        const blue = parseInt(value.slice(4, 6), 16);
        return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
      }

      accentPicker.addEventListener("input", (event) => {
        const colour = event.target.value;
        document.documentElement.style.setProperty("--accent", colour);
        document.documentElement.style.setProperty(
          "--accent-soft",
          hexToRgba(colour, 0.18)
        );
      });

      document.querySelector("#reveal-button").addEventListener("click", () => {
        document.querySelector("#surprise-message").classList.add("show");
        document.querySelector("#reveal-button").textContent =
          "A wish just for you 💗";
      });
    