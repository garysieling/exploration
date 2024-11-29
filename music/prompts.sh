if [ ! -f "orchestral_joy_large_30.wav" ]; then
  echo "Starting generation for: Joy..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Joy. Description: Upbeat music often brings happiness and energy.. Instrumentation: Strings and brass in bright harmonies, woodwinds for playful accents.. Tempo: Fast, lively; Allegro in 4/4 time.. Volume: Starts moderately loud and builds to a bright, consistent volume.. Key: Major keys, often C major or G major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_joy_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Joy."
  else
    echo "Error generating: Joy, check joy.log for details."
  fi
else
  echo "File already exists for: Joy, skipping."
fi

if [ ! -f "orchestral_excitement_large_30.wav" ]; then
  echo "Starting generation for: Excitement..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Excitement. Description: Fast tempos or dynamic rhythms can create a sense of thrill or anticipation.. Instrumentation: Percussion and brass for bold rhythms; strings for rapid movement.. Tempo: Very fast; Presto in 6/8 or 4/4 with syncopation.. Volume: Loud throughout, with occasional dynamic dips for contrast.. Key: Major or minor keys, with unexpected modulations.." --secs 30 --model large --no-interactive --no-playback --output orchestral_excitement_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Excitement."
  else
    echo "Error generating: Excitement, check excitement.log for details."
  fi
else
  echo "File already exists for: Excitement, skipping."
fi

if [ ! -f "orchestral_love_large_30.wav" ]; then
  echo "Starting generation for: Love..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Love. Description: Romantic or tender melodies can evoke feelings of affection and warmth.. Instrumentation: Strings for sweeping melodies, harp or piano for delicate accompaniment.. Tempo: Moderate; Andante or Adagio in 4/4.. Volume: Soft to moderate, with crescendos to emphasize emotional moments.. Key: Major keys like D major or A major, or tender minor keys like E minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_love_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Love."
  else
    echo "Error generating: Love, check love.log for details."
  fi
else
  echo "File already exists for: Love, skipping."
fi

if [ ! -f "orchestral_nostalgia_large_30.wav" ]; then
  echo "Starting generation for: Nostalgia..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Nostalgia. Description: Certain songs or melodies can transport us to fond memories.. Instrumentation: Solo instruments like violin or piano, subtle strings for depth.. Tempo: Moderate to slow; Rubato in 3/4 or 6/8 time for a dreamy quality.. Volume: Soft, with gentle swells in dynamics.. Key: Minor keys with major intervals, like E minor with G major transitions.." --secs 30 --model large --no-interactive --no-playback --output orchestral_nostalgia_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Nostalgia."
  else
    echo "Error generating: Nostalgia, check nostalgia.log for details."
  fi
else
  echo "File already exists for: Nostalgia, skipping."
fi

if [ ! -f "orchestral_inspiration_large_30.wav" ]; then
  echo "Starting generation for: Inspiration..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Inspiration. Description: Uplifting music can motivate and energize us.. Instrumentation: Brass and strings for soaring melodies; full orchestral support.. Tempo: Moderate to fast; Allegro in 4/4.. Volume: Starts soft and builds to a powerful, triumphant peak.. Key: Major keys like C major or Bb major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_inspiration_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Inspiration."
  else
    echo "Error generating: Inspiration, check inspiration.log for details."
  fi
else
  echo "File already exists for: Inspiration, skipping."
fi

if [ ! -f "orchestral_sadness_large_30.wav" ]; then
  echo "Starting generation for: Sadness..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Sadness. Description: Melancholic tunes or lyrics can bring feelings of sorrow or longing.. Instrumentation: Solo cello or violin, soft woodwinds, low strings for depth.. Tempo: Slow; Largo or Adagio in 4/4.. Volume: Soft, with subtle crescendos for emotional expression.. Key: Minor keys, often D minor or A minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_sadness_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Sadness."
  else
    echo "Error generating: Sadness, check sadness.log for details."
  fi
