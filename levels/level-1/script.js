const canvas = document.getElementById("canvas");
      const context = canvas.getContext("2d");
      let selectedColor = 1;
      let isDrawing = false;

      const formasRectangulares = [
        { x: 350, y: 185, side: 160, angle: 30, numero: 1 },
        { x: 260, y: 150, width: 80, height: 70, numero: 2 },
        { x: 250, y: 185, side: 160, angle: 210, numero: 1 },
      ];

      function drawFormasRectangulares() {
        formasRectangulares.forEach((forma) => {
          const fillColor =
            forma.numero === 1 || forma.numero === 3
              ? "white"
              : forma.numero === 2
                ? "white"
                : "white";

          context.fillStyle = forma.numero === 0 ? "white" : fillColor;

          if (forma.side) {
            drawTriangle(forma.x, forma.y, forma.side, forma.angle);
          } else {
            context.fillRect(forma.x, forma.y, forma.width, forma.height);
            context.strokeRect(forma.x, forma.y, forma.width, forma.height);
          }

          if (forma.numero !== 0) {
            context.fillStyle = "black";
            context.font = "18px Arial";
            const textX = forma.x + forma.width / 2 - 8;
            const textY = forma.y + forma.height / 2 + 6;
            context.fillText(forma.numero, textX, textY);
          }
        });
      }

      function drawTriangle(x, y, side, angle) {
        context.save();
        context.translate(x, y);
        context.rotate((angle * Math.PI) / 180);

        context.beginPath();
        context.moveTo(0, 0);
        context.lineTo(side / 2, -(side * Math.sqrt(3)) / 2);
        context.lineTo(side, 0);
        context.closePath();
        context.fill();
        context.stroke();

        context.restore();
      }

      function selectColor(color) {
        selectedColor = color;
      }

      function clearCanvas() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawFormasRectangulares();
      }

      function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        formasRectangulares.forEach((forma) => {
          if (
            mouseX >= forma.x &&
            mouseX <= forma.x + (forma.side || forma.width) &&
            mouseY >= forma.y &&
            mouseY <=
              forma.y +
                (forma.side ? (forma.side * Math.sqrt(3)) / 2 : forma.height)
          ) {
            if (forma.numero === selectedColor || selectedColor === 0) {
              context.fillStyle =
                selectedColor === 0 ? "white" : getColorByNumero(selectedColor);

              if (forma.side) {
                drawTriangle(forma.x, forma.y, forma.side, forma.angle);
              } else {
                context.fillRect(forma.x, forma.y, forma.width, forma.height);
                context.strokeRect(forma.x, forma.y, forma.width, forma.height);
              }
            }
          }
        });
      }

      function getColorByNumero(numero) {
        switch (numero) {
          case 1:
            return "pink";
          case 2:
            return "yellow";
          case 3:
            return "pink";
        }
      }

      canvas.addEventListener("mousedown", () => (isDrawing = true));
      canvas.addEventListener("mouseup", () => (isDrawing = false));
      canvas.addEventListener("mousemove", draw);

      drawFormasRectangulares();