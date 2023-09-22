document.addEventListener('DOMContentLoaded', function () {
    // Size Variables (initialize first)
    let screenSize = window.innerHeight + window.innerWidth; /* Get the screen size to help determine size of everything */
    let ballSize = Math.min(72, Math.max(36, Math.floor((screenSize / 2) / 23))) /* Determine ball size based on screen size */
    let fruitSize = ballSize * 1.42; /* Determine fruit size based on ball size */
    let throwAreaSize = ballSize * 10; /* Throw area size based on ball */
    let fruitAmount = Math.round(screenSize / 700) /* Amount of fruit based on screen size */
    let fruits = document.querySelectorAll('.fruit');  /* All fruits on screen */
    // Game-start Constants
    const gameDisplay = document.getElementById('game'); /* Display of the game */
    const gameElements = document.getElementsByClassName('game-start-dependant'); /* All fruits on screen */
    const introTextElements = document.querySelectorAll('.intro-text'); /* Introduction text */
    const endGameText = document.getElementById('end-game-text'); /* End game text */
    const gameTime = 1800; /* How long the game is in milliseconds */
    const textAboveBall = document.getElementById('with-ball'); // Get text above ball
    const textOffsetY = -40; // Adjust this value to control the vertical offset

    // Ball-adjacent Constants
    const throwArea = document.getElementById('throw-area'); /* Throw area on document */
    const ball = document.getElementById('ball'); /* Ball player controls */
    const trailCircles = []; /* Trail attached to the ball */
    const trailLength = 16; /* Max trail length */
    // Fruit-adjacent Constants
    const fruitContainer = document.getElementById('fruit-container'); /* Where all the fruit should be placed */
    const fruitCounter = document.getElementById('fruit-counter'); /* Where the counted fruit/score goes */
    const wowText = document.getElementById('wow-text'); /* Text that shows wow when a fruit collision happens */
    const fruitPaths = [ // Fruit Image paths
        '../Pictures/Fruit/Orange.svg',
        '../Pictures/Fruit/Watermelon.svg',
        '../Pictures/Fruit/Cherry.svg',
        '../Pictures/Fruit/Apple.svg',
        '../Pictures/Fruit/Blueberry.svg',
        '../Pictures/Fruit/Strawberry.svg',
        '../Pictures/Fruit/Banana.svg',
        '../Pictures/Fruit/Lemon.svg',
        '../Pictures/Fruit/Raspberry.svg',
        '../Pictures/Fruit/Pear.svg',
        '../Pictures/Fruit/Pomegranate.svg',
        '../Pictures/Fruit/Grape.svg',
        '../Pictures/Fruit/Blackberry.svg',
        '../Pictures/Fruit/Kiwi.svg',
        '../Pictures/Fruit/Pineapple.svg',
        '../Pictures/Fruit/Mango.svg',
    ];
    const fruitOpacities = Array.from(fruits).map(() => 1); /* Fruit opacities, helps with transition */
    // Time Constants
    const superFruitTime = 7500;  /* Amount of time in superfruit mode in milliseconds */
    const fadeTime = .25; /* Time it takes for elements to fade out/in */
    // Progress Bar Constants
    const collectedFruitProgressBar = document.getElementById('collected-fruit-progress'); /* Collected fruit progress bar displays how many fruit til super fruit mode */
    const superFruitTimer = document.getElementById('super-fruit-timer'); /* Timer for super fruit mode */
    const backgroundBar = document.getElementById('background-bar'); /* Background bar to visually organize the progress bar */
    const radius = collectedFruitProgressBar.r.baseVal.value; /* Radius of the progress bars */
    const circleLength = (radius * Math.PI * 2); /* Circle length is the length of the circle so that super fruit mode can count down */
    // Physics Constants
    const gravity = 0.5; /* How fast ball should fall naturally */
    const friction = 0.98; /* Slow down based on bumping into walls */
    const mouseLeftThreshold = 100000000; // Define a time threshold (in milliseconds)

    // Variables
    // Game-level variables
    let gameStart = false; /* Has the game started? */
    let gameTimeCounter = gameTime; /* Time counter that counts down game time on game start */
    let firstGame = true; // Are we playing the first game?
    // Ball-adjacent Variables
    let isDragging = false; /* Is the user dragging? */
    let isReleased = false; /* Has the user released the ball after dragging */
    let velocity = { x: 0, y: 0 }; /* The speed the ball is moving at */
    let initialDragPosition = { x: 0, y: 0 }; /* Where did the user initially start dragging from? Determines ball speed. Distance away is faster and farther */
    let insideThrowArea = false; /* Is the ball inside the throw area? Tells checkCollision() where to restrict the ball */
    let mouseLeftTime = 0; // Track how long the mouse has been outside the throw area
    // Fruit Adjacent Variables
    let superFruitMode = false; /* Are you in super fruit mode? */
    let position = { x: (window.innerWidth - ballSize) / 2, y: (window.innerHeight - ballSize) / 2 }; /* Determine the position the ball is in, x and y. Initially starts in middle of screen */
    let collectedFruits = 0; // Fruit collected counting up to Super Fruit Mode. Then set back to 0
    let totalFruits = 0; // Total Fruit
    // Color Variables
    let hue = 0; /* The current hue (controls rainbow) */
    let highScore = 0; /* What is the highest score the user has achieved? */
    // Progress Bar Variables
    let percentage = 0; /* How full is the super fruit gauge? 0-100 */
    let newOffset = 0; /* Helper variable to make it easier to move the collected fruit gauge */
    let superFruitTimeTicks = (superFruitTime / 1000) * 60; /* How long is super fruit mode? This is used to help move the super fruit mode gauge */
    let step = circleLength / superFruitTimeTicks; /* Step size to make sure super fruit mode gauge moves down enough */
    let currentLength = 0; /* Current length of the progress bar so it can count down */
    // Intro sequence variables
    let bounceTicks = 350; /* Reminder to interact with the ball bounces, only when gameStart = false */

    ball.addEventListener("touchstart", (e) => {
        e.preventDefault();
    });

    function readjustSize() {
        screenSize = window.innerHeight + window.innerWidth; /* Get the screen size to help determine size of everything */
        if (!superFruitMode) {
            ballSize = Math.min(72, Math.max(36, Math.floor((screenSize / 2) / 23))) /* Determine ball size based on screen size */
            fruitSize = ballSize * 1.42; /* Determine fruit size based on ball size */
            throwAreaSize = ballSize * 10; /* Throw area size based on ball */
        }
        fruitAmount = Math.round(screenSize / 700) /* Amount of fruit based on screen size */
        ball.style.width = `${ballSize}px`;
        ball.style.height = `${ballSize}px`;
        fruits = document.querySelectorAll('.fruit');
        fruits.forEach((fruit, index) => {
            fruit.style.width = `${fruitSize}px`;
            fruit.style.height = `${fruitSize}px`;
        });
    }

    // Set progress bars
    collectedFruitProgressBar.style.strokeDasharray = `${circleLength}px`; // I hate dash array and dash offset. do not ask me what these do. this is trial and error.
    collectedFruitProgressBar.style.strokeDashoffset = `${circleLength}px`;
    superFruitTimer.style.strokeDasharray = `${circleLength}px`;
    superFruitTimer.style.strokeDashoffset = 0;

    // Root for CSS
    root = document.documentElement;
    root.style.setProperty('--stroke', (radius / 6.5)); // Stroke for the progress bars
    root.style.setProperty('--timer', (`${superFruitTime / 1000}s`)); // How much time is in the timer for super fruit time

    // Set ball sizes
    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;

    // Set high score
    function getStorageScore() {
        if (highScore < localStorage.getItem('highScore')) {
            highScore = localStorage.getItem('highScore');
        }
        else {
            let highScore = 0;
        }
    }

    getStorageScore();

    // Generate initial fruits
    function generateFruit() {
        const newFruit = document.createElement('img');
        gameDisplay.appendChild(newFruit);
        newFruit.classList.add('fruit', 'no-drag');
        newFruit.src = getRandomFruitPath();
        newFruit.style.width = `${fruitSize}px`;
        newFruit.style.height = `${fruitSize}px`;
        newFruit.style.opacity = 0;
        setFruitPositions(newFruit);
        newFruit.style.transition = 'opacity 0.25s';
        newFruit.style.opacity = 1; // Fade in the fruit

    }

    // Function to get a random fruit path
    function getRandomFruitPath() {
        const randomIndex = Math.floor(Math.random() * fruitPaths.length);
        return fruitPaths[randomIndex];
    }

    function setFruitPositions(collectedFruit) {
        // Get the collected fruit's x and y boundary
        const collectedFruitRect = collectedFruit.getBoundingClientRect();
        // Max width based on the window width
        const maxWidth = window.innerWidth - (collectedFruitRect.width * 2);
        // Max width based on the window height
        const maxHeight = window.innerHeight - (collectedFruitRect.height * 2);

        // Generate random positions within the viewport
        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        // Ensure the fruit stays within the viewport
        const x = Math.max((collectedFruitRect.width * 2), Math.min(randomX, maxWidth));
        const y = Math.max((collectedFruitRect.height * 2), Math.min(randomY, maxHeight));

        // Place fruit
        collectedFruit.style.left = `${x}px`;
        collectedFruit.style.top = `${y}px`;
    }

    // Function to check for collisions with fruits
    function fruitCollision() {
        fruits.forEach((fruit, index) => { //For each fruit in the list:
            const ballRect = ball.getBoundingClientRect(); // Get the ball's position
            const fruitRect = fruit.getBoundingClientRect(); // Get the fruit's position

            if ( // If the ball is inside the fruit
                checkBallFruitBoundingClientRects(ballRect, fruitRect)
            ) {
                // Remove that fruit
                instantOut(fruit); // Makes fruit invisible

                // Replace the fruit
                requestAnimationFrame(() => {
                    const randomFruitPath = getRandomFruitPath(); // Get a random fruit image path
                    fruit.src = randomFruitPath; // Set the fruit's image source to a new random fruit
                    setFruitPositions(fruit); // Set a new random position for the fruit

                    setTimeout(() => {
                        fadeIn(fruit); // Fade new fruit in
                    }, fadeTime); //Time until new fruit is added
                });

                // Adds to total fruit and updates it
                addToTotal();

                // Check requirements for super fruit mode
                if (collectedFruits >= 4 && !superFruitMode) {
                    superFruitMode = true; // You are in super fruit mode

                    // Handle collected fruits
                    percentage += 20;
                    newOffset = (100 - percentage) * (radius * 2 * Math.PI) / 100;
                    collectedFruitProgressBar.style.strokeDashoffset = `${newOffset}px`;
                    collectedFruits = 0; // Collected fruit to 0

                    // Summon super fruit timer
                    superFruitTimer.style.opacity = 0;
                    superFruitTimer.style.opacity = 1;

                    // Handle super fruit impacts
                    ballSize *= 2; // Ball size amplify
                    ball.style.width = `${ballSize}px`; // Ball width change
                    ball.style.height = `${ballSize}px`; // Ball height change

                    // Generate fruit
                    for (let i = 0; i < fruitAmount; i++) {
                        generateSuperFruit();
                    }

                    collectedFruitProgressBar.addEventListener('transitionend', handleTransitionEnd);
                    collectedFruits = 0; // Collected fruit to 0

                    // When super fruit mode is over:
                    setTimeout(() => {
                        if (gameStart && superFruitMode) {
                            ballSize /= 2; // Ball back to normal
                            ball.style.width = `${ballSize}px`; // Ball width change
                            ball.style.height = `${ballSize}px`; // Ball height change
                        }

                        superFruitMode = false; // No longer in super fruit mode

                        superFruitTimer.style.opacity = 0;

                        const superFruits = document.querySelectorAll('.superfruit'); // Selects everything labeled superfruit
                        superFruits.forEach(superFruit => {
                            fadeOut(superFruit) // Fades it out
                            superFruit.addEventListener('transitionend', () => { // Waits for it to finish transitioning
                                fruitContainer.removeChild(superFruit); // Removes it
                            });
                        });
                    }, superFruitTime);
                } else if (!superFruitMode) { // If not in super fruit mode
                    collectedFruits++; // Add to collected fruit
                    percentage += 20;
                    const newOffset = (100 - percentage) * (radius * 2 * Math.PI) / 100;
                    collectedFruitProgressBar.style.strokeDashoffset = `${newOffset}px`;
                }

                // Show the wow text
                wowText.textContent = 'Wow!';
                wowText.style.left = `${fruitRect.left + fruitRect.width / 2}px`;
                wowText.style.top = `${fruitRect.top}px`;
                showWowText();
            }
        });
    }

    function handleTransitionEnd() {
        percentage = 0;
        collectedFruitProgressBar.style.strokeDashoffset = `${radius * 2 * Math.PI}px`;

        // Remove the event listener when no longer needed
        collectedFruitProgressBar.removeEventListener('transitionend', handleTransitionEnd);
    }

    // Is the ball and the fruit colliding
    function checkBallFruitBoundingClientRects(ballRect, fruitRect) {
        return (
            ballRect.left < fruitRect.right &&
            ballRect.right > fruitRect.left &&
            ballRect.top < fruitRect.bottom &&
            ballRect.bottom > fruitRect.top
        );
    }

    // Animation: Instantly makes item invisible without transition
    function instantOut(object) {
        object.style.opacity = 1; // Ensure opacity 1 for instant out
        object.style.transition = 'opacity 0s';
        object.style.opacity = 0;
    }

    // Animation: Fades in an object
    function fadeIn(object) {
        object.style.opacity = 0; // Ensure opacity 0 for fade in
        object.style.transition = 'opacity ' + `${fadeTime}` + 's ease-in-out'; // Apply opacity transition
        object.style.opacity = 1; // Make the fruit visible again
    }

    // Animation: Fades out an object
    function fadeOut(object) {
        object.style.opacity = 1; // Ensure opacity 1 
        object.style.transition = 'opacity ' + `${fadeTime}` + 's ease-in-out'; // Apply opacity transition
        object.style.opacity = 0; // Make the fruit visible again
    }

    // Adds to total fruit and updates the counter
    function addToTotal() {
        // Add to total fruit counter
        totalFruits++;
        // Update the fruit counter
        fruitCounter.textContent = `${totalFruits}`;
    }

    // Function to start the timer
    function startTimer() {
        if (superFruitMode) {
            currentLength = currentLength + step;
            superFruitTimer.style.strokeDashoffset = currentLength;
        }
    }

    // Show "Wow!" text
    function showWowText() {
        wowText.style.opacity = 1;
        setTimeout(() => {
            wowText.style.opacity = 0;
        }, 2000);
    }

    // Function to generate a superfruit
    function generateSuperFruit() {
        const newFruit = document.createElement('img');
        newFruit.style.opacity = 0; // Set initial opacity to 0
        newFruit.classList.add('fruit', 'superfruit', 'no-drag');
        newFruit.src = getRandomFruitPath();
        newFruit.style.width = `${fruitSize}px`;
        newFruit.style.height = `${fruitSize}px`;
        setFruitPositions(newFruit);

        // Append the newFruit element to the DOM before fading it in
        fruitContainer.appendChild(newFruit);

        // Use requestAnimationFrame to ensure that the element is in the DOM
        requestAnimationFrame(() => {
            // Start fading in the fruit
            fadeIn(newFruit);
        });
    }

    // Create trail circles
    for (let i = 0; i < trailLength; i++) {
        const trailCircle = document.createElement('div');
        trailCircle.className = 'trail';
        trailCircles.push({
            element: trailCircle,
            position: { x: position.x, y: position.y },
            alpha: 0.3 - (0.3 / trailLength) * (trailLength - i - 1),
            hue: hue,
            hueOffset: i * 18,
        });

        // Append the trailCircle element to the gameDisplay
        gameDisplay.appendChild(trailCircle);
    }

    window.addEventListener('resize', function () {
        readjustSize();
    })


    // Event listeners for ball interactions

    ball.addEventListener('mouseover', (e) => {
        if (!gameStart) {
            bounceTicks = "no bounce";
        }
    })

    ball.addEventListener('mouseout', (e) => {
        if (!gameStart) {
            bounceTicks = 600;
        }
    })

    ball.addEventListener('pointerdown', (e) => {
        if (!gameStart) { // If the game has not started, when the mouse goes down on the ball, that means the game is starting :)
            firstGame = false;
            // Check screen size
            readjustSize()

            // Remove the intro instructional text (lower the opacity because why would i ever removechild?)
            introTextElements.forEach((element) => {
                element.style.opacity = 0;
            });

            // Generate initial fruits
            for (let i = 0; i < fruitAmount; i++) {
                generateFruit();
            }

            gameTimeCounter = gameTime;

            fruitCounter.classList.remove('enlarged');
            totalFruits = 0;
            fruitCounter.textContent = `${totalFruits}`;



            // Bring in the game elements: progress bars & wow
            for (let i = 0; i < gameElements.length; i++) {
                gameElements[i].style.opacity = 1;
            }

            // Show the fruit counter
            fruitCounter.style.opacity = 1;
            endGameText.style.opacity = 0;

            trailCircles.forEach((circle) => {
                circle.element.style.transition = 'opacity 0.25s';
                circle.element.style.opacity = 1;
            });

            // Set game start to true
            gameStart = true;
            isDragging = true;
            isReleased = false;
            velocity = { x: 0, y: 0 };
            initialDragPosition = { x: e.clientX, y: e.clientY };
            throwArea.style.display = 'block';

            const throwAreaX = position.x + ballSize / 2 - throwAreaSize / 2;
            const throwAreaY = position.y + ballSize / 2 - throwAreaSize / 2;

            throwArea.style.width = `${throwAreaSize}px`;
            throwArea.style.height = `${throwAreaSize}px`;
            throwArea.style.left = `${throwAreaX}px`;
            throwArea.style.top = `${throwAreaY}px`;
            throwArea.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.2)`;

        } else if (gameStart) {
            isDragging = true;
            isReleased = false;
            velocity = { x: 0, y: 0 };
            initialDragPosition = { x: e.clientX, y: e.clientY };
            throwArea.style.display = 'block';

            const throwAreaX = position.x + ballSize / 2 - throwAreaSize / 2;
            const throwAreaY = position.y + ballSize / 2 - throwAreaSize / 2;

            throwArea.style.width = `${throwAreaSize}px`;
            throwArea.style.height = `${throwAreaSize}px`;
            throwArea.style.left = `${throwAreaX}px`;
            throwArea.style.top = `${throwAreaY}px`;
            throwArea.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.2)`;
        }
    });

    document.addEventListener('pointermove', (e) => {
        if (gameStart) {
            if (isDragging) {
                const mouseX = e.clientX;
                const mouseY = e.clientY;

                const throwAreaCenterX = throwArea.getBoundingClientRect().left + throwAreaSize / 2;
                const throwAreaCenterY = throwArea.getBoundingClientRect().top + throwAreaSize / 2;
                const distance = Math.sqrt(
                    Math.pow(throwAreaCenterX - mouseX, 2) +
                    Math.pow(throwAreaCenterY - mouseY, 2)
                );

                if (distance <= throwAreaSize / 2) {
                    insideThrowArea = true;
                    position.x = mouseX - ballSize / 2;
                    position.y = mouseY - ballSize / 2;
                    mouseLeftTime = 0; // Reset the time when mouse re-enters the throw area
                } else if (!isReleased) {
                    insideThrowArea = false;
                    const angle = Math.atan2(mouseY - throwAreaCenterY, mouseX - throwAreaCenterX);
                    const newX = throwAreaCenterX + (throwAreaSize / 2) * Math.cos(angle) - ballSize / 2;
                    const newY = throwAreaCenterY + (throwAreaSize / 2) * Math.sin(angle) - ballSize / 2;
                    position.x = newX;
                    position.y = newY;
                }
            }
        }
    });

    document.addEventListener('pointerup', (e) => {
        if (gameStart) {
            if (isDragging) {
                isDragging = false;
                isReleased = true;
                throwArea.style.display = 'none';

                if (insideThrowArea || mouseLeftTime < mouseLeftThreshold) {
                    // Calculate the direction and magnitude from the initial drag position to the release position
                    const directionX = e.clientX - initialDragPosition.x;
                    const directionY = e.clientY - initialDragPosition.y;

                    // Set the velocity based on the direction and release speed factor
                    if (directionX !== 0 || directionY !== 0) {
                        const releaseSpeedFactor = 0.1;
                        velocity.x = directionX * releaseSpeedFactor;
                        velocity.y = directionY * releaseSpeedFactor;
                    }
                }
            }
        }
        else if (!gameStart && isDragging) {
            isDragging = false;
            isReleased = true;
            throwArea.style.display = 'none';
        }
    });

    // Add a timer to track how long the mouse has been outside the throw area
    setInterval(() => {
        if (isDragging && !insideThrowArea) {
            mouseLeftTime += 100; // Increase by 100 milliseconds
        }
    }, 100);

    // Update the high score
    function updateHighScore(score) {
        const highScoreElement = document.getElementById('high-score');
        const currentHighScore = parseInt(highScoreElement.innerText.split(': ')[1]);
        if (score > currentHighScore) {
            highScoreElement.innerText = `High Score: ${score}`;
            localStorage.setItem('highScore', score);
        }
    }

    function showScore() {
        {

            // Enlarge the score
            fruitCounter.classList.add('enlarged');

            // Fade out and remove each element (including the ball)
            let fruits = document.querySelectorAll('.fruit');
            fruits.forEach((fruit) => {
                fruit.style.transition = 'opacity 0.25s';
                fruit.style.opacity = 0;
                setTimeout(() => {
                    fruit.remove();
                }, 250); // 0.25s in milliseconds
            });

            // Fade out and remove the trail circles
            trailCircles.forEach((circle) => {
                circle.element.style.transition = 'opacity 0.25s';
                circle.element.style.opacity = 0;
            });

            for (let i = 0; i < gameElements.length; i++) {
                gameElements[i].style.transition = 'opacity 0.25s';
                gameElements[i].style.opacity = 0;
                setTimeout(() => {
                    gameElements[i].remove;
                }, 250); // 0.25s in milliseconds
            }

            if (isDragging) {
                throwArea.style.transition = 'opacity 0.25s';
                throwArea.style.opacity = 0;
            }
        }
        setTimeout(() => {
            if (highScore < totalFruits) {
                highScore = totalFruits
            }
            updateHighScore(highScore)
            if (!gameStart) {
                endGameText.style.opacity = 1;
            }
        }, 2500)
    }

    function resetSuperFruitTimer() {
        superFruitTimer.style.strokeDashoffset = 0;
        superFruitTimer.style.opacity = 0;
        currentLength = 0;
    }

    let hello = document.getElementById('hello')
    fadeInIntroText(hello);
    fadeInIntroText(textAboveBall)

    function fadeInIntroText(element) {
        element.style.opacity = 0; // Start with opacity 0
        let opacity = 0;
        const duration = 250; // Duration of the fade-in effect in milliseconds (adjust as needed)
        const start = performance.now();

        function animate(currentTime) {
            const elapsed = currentTime - start;
            opacity = (elapsed / duration);
            if (opacity >= 1) {
                element.style.opacity = 1; // Ensure it's fully opaque at the end
                return;
            }
            element.style.opacity = opacity;
            element.style.left = "50%";
            requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
    }

    // Make everything move :)
    // Make everything move :)
    function animate() {
        if (!gameStart) { // If game hasn't started
            bounceTicks -= 1;
            // Place text above ball
            textAboveBall.style.top = `${position.y + textOffsetY}px`;
            textAboveBall.style.left = `${position.x + (ballSize / 2)}px`;

            if (firstGame) {
                position.x = (window.innerWidth / 2)
            }
            if (bounceTicks == 0) { // Make the ball bounce to remind people you should drag it. There is probably a more efficient way to do this without bounce ticks.
                const min = window.innerHeight / 40;
                const max = window.innerHeight / 80;
                const bounceStrength = Math.floor(Math.random() * (max - min + 1)) + min; // random bounce velocity
                velocity.y = bounceStrength;
                bounceTicks = 500;
            }
        } else if (gameStart) {
            readjustSize()
            if (gameTimeCounter >= 0) {// if game has started, count the game time
                gameTimeCounter -= 1;
                const remainingTimePercentage = (gameTimeCounter / gameTime) * 100;
                const timerBar = document.getElementById('timer-bar');
                timerBar.style.width = `${remainingTimePercentage}%`;
                timerBar.style.transition = '0s';

                if (
                    gameTimeCounter >= 60 &&
                    gameTimeCounter <= 300 &&
                    gameTimeCounter % 60 === 0
                ) {
                    const minOpacity = 0.2;
                    const maxOpacity = 1;

                    ball.style.transition = 'opacity 0.25s';
                    ball.style.opacity = minOpacity;
                    // Use setTimeout to change the opacity back to maxOpacity after 0.25s
                    setTimeout(() => {
                        ball.style.opacity = maxOpacity;
                    }, 250); // 0.25s in milliseconds

                    let fruits = document.querySelectorAll('.fruit');
                    fruits.forEach((fruit) => {
                        fruit.style.transition = 'opacity 0.25s';
                        fruit.style.opacity = minOpacity;
                        // Use setTimeout to change the opacity back to maxOpacity after 0.25s
                        setTimeout(() => {
                            fruit.style.opacity = maxOpacity;
                        }, 250); // 0.25s in milliseconds
                    });
                }
            }
            else if (gameTimeCounter < 0) {  // if game time is 0, end the game.
                gameTimeCounter = "done";
                percentage = 0;
                collectedFruitProgressBar.style.strokeDashoffset = `${radius * 2 * Math.PI}px`;
                superFruitTimer.style.strokeDashoffset = 0;
                showScore();
                setTimeout(() => {
                    velocity = { x: 0, y: 0 };
                    bounceTicks = 500;
                    gameStart = false;

                    if (superFruitMode && !gameStart) {
                        ballSize /= 2; // Ball back to normal
                        ball.style.width = `${ballSize}px`; // Ball width change
                        ball.style.height = `${ballSize}px`; // Ball height change
                        resetSuperFruitTimer(); // Reset the superFruitTimer
                    }
                    superFruitMode = false; // No longer in super fruit mode
                }, 250);
            }
        }
        if (!isDragging) { // Are we dragging? but make it the physics
            velocity.y += gravity; // Physics
            position.x += velocity.x; // Physics
            position.y += velocity.y; // Physics
            velocity.x *= friction; // Physics
            velocity.y *= friction; // Physics
            const shadowBox = 11;
            //Bounce off wall condition
            // 11 of the height of the shadowbox
            if (position.x <= 0 || position.x >= window.innerWidth - ball.clientWidth - 0) {
                velocity.x = -velocity.x // Reverse horizontal velocity
                if (position.x <= shadowBox) {
                    position.x = 1; // Move the ball slightly away from the left wall
                } else {
                    position.x = window.innerWidth - ball.clientWidth - 1; // Move the ball slightly away from the right wall
                }
            }
            if (position.y <= 11 || position.y >= window.innerHeight - ball.clientHeight - shadowBox) {
                velocity.y = -velocity.y * friction;
                position.y = Math.max(0, Math.min(position.y, window.innerHeight - ball.clientHeight - shadowBox)); // Ensure the ball stays within the window
            }
        }

        // Moves the ball
        ball.style.transform = `translate(${position.x}px, ${position.y}px`; // Move ball 
        fruitCollision(); // Check for Collision with fruit

        // Starts timer if in super fruit mode
        if (superFruitMode) {
            startTimer();
        } // If not, resets the collected fruit progress bar
        else if (currentLength = circleLength) {
            currentLength = 0;
        }

        // Change pretty colors
        hue = (hue + 1) % 360;
        ball.style.backgroundColor = `hsl(${hue}, 100%, 50%)`; // Change ball color
        throwArea.style.backgroundColor = `hsla(${hue}, 100%, 50%, 0.2)`; // Change throw area color
        superFruitTimer.style.stroke = `hsl(${hue}, 100%, 50%)`; // Set the progress bar stroke color 

        // Update trail positions smoothly in the animate function
        trailCircles.forEach((circle, index) => {
            const trailPosition = trailCircles[index + 1]
                ? { ...trailCircles[index + 1].position }
                : { ...position };

            // Smoothly interpolate the trail positions
            circle.position.x += (trailPosition.x - circle.position.x) * 0.2;
            circle.position.y += (trailPosition.y - circle.position.y) * 0.2;

            // Set the width and height of the trail element
            const trailSize = (ballSize / 5) + ((ballSize - (ballSize / 5)) / trailLength) * index;
            circle.element.style.width = `${trailSize}px`;
            circle.element.style.height = `${trailSize}px`;

            // Move trail elements
            circle.element.style.transform = `translate(${circle.position.x}px, ${circle.position.y}px) scale(${trailSize / ballSize})`;
            circle.element.style.backgroundColor = `hsl(${circle.hue + circle.hueOffset + hue}, 100%, 50%, ${circle.alpha})`;
        });
        requestAnimationFrame(animate);
    }

    animate();
});