else
  echo "File already exists for: Sadness, skipping."
fi

if [ ! -f "orchestral_anger_large_30.wav" ]; then
  echo "Starting generation for: Anger..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Anger. Description: Intense, heavy music can express frustration or rage.. Instrumentation: Percussion for aggressive rhythms, brass for power, low strings for intensity.. Tempo: Fast; Vivace or Allegro in 4/4.. Volume: Consistently loud, with sudden bursts for emphasis.. Key: Minor keys, often G minor or C minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_anger_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Anger."
  else
    echo "Error generating: Anger, check anger.log for details."
  fi
else
  echo "File already exists for: Anger, skipping."
fi

if [ ! -f "orchestral_fear_large_30.wav" ]; then
  echo "Starting generation for: Fear..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Fear. Description: Haunting or eerie compositions can evoke feelings of tension or dread.. Instrumentation: Low strings, dissonant brass, eerie woodwinds like clarinets or flutes.. Tempo: Varied; Slow, free, and unpredictable; Rubato in 4/4 or 5/4.. Volume: Soft with sudden loud bursts for shock effect.. Key: Dissonant minor keys, like B minor with chromatic elements.." --secs 30 --model large --no-interactive --no-playback --output orchestral_fear_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Fear."
  else
    echo "Error generating: Fear, check fear.log for details."
  fi
else
  echo "File already exists for: Fear, skipping."
fi

if [ ! -f "orchestral_bittersweetness_large_30.wav" ]; then
  echo "Starting generation for: Bittersweetness..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Bittersweetness. Description: A blend of joy and sadness, often found in reflective or nostalgic pieces.. Instrumentation: Solo violin or oboe, gentle strings, and piano.. Tempo: Moderate; Andante or Moderato in 3/4 or 6/8.. Volume: Soft to moderate, with gentle swells.. Key: Major keys with minor undertones, like F major shifting to D minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_bittersweetness_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Bittersweetness."
  else
    echo "Error generating: Bittersweetness, check bittersweetness.log for details."
  fi
else
  echo "File already exists for: Bittersweetness, skipping."
fi

if [ ! -f "orchestral_serenity_large_30.wav" ]; then
  echo "Starting generation for: Serenity..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Serenity. Description: Gentle, harmonious music can bring a sense of peace and calm.. Instrumentation: Soft strings, flutes, and harp for soothing textures.. Tempo: Slow; Adagio in 4/4 or 6/8.. Volume: Consistently soft, with gentle dynamics.. Key: Major keys, often C major or F major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_serenity_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Serenity."
  else
    echo "Error generating: Serenity, check serenity.log for details."
  fi
else
  echo "File already exists for: Serenity, skipping."
fi

if [ ! -f "orchestral_melancholy_large_30.wav" ]; then
  echo "Starting generation for: Melancholy..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Melancholy. Description: A deep, reflective sadness often associated with slower tempos and minor keys.. Instrumentation: Solo piano or violin, low strings, subtle woodwinds.. Tempo: Slow; Largo or Adagio in 4/4.. Volume: Soft to moderate, with occasional climaxes.. Key: Minor keys, often E minor or G minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_melancholy_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Melancholy."
  else
    echo "Error generating: Melancholy, check melancholy.log for details."
  fi
else
  echo "File already exists for: Melancholy, skipping."
fi

if [ ! -f "orchestral_triumph_large_30.wav" ]; then
  echo "Starting generation for: Triumph..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Triumph. Description: Overcoming adversity, expressed in powerful, victorious themes.. Instrumentation: Full orchestra with emphasis on brass and percussion.. Tempo: Fast; Allegro or Maestoso in 4/4.. Volume: Starts moderate and builds to a loud, resounding climax.. Key: Major keys, often C major or Eb major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_triumph_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Triumph."
  else
    echo "Error generating: Triumph, check triumph.log for details."
  fi
