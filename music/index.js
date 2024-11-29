const fs = require('fs');
//const { animationFrameScheduler } = require('rxjs');

// Get command-line arguments for length and model size
const args = process.argv.slice(2);
const length = args[0] || "30"; // Default to 30 seconds if not provided
const model = args[1] || "large"; // Default to "large" if not provided

if (!["small", "medium", "large"].includes(model)) {
  console.error("Error: Model size must be one of 'small', 'medium', or 'large'.");
  process.exit(1);
}

// Read the JSON file
fs.readFile('feelings.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse JSON data
    const feelings = JSON.parse(data);

    // Prepare an array to store the shell script commands
    const commands = feelings.map((item) => {
      // Clean description to remove quotes and dollar signs
      const description = item.description.replace(/["$]/g, '');
      const outputFileName = `orchestral_${item.name.toLowerCase()}_${model}_${length}.wav`.replace(/[ \/]/g, '_').replace(/['"]/g, ' ');
      const logFileName = `${item.name.toLowerCase()}.log`;

      return `if [ ! -f "${outputFileName}" ]; then
  echo "Starting generation for: ${item.name}..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of ${item.name}. Description: ${description}. Instrumentation: ${item.instrumentation}. Tempo: ${item.tempo}. Volume: ${item.volume}. Key: ${item.key}." --secs ${length} --model ${model} --no-interactive --no-playback --output ${outputFileName} 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: ${item.name}."
  else
    echo "Error generating: ${item.name}, check ${logFileName} for details."
  fi
else
  echo "File already exists for: ${item.name}, skipping."
fi`;
      //return `if [ ! -f "${outputFileName}" ]; then\n  ./musicgpt "Generate a musical composition that conveys the feeling of ${item.name}. Description: ${description}. Instrumentation: ${item.instrumentation}. Tempo: ${item.tempo}. Volume: ${item.volume}. Key: ${item.key}." --secs ${length} --model ${model} --output ${outputFileName} \nfi`;
    });

    // Join commands with newlines and write to a file
    fs.writeFile('prompts.sh', commands.join('\n\n'), (writeErr) => {
      if (writeErr) {
        console.error('Error writing to the file:', writeErr);
      } else {
        console.log('Shell script written to prompts.sh successfully.');
      }
    });
  } catch (error) {
    console.error('Error parsing JSON data:', error);
  }
});


