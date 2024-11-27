const enneagramTypes = [{
      "Name": "The Reformer",
      "Number": 1,
      "Core Desire": ["Integrity", "to be good and balanced"],
      "Core Fear": ["Being corrupt", "Being defective"],
      "Motivation": ["Strives for perfection", "Order", "Principles"],
      "Strengths": ["Responsible", "Ethical", "Self-disciplined"],
      "Weaknesses": ["Judgmental", "Overly critical", "Inflexible"],
      "Vices": {
          "Healthy": ["Wise", "Accepting", "Principled"],
          "Average": ["Critical", "Perfectionistic", "Rigid"],
          "Unhealthy": ["Obsessive-compulsive", "Intolerant", "Self-righteous"]
      }
  },
  {
      "Name": "The Helper",
      "Number": 2,
      "Core Desire": ["To feel loved and needed"],
      "Core Fear": ["Being unwanted", "Being unworthy of love"],
      "Motivation": ["Seeks to help and care for others"],
      "Strengths": ["Generous", "Compassionate", "Nurturing"],
      "Weaknesses": ["People-pleasing", "Possessive", "Self-neglecting"],
      "Vices": {
          "Healthy": ["Empathetic", "Unselfish", "Loving"],
          "Average": ["Manipulative", "Intrusive", "Approval-seeking"],
          "Unhealthy": ["Dependent", "Overbearing", "Needy"]
      }
  },
  {
      "Name": "The Achiever",
      "Number": 3,
      "Core Desire": ["To be valuable and admired"],
      "Core Fear": ["Being worthless", "Being a failure"],
      "Motivation": ["Strives for success", "Recognition"],
      "Strengths": ["Ambitious", "Efficient", "Confident"],
      "Weaknesses": ["Overly competitive", "Image-conscious", "Workaholic"],
      "Vices": {
          "Healthy": ["Self-assured", "Adaptable", "Excelling"],
          "Average": ["Overly focused on appearance", "Workaholic", "Competitive"],
          "Unhealthy": ["Deceitful", "Narcissistic", "Exploitative"]
      }
  }, {
      "Name": "The Individualist",
      "Number": 4,
      "Core Desire": ["Authenticity", "Identity"],
      "Core Fear": ["Having no identity", "Having no personal significance"],
      "Motivation": ["Seeks uniqueness", "Self-expression"],
      "Strengths": ["Creative", "Sensitive", "Introspective"],
      "Weaknesses": ["Melancholic", "Self-absorbed", "Temperamental"],
      "Vices": {
          "Healthy": ["Creative", "Self-aware", "Expressive"],
          "Average": ["Moody", "Self-absorbed", "Temperamental"],
          "Unhealthy": ["Self-pitying", "Depressed", "Self-destructive"]
      }
  },
  {
      "Name": "The Investigator",
      "Number": 5,
      "Core Desire": ["To understand", "To gain knowledge"],
      "Core Fear": ["Being helpless", "Being useless", "Being incapable"],
      "Motivation": ["Strives for knowledge", "Competence"],
      "Strengths": ["Analytical", "Perceptive", "Innovative"],
      "Weaknesses": ["Detached", "Isolated", "Overly secretive"],
      "Vices": {
          "Healthy": ["Insightful", "Objective", "Innovative"],
          "Average": ["Detached", "Intellectualizing", "Withdrawn"],
          "Unhealthy": ["Reclusive", "Fearful", "Paranoid"]
      }
  }, {
      "Name": "The Loyalist",
      "Number": 6,
      "Core Desire": ["Safety", "Security"],
      "Core Fear": ["Being without support", "Being without guidance"],
      "Motivation": ["Seeks reassurance", "Stability"],
      "Strengths": ["Loyal", "Responsible", "Prepared"],
      "Weaknesses": ["Anxious", "Suspicious", "Indecisive"],
      "Vices": {
          "Healthy": ["Loyal", "Courageous", "Prepared"],
          "Average": ["Anxious", "Cautious", "Indecisive"],
          "Unhealthy": ["Paranoid", "Self-doubting", "Obsessive"]
      }
  }, {
      "Name": "The Enthusiast",
      "Number": 7,
      "Core Desire": ["To be satisfied", "To be content"],
      "Core Fear": ["Being trapped in pain", "Being in deprivation"],
      "Motivation": ["Seeks adventure", "Seeks stimulation"],
      "Strengths": ["Energetic", "Spontaneous", "Optimistic"],
      "Weaknesses": ["Impulsive", "Scattered", "Escapist"],
      "Vices": {
          "Healthy": ["Optimistic", "Joyful", "Productive"],
          "Average": ["Impulsive", "Distracted", "Unfocused"],
          "Unhealthy": ["Addictive", "Frantic", "Self-destructive"]
      }
  }, {
      "Name": "The Challenger",
      "Number": 8,
      "Core Desire": ["To protect oneself", "To remain in control"],
      "Core Fear": ["Being controlled", "Being harmed by others"],
      "Motivation": ["Strives for autonomy", "Control"],
      "Strengths": ["Assertive", "Decisive", "Strong-willed"],
      "Weaknesses": ["Confrontational", "Domineering", "Insensitive"],
      "Vices": {
          "Healthy": ["Decisive", "Confident", "Protective"],
          "Average": ["Confrontational", "Domineering", "Intimidating"],
          "Unhealthy": ["Ruthless", "Destructive", "Vindictive"]
      }
  }, {
      "Name": "The Peacemaker",
      "Number": 9,
      "Core Desire": ["Inner stability", "Peace of mind"],
      "Core Fear": ["Conflict", "Disconnection"],
      "Motivation": ["Seeks harmony", "Avoids conflict"],
      "Strengths": ["Calm", "Adaptable", "Diplomatic"],
      "Weaknesses": ["Passive", "Complacent", "Indecisive"],
      "Vices": {
          "Healthy": ["Peaceful", "Reassuring", "Stable"],
          "Average": ["Complacent", "Resistant", "Indecisive"],
          "Unhealthy": ["Resigned", "Apathetic", "Neglectful"]
      }
  }
];

