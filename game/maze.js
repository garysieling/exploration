let { generateMaze, isMazeValid } = require("./generator");
let readline = require("readline");
let { Player } = require("./player");
let { eventDefinitions } = require("./eventDefinitions");
const { dir } = require("console");

let xMazeSize = 50;
let yMazeSize = 15;

function navigateMaze(mazeGenerator) {
    let maze = mazeGenerator(xMazeSize, yMazeSize); // Generate initial maze
    let playerPosition = { x: 1, y: 1 }; // Starting position
    let visited = new Set(); // Track visited cells
    let seen = new Set(); // Track cells that have been "seen"
    let stairs = []; // Stairs positions
    let player = new Player(); // Create a new player instance
    let events = {}; // Random events

    // Helper to ensure a valid maze is generated
    function generateValidMaze() {
        do {
            maze = mazeGenerator(xMazeSize, yMazeSize);
        } while (!isMazeValid(maze));
    }

    // Helper to randomly place stairs (inside walls or widened halls)
    function placeStairs(count = 3) {
        stairs = [];
        while (stairs.length < count) {
            let x = Math.floor(Math.random() * maze[0].length);
            let y = Math.floor(Math.random() * maze.length);
            if (maze[y][x] === 0 && !(x === 1 && y === 1)) { // Place only in walls or valid halls
                stairs.push({ x, y });
                maze[y][x] = 0; // Ensure stairs are walkable
            }
        }
    }

    // Helper to randomly place events
    function placeEvents(count = 5) {
        for (let i = 0; i < count; i++) {
            let x = Math.floor(Math.random() * maze[0].length);
            let y = Math.floor(Math.random() * maze.length);
            if (maze[y][x] === 1 && !(x === 1 && y === 1)) { // Place only on paths
                let eventKeys = Object.keys(eventDefinitions);
                let eventSymbol = eventKeys[Math.floor(Math.random() * eventKeys.length)];
                events[`${y},${x}`] = eventSymbol;
            }
        }
    }

    // Mark the current cell and its surroundings as "seen"
    function markSeen(x, y) {
        let directions = [
            [0, 0],   // Current cell
            [0, -1],  // Up
            [0, 1],   // Down
            [-1, 0],  // Left
            [1, 0],   // Right
            [-1, -1], [1, -1], // Diagonals for boundary
            [-1, 1], [1, 1],
        ];

        directions.forEach(([dx, dy]) => {
            let nx = x + dx;
            let ny = y + dy;
            if (maze[ny] && maze[ny][nx] !== undefined) {
                seen.add(`${ny},${nx}`);
            }
        });
    }

    // Render the maze with boundaries
    function renderMaze() {
        console.clear();
        maze.forEach((row, rowIndex) => {
            console.log(
                row
                    .map((cell, colIndex) => {
                        let key = `${rowIndex},${colIndex}`;
                        if (rowIndex === playerPosition.y && colIndex === playerPosition.x) {
                            return "P"; // Player's position
                        } else if (stairs.some(stair => stair.x === colIndex && stair.y === rowIndex)) {
                            return seen.has(key) ? "@" : "X"; // Stairs visible only if seen
                        } else if (events[key] && seen.has(key)) {
                            return events[key]; // Render events
                        } else if (visited.has(key)) {
                            return cell === 1 ? " " : "#"; // Visited paths/walls
                        } else if (seen.has(key)) {
                            return cell === 1 ? " " : "#"; // Seen paths/walls
                        } else {
                            return "X"; // Unseen areas
                        }
                    })
                    .join("")
            );
        });
        console.log("\n" + player.lastMessage); // Display the last message below the maze
        console.log(player.displayStatus()); // Display the player's status
    }

    // Handle event interaction
    function handleEvent(eventKey) {
        let event = eventDefinitions[events[eventKey]];
        console.log(event.description);
        let rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        rl.question("Your choice: ", (choice) => {
            let action = event.options[choice];
            if (action) action(player); // Execute the chosen action
            else player.setMessage("You did nothing.");
            //rl.close();
            renderMaze(); // Re-render after interaction
        });
    }

    // Check if move is valid
    function isMoveValid(x, y) {
        if (maze[y]) {
            const open = maze[y][x] === 1;

            const playerConsent = player.consents({blocked: !open, x, y, maze});

            return (
                playerConsent || stairs.some(stair => stair.x === x && stair.y === y)
            );
        }

        return false;
    }

    // Move the player and check for interactions
    function movePlayer(dx, dy, direction) {
        let newX = playerPosition.x + dx;
        let newY = playerPosition.y + dy;
        let key = `${newY},${newX}`;

        if (isMoveValid(newX, newY)) {
            playerPosition = { x: newX, y: newY };
            visited.add(key); // Mark as visited
            markSeen(newX, newY); // Mark surroundings as seen

            if (events[key]) {
                handleEvent(key); // Trigger event interaction
                delete events[key]; // Remove the event after interaction
                return;
            } else if (stairs.some(stair => stair.x === newX && stair.y === newY)) {
                player.updateLevel(++player.level); // Increment level
                generateValidMaze(); // Generate a new valid maze
                playerPosition = { x: 1, y: 1 }; // Reset player position
                visited.clear(); // Clear visited cells
                seen.clear(); // Clear seen cells
                events = {}; // Clear events
                placeStairs(); // Place new stairs
                placeEvents( Math.floor(x * y / 5.0) ); // Place new events
                markSeen(playerPosition.x, playerPosition.y); // Mark start as seen
            } else {
                player.move({
                    direction: direction,
                    blocked: false,
                    x: newX,
                    y: newY
                });
            }

            
        } else {
            player.move({
                direction: direction,
                blocked: true,
                x: playerPosition.x,
                y: playerPosition.y
            });
        }
        renderMaze();
    }

    // Map keys to directions and descriptions
    let movementKeys = {
        w: [0, -1, "north"],          // W key - Up
        s: [0, 1, "south"],           // S key - Down
        a: [-1, 0, "west"],           // A key - Left
        d: [1, 0, "east"],            // D key - Right
        up: [0, -1, "north"],    // Arrow Up key
        down: [0, 1, "south"],   // Arrow Down key
        left: [-1, 0, "west"],   // Arrow Left key
        right: [1, 0, "east"],   // Arrow Right key
    };


    // Start listening for input
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (str, key) => {
        if (key && key.ctrl && key.name === "c") {
            process.exit(); // Exit on Ctrl+C
        }

        let direction = movementKeys[key.name];
        if (direction) {
            movePlayer(direction[0], direction[1], direction[2]);
        }
    });

    // Initialize the game
    generateValidMaze(); // Ensure the maze is valid
    visited.add(`${playerPosition.y},${playerPosition.x}`); // Mark starting position as visited
    markSeen(playerPosition.x, playerPosition.y); // Mark surroundings as seen
    placeStairs(); // Place stairs
    placeEvents(); // Place random events
    renderMaze();
}

// Example usage:
// Replace generateMaze with your own implementation
navigateMaze(generateMaze);