else
  echo "File already exists for: Triumph, skipping."
fi

if [ ! -f "orchestral_awe_large_30.wav" ]; then
  echo "Starting generation for: Awe..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Awe. Description: Majestic or expansive music can instill a sense of wonder or reverence.. Instrumentation: Full orchestra with strong brass and string sections.. Tempo: Slow to moderate; Andante or Maestoso in 4/4.. Volume: Dynamic, with soft beginnings and grand crescendos.. Key: Major keys, often Bb major or D major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_awe_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Awe."
  else
    echo "Error generating: Awe, check awe.log for details."
  fi
else
  echo "File already exists for: Awe, skipping."
fi

if [ ! -f "orchestral_curiosity_large_30.wav" ]; then
  echo "Starting generation for: Curiosity..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Curiosity. Description: Experimental or unconventional music can intrigue and stimulate.. Instrumentation: Unusual combinations like pizzicato strings, solo clarinet, and percussion.. Tempo: Varied; Alternates between slow and fast; often free-form.. Volume: Soft with sudden dynamic shifts.. Key: Atonal or ambiguous keys, with unexpected chord progressions.." --secs 30 --model large --no-interactive --no-playback --output orchestral_curiosity_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Curiosity."
  else
    echo "Error generating: Curiosity, check curiosity.log for details."
  fi
else
  echo "File already exists for: Curiosity, skipping."
fi

if [ ! -f "orchestral_connection_large_30.wav" ]; then
  echo "Starting generation for: Connection..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Connection. Description: Certain pieces can make us feel part of something greater.. Instrumentation: Rich strings, choral voices, and unified brass sections.. Tempo: Moderate; Andante or Moderato in 4/4.. Volume: Starts soft and swells to a grand unison.. Key: Major keys like F major or Bb major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_connection_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Connection."
  else
    echo "Error generating: Connection, check connection.log for details."
  fi
else
  echo "File already exists for: Connection, skipping."
fi

if [ ! -f "orchestral_mystery_large_30.wav" ]; then
  echo "Starting generation for: Mystery..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Mystery. Description: Ambiguous or atmospheric music can create a sense of the unknown.. Instrumentation: Low strings, sparse percussion, soft woodwinds like bassoons.. Tempo: Slow and free; Rubato or Largo in 5/4 or 3/4.. Volume: Soft with occasional eerie swells.. Key: Minor keys with chromatic elements, like D minor or A minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_mystery_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Mystery."
  else
    echo "Error generating: Mystery, check mystery.log for details."
  fi
else
  echo "File already exists for: Mystery, skipping."
fi

if [ ! -f "orchestral_disgusted_large_30.wav" ]; then
  echo "Starting generation for: Disgusted..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Disgusted. Description: Music that evokes a sense of revulsion or unease.. Instrumentation: Dissonant strings, low brass, and irregular percussion.. Tempo: Slow to moderate; irregular beats in 4/4 or 5/4.. Volume: Soft with sudden jarring crescendos.. Key: Dissonant minor keys, with chromatic and tritone intervals.." --secs 30 --model large --no-interactive --no-playback --output orchestral_disgusted_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Disgusted."
  else
    echo "Error generating: Disgusted, check disgusted.log for details."
  fi
else
  echo "File already exists for: Disgusted, skipping."
fi

if [ ! -f "orchestral_horrified_large_30.wav" ]; then
  echo "Starting generation for: Horrified..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Horrified. Description: Music that captures fear and shock at something dreadful.. Instrumentation: Shrieking violins, pounding percussion, and unsettling woodwinds.. Tempo: Fast and frantic; Presto in irregular time signatures.. Volume: Starts soft, builds rapidly to loud climaxes.. Key: Atonal or minor keys, with sharp dissonances.." --secs 30 --model large --no-interactive --no-playback --output orchestral_horrified_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Horrified."
  else
    echo "Error generating: Horrified, check horrified.log for details."
  fi
