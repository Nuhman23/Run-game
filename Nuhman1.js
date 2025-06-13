ctx.fillRect(0, groundY + player.size, 800, 400 - groundY - player.size);
  }

  function drawPlayer() {
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.size, player.size);
  }

  function drawObstacles() {
    ctx.fillStyle = 'black';
    obstacles.forEach(ob => {
      ctx.fillRect(ob.x, ob.y, ob.size, ob.size);
    });
  }

  function update() {
    if (gameOver) return;

    player.vy += player.gravity;
    player.y += player.vy;

    if (player.y > groundY) {
      player.y = groundY;
      player.vy = 0;
    }

    if (frame % 60 === 0) {
      obstacles.push({ x: 800, y: groundY, size: 40 });
    }

    obstacles.forEach(ob => ob.x -= 5);
    obstacles = obstacles.filter(ob => ob.x + ob.size > 0);

    obstacles.forEach(ob => {
      if (player.x < ob.x + ob.size && player.x + player.size > ob.x &&
          player.y < ob.y + ob.size && player.y + player.size > ob.y) {
        gameOver = true;
        alert('Game Over! Score: ' + score);
      }
    });

    score++;
  }

  function gameLoop() {
    ctx.clearRect(0, 0, 800, 400);
    drawBackground();
    drawPlayer();
    drawObstacles();
    update();

    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);

    if (!gameOver) {
      requestAnimationFrame(gameLoop);
    }
  }

  document.addEventListener('keydown', e => {
    if (e.code === 'Space' && player.y === groundY) {
      player.vy = player.jump;
    }
  });

  gameLoop();
</script>

</body>
</html>