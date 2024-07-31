document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird');
    const gameDisplay = document.querySelector('.game-container');
    const ground = document.querySelector('.ground-moving');
    const playButton = document.querySelector('.play-button');
    const restartButton = document.querySelector('.restart-button');
    const scoreDisplay = document.querySelector('.score');

    let birdLeft = 220;
    let birdBottom = 100;
    let gravity = 2;
    let isGameOver = false;
    let gameTimerId;
    let obstacleTimerId;
    let gap = 430;
    let score = 0;

    function startGame() {
        birdBottom -= gravity;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
    }

    function control(e) {
        if (e.keyCode === 32) {
            jump();
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50;
        bird.style.bottom = birdBottom + 'px';
    }

    function generateObstacle() {
        let obstacleLeft = 500;
        let randomHeight = Math.random() * 60;
        let obstacleBottom = randomHeight;
        const obstacle = document.createElement('div');
        const topObstacle = document.createElement('div');

        if (!isGameOver) {
            obstacle.classList.add('obstacle');
            topObstacle.classList.add('topObstacle');
        }

        gameDisplay.appendChild(obstacle);
        gameDisplay.appendChild(topObstacle);

        obstacle.style.left = obstacleLeft + 'px';
        topObstacle.style.left = obstacleLeft + 'px';
        obstacle.style.bottom = obstacleBottom + 'px';
        topObstacle.style.bottom = obstacleBottom + gap + 'px';

        function moveObstacle() {
            obstacleLeft -= 2;
            obstacle.style.left = obstacleLeft + 'px';
            topObstacle.style.left = obstacleLeft + 'px';

            if (obstacleLeft === -60) {
                clearInterval(timerId);
                gameDisplay.removeChild(obstacle);
                gameDisplay.removeChild(topObstacle);
                score++;
                scoreDisplay.textContent = score;
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200) ||
                birdBottom === 0
            ) {
                gameOver();
                clearInterval(timerId);
            }
        }

        let timerId = setInterval(moveObstacle, 20);
        if (!isGameOver) obstacleTimerId = setTimeout(generateObstacle, 3000);
    }

    function gameOver() {
        clearInterval(gameTimerId);
        clearTimeout(obstacleTimerId);
        isGameOver = true;
        document.removeEventListener('keyup', control);
        restartButton.style.display = 'block';
    }

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none';
        birdBottom = 100;
        isGameOver = false;
        score = 0;
        scoreDisplay.textContent = score;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        ground.classList.add('ground-moving');
        document.addEventListener('keyup', control);
        gameTimerId = setInterval(startGame, 20);
        generateObstacle();
    });

    restartButton.addEventListener('click', () => {
        restartButton.style.display = 'none';
        const obstacles = document.querySelectorAll('.obstacle, .topObstacle');
        obstacles.forEach(obstacle => obstacle.remove());
        birdBottom = 100;
        isGameOver = false;
        score = 0;
        scoreDisplay.textContent = score;
        bird.style.bottom = birdBottom + 'px';
        bird.style.left = birdLeft + 'px';
        ground.classList.add('ground-moving');
        document.addEventListener('keyup', control);
        gameTimerId = setInterval(startGame, 20);
        generateObstacle();
    });
});
