function getMazeAt(maze, x, y) {
  // Check if the position is within bounds
  if (y >= 0 && y < maze.length && x >= 0 && x < maze[0].length) {
      return maze[y][x]; // Return the value at the specified position
  }
  return -1; // Out of bounds
}
function getBeyondMazeAt(maze, currentX, currentY, proposedX, proposedY) {
  // Calculate the direction vector (deltaX, deltaY)
  const deltaX = proposedX - currentX;
  const deltaY = proposedY - currentY;

  // Calculate the coordinates one step further in the same direction
  const beyondX = proposedX + deltaX;
  const beyondY = proposedY + deltaY;

  // Use getMazeAt to safely check the value beyond
  return getMazeAt(maze, beyondX, beyondY);
}



// Utility function for attribute management
function updateAttribute(target, attribute, min, max, delta, callback = null) {
  const newValue = target[attribute] + delta;

  if (newValue < min) {
      target[attribute] = min;
      if (callback) callback("min", target, attribute);
  } else if (newValue > max) {
      target[attribute] = max;
      if (callback) callback("max", target, attribute);
  } else {
      target[attribute] = newValue;
  }

  return target[attribute];
}


function setBeyondMazeAt(maze, currentX, currentY, proposedX, proposedY, newValue) {
  // Calculate the direction vector (deltaX, deltaY)
  const deltaX = proposedX - currentX;
  const deltaY = proposedY - currentY;

  // Calculate the coordinates one step further in the same direction
  const beyondX = proposedX + deltaX;
  const beyondY = proposedY + deltaY;

  // Check if the coordinates are within bounds
  if (beyondY >= 0 && beyondY < maze.length && beyondX >= 0 && beyondX < maze[0].length) {
      maze[beyondY][beyondX] = newValue; // Set the new value
      return true; // Indicate success
  }

  return false; // Indicate failure due to out-of-bounds
}

class Player {
  constructor(maxHealth = 100, maxHappiness = 100, maxFrustration = 100) {
      // Internal state storage
      this._attributes = {
          health: 100,
          happiness: 50,
          frustration: 0,
      };

      // Attribute bounds
      this._bounds = {
          health: { min: 0, max: maxHealth },
          happiness: { min: 0, max: maxHappiness },
          frustration: { min: 0, max: maxFrustration },
      };

      this.lastMoveWasFrustrating = false;
      this.inventory = [];
      this.level = 1;
      this.lastMessage = "Welcome to the maze!";
      this.x = 0
      this.y = 0
  


      // Optional callbacks
      this._callbacks = {
          health: (bound) => {
              if (bound === "min") console.log("Player has died!");
          },
          frustration: (bound) => {
              if (bound === "max") console.log("Player is enraged!");
          },
      };

      this.lastMessage = "Welcome to the maze!";
  }

  // Getter and Setter for health
  get health() {
      return this._attributes.health;
  }
  set health(value) {
      this._attributes.health = this._updateAttribute(
          "health",
          value - this._attributes.health
      );

      if (this._attributes.health === 0) {
        console.log("You died."); // todo last action
        process.exit(0);
      }
  }

  // Getter and Setter for happiness
  get happiness() {
      return this._attributes.happiness;
  }
  set happiness(value) {
      this._attributes.happiness = this._updateAttribute(
          "happiness",
          value - this._attributes.happiness
      );
  }

  // Getter and Setter for frustration
  get frustration() {
      return this._attributes.frustration;
  }
  set frustration(value) {
      this._attributes.frustration = this._updateAttribute(
          "frustration",
          value - this._attributes.frustration
      );
  }

  // Internal utility to update attributes using updateAttribute logic
  _updateAttribute(attribute, delta) {
      const bounds = this._bounds[attribute];
      const callback = this._callbacks[attribute];
      return updateAttribute(this._attributes, attribute, bounds.min, bounds.max, delta, callback);
  }

  // Other methods
  setMessage(message) {
      this.lastMessage = message;
  }

  displayStatus() {
      return `Health: ${this.health}, Happiness: ${this.happiness}, Frustration: ${this.frustration}`;
  }

  consents({blocked, x, y, maze}) {
    if (blocked) {
      if (this.frustration >= 10) {
        const lookAhead = getBeyondMazeAt(maze, this.x, this.y, x, y);

        const value = getMazeAt(maze, x, y);
        if (value === 0) {
          if (lookAhead === 1) {
            this.lastMessage = `You kicked the wall and pushed it forward!!! ${lookAhead} ${value}`;
            maze[y][x] = 1;
            setBeyondMazeAt(maze, this.x, this.y, x, y, 0);
            this.health = this.health - 10
          } else {
            this.lastMessage = `You kicked the wall but it doesn't move! ${lookAhead} ${value}`
            this.health = this.health - 25
          }
        }

        return false;
      }
      
      return false;
    } else {
      return true;
    }
  }

  move({direction, blocked, x, y}) {
    if (blocked) {
      this.frustration++;
      this.lastMoveWasFrustrating = false;
      this.lastMessage = `You are blocked by a wall. Kicking it hurts. `;
      this.health = this.health - 1
    } else {
      this.lastMoveWasFrustrating = true;
      this.frustration = this.frustration - 1
      this.health = this.health + 1
      this.lastMessage = `You moved ${direction} and gained 1 health. `;
    }
    this.x = x
    this.y = y
  }

  updateLevel(newLevel) {
      this.level = newLevel;
      this.lastMessage = `You advanced to level ${newLevel}.`;
  }

  takeDamage(amount) {
      this.health = Math.max(this.health - amount, 0);
      this.lastMessage = `You took ${amount} damage. Health is now ${this.health}.`;
  }

  addItem(item) {
      this.inventory.push(item);
      this.lastMessage = `You found ${item}!`;
  }

  setMessage(message) {
      this.lastMessage = message;
  }

  isAlive() {
      return this.health > 0;
  }

  displayStatus() {
      return `Health: ${this.health}, Inventory: [${this.inventory.join(", ")}], Level: ${this.level}, Frustration: ${this.frustration}`;
  }
}

module.exports = {
  Player
}