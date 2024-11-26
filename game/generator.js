function generateMaze(width, height) {
  // Ensure dimensions are odd
  if (width % 2 === 0) width++;
  if (height % 2 === 0) height++;

  // Initialize the grid with walls (0)
  const maze = Array.from({ length: height }, () => Array(width).fill(0));

  // Directions: [row offset, col offset]
  const directions = [
      [-2, 0], // Up
      [2, 0],  // Down
      [0, -2], // Left
      [0, 2],  // Right
  ];

  // Helper to shuffle directions
  function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  // Recursive backtracking to generate the maze
  function carvePassages(cx, cy) {
      maze[cy][cx] = 1; // Mark current cell as part of the maze

      shuffle(directions);

      for (const [dy, dx] of directions) {
          const nx = cx + dx; // Neighbor x
          const ny = cy + dy; // Neighbor y
          const wx = cx + dx / 2; // Wall x
          const wy = cy + dy / 2; // Wall y

          // Check bounds and if the neighbor is unvisited
          if (ny > 0 && ny < height && nx > 0 && nx < width && maze[ny][nx] === 0) {
              maze[wy][wx] = 1; // Remove wall
              carvePassages(nx, ny); // Recurse
          }
      }
  }

  // Start carving from the top-left corner
  carvePassages(1, 1);

  return maze;
}



    // Helper to verify if the maze is valid (all open paths connected)
    function isMazeValid(maze) {
      let queue = [];
      let visitedCheck = new Set();

      // Find the first open path to start BFS
      for (let y = 0; y < maze.length; y++) {
          for (let x = 0; x < maze[0].length; x++) {
              if (maze[y][x] === 1) {
                  queue.push({ x, y });
                  visitedCheck.add(`${y},${x}`);
                  break;
              }
          }
          if (queue.length > 0) break;
      }

      // BFS to traverse all reachable open paths
      while (queue.length > 0) {
          let { x, y } = queue.shift();

          for (let [dx, dy] of [
              [0, -1], [0, 1], [-1, 0], [1, 0], // Cardinal directions
          ]) {
              let nx = x + dx;
              let ny = y + dy;
              let key = `${ny},${nx}`;

              if (
                  nx >= 0 && ny >= 0 && ny < maze.length && nx < maze[0].length &&
                  maze[ny][nx] === 1 && !visitedCheck.has(key)
              ) {
                  queue.push({ x: nx, y: ny });
                  visitedCheck.add(key);
              }
          }
      }

      // Check if all open paths are visited
      for (let y = 0; y < maze.length; y++) {
          for (let x = 0; x < maze[0].length; x++) {
              if (maze[y][x] === 1 && !visitedCheck.has(`${y},${x}`)) {
                  return false;
              }
          }
      }

      return true;
  }

module.exports = {
  generateMaze,
  isMazeValid
}