else
  echo "File already exists for: Horrified, skipping."
fi

if [ ! -f "orchestral_terror_large_30.wav" ]; then
  echo "Starting generation for: Terror..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Terror. Description: Music that evokes a paralyzing sense of fear.. Instrumentation: Low, rumbling strings, eerie brass, and dissonant high-pitched tones.. Tempo: Very slow; Largo or unpredictable tempo shifts.. Volume: Soft with sudden, piercing spikes in volume.. Key: Chromatic scales and unresolved minor chords.." --secs 30 --model large --no-interactive --no-playback --output orchestral_terror_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Terror."
  else
    echo "Error generating: Terror, check terror.log for details."
  fi
else
  echo "File already exists for: Terror, skipping."
fi

if [ ! -f "orchestral_apocalyptic_large_30.wav" ]; then
  echo "Starting generation for: Apocalyptic..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Apocalyptic. Description: Music that conveys the end of the world or catastrophic events.. Instrumentation: Heavy percussion, distorted brass, and ominous choir.. Tempo: Slow and relentless; Moderato in 4/4.. Volume: Consistently loud, with overwhelming climaxes.. Key: Minor keys, often D minor or C minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_apocalyptic_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Apocalyptic."
  else
    echo "Error generating: Apocalyptic, check apocalyptic.log for details."
  fi
else
  echo "File already exists for: Apocalyptic, skipping."
fi

if [ ! -f "orchestral_sensual_large_30.wav" ]; then
  echo "Starting generation for: Sensual..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Sensual. Description: Music that evokes intimacy and allure.. Instrumentation: Smooth saxophone, soft strings, and gentle piano.. Tempo: Slow; Adagio in 4/4 with a gentle swing rhythm.. Volume: Soft and consistent, with subtle dynamic changes.. Key: Major keys, often Bb major or Eb major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_sensual_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Sensual."
  else
    echo "Error generating: Sensual, check sensual.log for details."
  fi
else
  echo "File already exists for: Sensual, skipping."
fi

if [ ! -f "orchestral_ecstatic_large_30.wav" ]; then
  echo "Starting generation for: Ecstatic..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Ecstatic. Description: Music that captures overwhelming joy and excitement.. Instrumentation: Soaring strings, bright brass, and energetic percussion.. Tempo: Very fast; Presto or Allegro in 4/4.. Volume: Loud throughout, with bursts of extreme dynamics.. Key: Major keys, often C major or A major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_ecstatic_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Ecstatic."
  else
    echo "Error generating: Ecstatic, check ecstatic.log for details."
  fi
else
  echo "File already exists for: Ecstatic, skipping."
fi

if [ ! -f "orchestral_cruel_large_30.wav" ]; then
  echo "Starting generation for: Cruel..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Cruel. Description: Music that feels harsh, cold, and unrelenting.. Instrumentation: Piercing strings, harsh brass, and sharp percussion.. Tempo: Moderate; Andante in 4/4 with abrupt stops.. Volume: Loud with jarring drops to silence.. Key: Minor keys, often G minor or F# minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_cruel_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Cruel."
  else
    echo "Error generating: Cruel, check cruel.log for details."
  fi
else
  echo "File already exists for: Cruel, skipping."
fi

if [ ! -f "orchestral_hyperfocused_large_30.wav" ]; then
  echo "Starting generation for: Hyperfocused..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Hyperfocused. Description: Music that captures intense concentration and precision.. Instrumentation: Minimalist piano, repetitive strings, and steady percussion.. Tempo: Moderate; Allegretto in 6/8 or 4/4 with a steady pulse.. Volume: Soft to moderate, consistent dynamics.. Key: Major or minor keys with repetitive motifs, like D major or A minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_hyperfocused_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Hyperfocused."
  else
    echo "Error generating: Hyperfocused, check hyperfocused.log for details."
  fi