function generateName() {
  const firstNames = ["Eldric", "Thalwin", "Branwyn", "Isolde", "Magnus", "Vesper", "Lysandra", "Quillon", "Zephyrine", "Alaric"];
  const lastNames = ["Gearheart", "Steamwhistle", "Ironclad", "Gizmoforge", "Windwalker", "Shadowspire", "Copperfield", "Nightshade", "Stormbringer", "Firebrand"];
  const middleNames = ["V.", "D.", "E.", "H.", "K.", "M.", "P.", "R.", "S.", "T."];

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];

  return `${firstName} ${middleName} ${lastName}`;
}

function getRandomElement(array) { 
  return array[Math.floor(Math.random() * array.length)] 
};

function generateRandomCharacter() { 
  const randomType = getRandomElement(enneagramTypes);

  return { 
    "Name": generateName(), 
    "EnneagramType": randomType.Number, 
    "EnneagramTypeName": randomType.Name.split(" ")[1], 
    "HealthLevel": Math.floor(Math.random() * 101), 
    "PersonalityMetrics": { 
      "CoreDesire": getRandomElement(randomType["Core Desire"]), 
      "CoreFear":  getRandomElement(randomType["Core Fear"]), 
      "MotivationLevel": Math.floor(Math.random() * randomType["Motivation"].length) 
    }, 
    "EmotionalState": {
      "IntegrationLevel": Math.floor(Math.random() * 9),
      "HappinessLevel": Math.floor(Math.random() * 11),
      "StressLevel": Math.floor(Math.random() * 11),
      "EnergyLevel": Math.floor(Math.random() * 11)
      }, 
      "SkillsAndAbilities": { 
        "CombatSkill": Math.floor(Math.random() * 11), 
        "EmotionalIntelligence": Math.floor(Math.random() * 11), 
        "NegotiationSkill": Math.floor(Math.random() * 11), 
        "Strength": Math.floor(Math.random() * 11), 
        "Intelligence": Math.floor(Math.random() * 11),
        "Charisma": Math.floor(Math.random() * 11) 
      },
      /*"RelationshipMetrics": {
         "TrustLevel": Math.floor(Math.random() * 11), 
         "LoyaltyLevel": Math.floor(Math.random() * 11) 
      }, 
      "VicesAndVirtues": {
         "CurrentVice": Math.floor(Math.random() * 11), 
         "CurrentVirtue": Math.floor(Math.random() * 11)
      },*/
      //"EnneagramSpecificMetrics": { 
        
      //} 
  }
}

function determineArticle(word) {
  const vowels = ["a", "e", "i", "o", "u"];
  const firstLetter = word.charAt(0).toLowerCase();

  // Special case for words starting with a vowel sound but written with a consonant (e.g., "hour")
  if (firstLetter === 'h' && "aeiou".includes(word.charAt(1).toLowerCase())) {
      return "an";
  }

  if (vowels.includes(firstLetter)) {
      return "an";
  } else {
      return "a";
  }
}

function getCharacterStatus(character) {
  const { Name, EnneagramType, EnneagramTypeName, HealthLevel, EmotionalState, PersonalityMetrics } = character;
  
  let mood = EmotionalState.HappinessLevel > 7 ? "feeling great" : EmotionalState.HappinessLevel > 4 ? "doing okay" : "having a tough time";
  let stress = EmotionalState.StressLevel > 7 ? "very stressed" : EmotionalState.StressLevel > 4 ? "a bit stressed" : "relatively calm";
  let motivation = PersonalityMetrics.MotivationLevel > 7 ? "highly motivated" : PersonalityMetrics.MotivationLevel > 4 ? "somewhat motivated" : "lacking motivation";

  const type = enneagramTypes[EnneagramType - 1];
  let integration = '';
  if (EmotionalState.IntegrationLevel < 3) {
    integration = type.Vices.Unhealthy[EmotionalState.IntegrationLevel % 3];
  } else if (EmotionalState.IntegrationLevel < 6) {
    integration = type.Vices.Average[EmotionalState.IntegrationLevel % 3];
  } else {
    integration = type.Vices.Healthy[EmotionalState.IntegrationLevel % 3];
  }

  integration = integration.toLowerCase();



  return `Hello, I am ${Name}. As ${determineArticle(EnneagramTypeName)} ${EnneagramTypeName.toLowerCase()}, right now I am ${mood}, ${stress}, and ${motivation}. I am on a ${integration} kick.`;}

const exampleCharacter = generateRandomCharacter();
const characterStatus = getCharacterStatus(exampleCharacter);
console.log(characterStatus);
