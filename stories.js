const readline = require("readline");

// Create interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Initial game setup
let maze = createMaze(4, 4);
let startLocation = { x: 0, y: 0 };
let currentLocation = { ...startLocation };
let tilesExplored = 1;
let level = 1;

// Player (Faust) stats
let player = {
  health: 100,
  maxHealth: 100,
  turns: 0,
  gold: 0,
  inventory: [],
  vices: {},
  effects: {},
  desires: ["youth", "knowledge", "power", "pleasure"], // Faust's desires
};

// Helper functions
function createMaze(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.2 ? "Empty" : "Wall"))
  );
}

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function applyGoldPoisoning() {
  if (player.gold > 0) {
    // the more power you have, the less often the gold hurts you, but the more it does
    if (Math.random() > (1/(3+(player.vices.power||0)))) {
      const goldDamage = Math.ceil(player.gold / 5 + Math.random() * (1 + player.vices.power||0)); // Scales poison effect
      player.health -= goldDamage;
      console.log(`Your gold weighs heavily on your soul. You lose ${goldDamage} health.`);
    }
  }
}

function developVice(vice) {
  if (!player.vices[vice]) {
    player.vices[vice] = 0;
  }
  player.vices[vice] += 1;
  console.log(`You feel ${vice} growing within you.`);
}

function transformIntoMonster() {
  console.log("The devil appears to claim your soul...");
  console.log("Your vices have shaped your ultimate fate:");
  Object.entries(player.vices).forEach(([vice, count]) => {
    console.log(`- ${vice.charAt(0).toUpperCase() + vice.slice(1)}: ${count}`);
  });
  const mostProminentVice = Object.entries(player.vices).sort((a, b) => b[1] - a[1])[0]?.[0] || "nothingness";
  console.log(`You transform into a creature of ${mostProminentVice}.`);
  rl.close();
}

// Story events organized by narrative phase
const storyEvents = {
  hook: [
    {
      description: "You stand at the maze's entrance. A voice whispers: 'Do you crave youth and power?'",
      choices: {
        Yes: () => {
          developVice("ambition");
          return "The voice cackles, 'Then step forward, Faust.'";
        },
        No: () => {
          developVice("doubt");
          return "The voice fades, leaving you uncertain.";
        },
      },
    },
  ],
  plotPoint1: [
    {
      description: "A glowing fountain promises rejuvenation, but it binds you further to the devil. Drink?",
      choices: {
        Yes: () => {
          developVice("vanity");
          player.health += 20;
          player.turns++;
          
          player.maxHealth = 200;
          return "You feel eternally youthful but hollow. (200 max health)";
        },
        No: () => {
          developVice("pride");
          return "You resist, but the temptation lingers.";
        },
      },
    },
  ],
  pinchPoint1: [
    {
      description: "A figure offers treasure in exchange for aid. Help or take the treasure?",
      choices: {
        Help: () => {
          developVice("pride");
          player.gold += Math.ceil(Math.random() * 100);
          const delta = player.effects.virus||0 + Math.ceil(Math.random() * 10);
          player.effects.virus = delta;
          
          return `You help the figure, catching a virus from them, but gaining their gratitude. Each turn will take ${delta} health`;
        },
        Take: () => {
          developVice("greed");
          const delta = Math.ceil(Math.random() * 250);
          player.gold += delta;
          return `You take the treasure, leaving the figure to their fate. (+${delta} gold)`;
        },
      },
    },
  ],
  midpoint: [
    {
      description: "A devilish figure offers you power in exchange for your soul. Accept?",
      choices: {
        Yes: () => {
          developVice("lust for power");
          player.inventory.push("Demonic Power");
          return "You gain unholy strength but feel your humanity slipping.";
        },
        No: () => {
          developVice("pride");
          return "You resist, but the devil's laughter echoes in your mind.";
        },
      },
    },
  ],
  pinchPoint2: [
    {
      description: "A trusted companion reveals themselves as a traitor. Fight or flee?",
      choices: {
        Fight: () => {
          developVice("disloyalty");
          player.health -= 20;
          return "You fight valiantly but are wounded. (-20 health)";
        },
        Flee: () => {
          developVice("cowardice");
          return "You flee, haunted by the betrayal.";
        },
      },
    },
  ],
  plotPoint2: [
    {
      description: "The devil appears: 'Will you forfeit your desires to escape?'",
      choices: {
        Forfeit: () => {
          developVice("nihilism");
          player.gold = 0;
          player.inventory = [];
          return "You cast away your desires, feeling lighter but incomplete.";
        },
        Cling: () => {
          developVice("obsession");
          player.health -= 10;
          return "You cling to your desires, even as they destroy you.";
        },
      },
    },
  ],
  resolution: [
    {
      description: "The maze collapses around you. The devil appears. 'Your journey ends here, Faust.'",
      effect: transformIntoMonster,
    },
  ],
};