else
  echo "File already exists for: Hyperfocused, skipping."
fi

if [ ! -f "orchestral_unfocused_large_30.wav" ]; then
  echo "Starting generation for: Unfocused..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Unfocused. Description: Music that feels wandering and aimless.. Instrumentation: Ethereal synths, ambient strings, and sparse percussion.. Tempo: Slow and irregular; Rubato with no clear time signature.. Volume: Soft and subdued, with occasional swells.. Key: Atonal or ambiguous keys.." --secs 30 --model large --no-interactive --no-playback --output orchestral_unfocused_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Unfocused."
  else
    echo "Error generating: Unfocused, check unfocused.log for details."
  fi
else
  echo "File already exists for: Unfocused, skipping."
fi

if [ ! -f "orchestral_chaotic_large_30.wav" ]; then
  echo "Starting generation for: Chaotic..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Chaotic. Description: Music that feels disordered and unpredictable.. Instrumentation: Discordant brass, erratic percussion, and frenetic strings.. Tempo: Fast and irregular; free time or alternating meters.. Volume: Wild fluctuations between soft and loud.. Key: Atonal or frequent key changes.." --secs 30 --model large --no-interactive --no-playback --output orchestral_chaotic_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Chaotic."
  else
    echo "Error generating: Chaotic, check chaotic.log for details."
  fi
else
  echo "File already exists for: Chaotic, skipping."
fi

if [ ! -f "orchestral_walking___ambling_large_30.wav" ]; then
  echo "Starting generation for: Walking / Ambling..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Walking / Ambling. Description: Music that evokes a casual stroll or leisurely pace.. Instrumentation: Light woodwinds, pizzicato strings, and soft percussion.. Tempo: Moderate; Andante in 6/8 or 4/4 with a lilting rhythm.. Volume: Moderate and steady dynamics.. Key: Major keys, often F major or G major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_walking___ambling_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Walking / Ambling."
  else
    echo "Error generating: Walking / Ambling, check walking / ambling.log for details."
  fi
else
  echo "File already exists for: Walking / Ambling, skipping."
fi

if [ ! -f "orchestral_running_scared_large_30.wav" ]; then
  echo "Starting generation for: Running Scared..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Running Scared. Description: Music that conveys frantic escape and fear.. Instrumentation: Fast strings, driving percussion, and eerie brass.. Tempo: Very fast; Presto in 6/8 or 4/4.. Volume: Soft start, building to loud, relentless intensity.. Key: Minor keys, often E minor or G minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_running_scared_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Running Scared."
  else
    echo "Error generating: Running Scared, check running scared.log for details."
  fi
else
  echo "File already exists for: Running Scared, skipping."
fi

if [ ! -f "orchestral_running_towards_something_large_30.wav" ]; then
  echo "Starting generation for: Running Towards Something..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Running Towards Something. Description: Music that captures determined forward motion and anticipation.. Instrumentation: Soaring brass, steady percussion, and uplifting strings.. Tempo: Fast; Allegro in 4/4.. Volume: Starts soft and swells to triumphant climaxes.. Key: Major keys, often C major or D major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_running_towards_something_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Running Towards Something."
  else
    echo "Error generating: Running Towards Something, check running towards something.log for details."
  fi
else
  echo "File already exists for: Running Towards Something, skipping."
fi

if [ ! -f "orchestral_heroic_large_30.wav" ]; then
  echo "Starting generation for: Heroic..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Heroic. Description: Music that conveys bravery and triumph.. Instrumentation: Bold brass, powerful strings, and dramatic percussion.. Tempo: Moderate to fast; Maestoso in 4/4.. Volume: Loud and steady, with soaring peaks.. Key: Major keys, often Bb major or E major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_heroic_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Heroic."
  else
    echo "Error generating: Heroic, check heroic.log for details."
  fi
else
  echo "File already exists for: Heroic, skipping."
