let eventDefinitions = {
  "!": {
      description: "A surprise meeting! Do you want to (a) fight, (b) run, or (c) talk?",
      options: {
          a: (player) => player.takeDamage(20), // Fighting deals damage
          b: (player) => player.setMessage("You ran away safely."),
          c: (player) => player.setMessage("You had a friendly chat."),
      },
  },
  "#": {
      description: "You found a trap! Do you want to (y) disable it or (n) walk away?",
      options: {
          y: (player) => player.takeDamage(10), // Disabling it deals minor damage
          n: (player) => player.setMessage("You avoided the trap."),
      },
  },
  "$": {
      description: "You found gold! Do you want to (y) take it or (n) leave it?",
      options: {
          y: (player) => player.addItem("gold"), // Add gold to inventory
          n: (player) => player.setMessage("You left the gold behind."),
      },
  },
};


module.exports = { eventDefinitions };