// Determine story phase
function getStoryPhase() {
  const totalTiles = maze.length * maze[0].length;
  const progress = tilesExplored / totalTiles;

  if (progress <= 0.1) return "hook";
  if (progress <= 0.3) return "plotPoint1";
  if (progress <= 0.5) return "pinchPoint1";
  if (progress <= 0.7) return "midpoint";
  if (progress <= 0.9) return "pinchPoint2";
  if (progress <= 1.0) return "plotPoint2";
  return "resolution";
}

// Main game loop
async function mazeGame() {
  console.log("Welcome to Faust's Labyrinth! Type 'north', 'south', 'east', or 'west' to move.");

  for await (const input of rl) {
    const direction = input.trim().toLowerCase();
    let { x, y } = currentLocation;

    switch (direction) {
      case "north": y -= 1; break;
      case "south": y += 1; break;
      case "east": x += 1; break;
      case "west": x -= 1; break;
      default:
        developVice("indecisiveness");
        console.log("You hesitate, and indecision weighs heavily on you.");
        continue;
    }

    if (x >= 0 && y >= 0 && x < maze[0].length && y < maze.length && maze[y][x] !== "Wall") {
      currentLocation = { x, y };
      tilesExplored++;
      player.health += 10; // Gain health on movement
      applyGoldPoisoning();

      console.log(`You moved ${direction}. Your current location is (${x}, ${y}).`);

      if (Math.random() > 0.3) {
        const phase = getStoryPhase();
        const event = randomItem(storyEvents[phase]);
        console.log(await handleEvent(event));

        if (player.vices.greed) {
          if (Math.random() > .3) {
            const addedGold = Math.ceil(Math.random() * player.vices.greed * 5);
            player.gold += addedGold;
            console.log(`Your greed has gained you ${addedGold} gold in the form of interest!`)
          }
        }

        if (player.health > player.maxHealth) {
          player.maxHealth = player.maxHealth;
        }

        if (player.gold > 0) {
          applyGoldPoisoning();
        }
      }

      if (Math.random() > 0.3) {
        player.health -= player.effects.virus||0;
      }

      console.log(`Stats: Health: ${player.health}, Gold: ${player.gold}, Vices: ${JSON.stringify(player.vices)}`);
    } else {
      console.log("You can't move that way. It's a wall or out of bounds.");
    }

    if (player.health <= 0) {
      console.log("You succumb to your vices. Game over.");
      rl.close();
      break;
    }
  }
}

async function handleEvent(event) {
  console.log(`Event: ${event.description}`);

  if (event.choices) {
    const options = Object.keys(event.choices);
    console.log(`Options: ${options.join(", ")}`);

    return new Promise((resolve) => {
      rl.question("What do you choose? ", (choice) => {
        if (options.includes(choice)) {
          const chanceToMiss = Math.random() * player.vices.indisiveness;
          if (chanceToMiss > 100) {
            console.log("Your indecisiveness cancels out your decision.");
          } else {
            resolve(event.choices[choice]());
          }          
        } else {
          developVice("indecisiveness");
          resolve("Your hesitation grows into a vice.");
        }
      });
    });
  } else if (event.effect) {
    event.effect();
    return "The event unfolds.";
  }
}

// Start the game
mazeGame().catch(console.error);