fi

if [ ! -f "orchestral_stable_large_30.wav" ]; then
  echo "Starting generation for: Stable..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Stable. Description: Music that feels grounded and consistent.. Instrumentation: Balanced strings, soft piano, and gentle percussion.. Tempo: Moderate; Andante in 4/4.. Volume: Soft to moderate, steady dynamics.. Key: Major keys, often C major or F major.." --secs 30 --model large --no-interactive --no-playback --output orchestral_stable_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Stable."
  else
    echo "Error generating: Stable, check stable.log for details."
  fi
else
  echo "File already exists for: Stable, skipping."
fi

if [ ! -f "orchestral_bored_large_30.wav" ]; then
  echo "Starting generation for: Bored..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Bored. Description: Music that feels monotonous and unengaging.. Instrumentation: Minimalist piano, repetitive strings, and subdued percussion.. Tempo: Slow; Largo in 4/4.. Volume: Soft and consistent.. Key: Minor keys with repetitive motifs, like E minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_bored_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Bored."
  else
    echo "Error generating: Bored, check bored.log for details."
  fi
else
  echo "File already exists for: Bored, skipping."
fi

if [ ! -f "orchestral_hungry_large_30.wav" ]; then
  echo "Starting generation for: Hungry..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Hungry. Description: Music that feels yearning and restless.. Instrumentation: Low strings, moody woodwinds, and sparse percussion.. Tempo: Moderate; Andante in 3/4 or 4/4.. Volume: Soft with occasional swells.. Key: Minor keys, often A minor or G minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_hungry_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Hungry."
  else
    echo "Error generating: Hungry, check hungry.log for details."
  fi
else
  echo "File already exists for: Hungry, skipping."
fi

if [ ! -f "orchestral_nauseous_large_30.wav" ]; then
  echo "Starting generation for: Nauseous..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Nauseous. Description: Music that feels uneasy and disorienting.. Instrumentation: Sliding strings, irregular percussion, and warped synths.. Tempo: Slow; Rubato with irregular rhythms.. Volume: Soft with jarring dynamic changes.. Key: Atonal or ambiguous minor keys.." --secs 30 --model large --no-interactive --no-playback --output orchestral_nauseous_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Nauseous."
  else
    echo "Error generating: Nauseous, check nauseous.log for details."
  fi
else
  echo "File already exists for: Nauseous, skipping."
fi

if [ ! -f "orchestral_tense_large_30.wav" ]; then
  echo "Starting generation for: Tense..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Tense. Description: Music that builds suspense and unease.. Instrumentation: Tremolo strings, low brass, and pulsing percussion.. Tempo: Moderate; Allegretto in 4/4 with a driving rhythm.. Volume: Soft, gradually building to loud climaxes.. Key: Minor keys, often D minor or B minor.." --secs 30 --model large --no-interactive --no-playback --output orchestral_tense_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Tense."
  else
    echo "Error generating: Tense, check tense.log for details."
  fi
else
  echo "File already exists for: Tense, skipping."
fi

if [ ! -f "orchestral_awkward_large_30.wav" ]; then
  echo "Starting generation for: Awkward..."
 ./musicgpt "Generate an orchestral musical composition that conveys the feeling of Awkward. Description: Music that feels uncomfortable or clumsy.. Instrumentation: Offbeat piano, quirky woodwinds, and uneven percussion.. Tempo: Irregular; shifts between slow and moderate in 5/4 or 7/8.. Volume: Soft to moderate, with abrupt changes.. Key: Minor keys with unexpected dissonances.." --secs 30 --model large --no-interactive --no-playback --output orchestral_awkward_large_30.wav 
  if [ $? -eq 0 ]; then
    echo "Finished generation for: Awkward."
  else
    echo "Error generating: Awkward, check awkward.log for details."
  fi
else
  echo "File already exists for: Awkward, skipping."
fi