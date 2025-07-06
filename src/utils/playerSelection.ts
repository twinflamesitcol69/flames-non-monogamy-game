
import { Player, PlayerSelection, Activity } from '@/types/kingdom';
import { getActivityText } from '@/data/kingdomActivities';

export function selectPlayersForActivity(
  players: Player[], 
  activity: Activity
): PlayerSelection {
  const selection: PlayerSelection = {};
  
  // For 2 players, auto-assign
  if (players.length === 2) {
    activity.placeholders.forEach((placeholder, index) => {
      selection[placeholder] = players[index % 2];
    });
    return selection;
  }

  // Handle placeholder requirements
  const placeholderMap: { [key: string]: 'male' | 'female' | 'any' } = {
    'Player X': 'female', 
    'Player K': 'female',
    'Player Y': 'male',
    'Player L': 'male',
    'Player Z': 'any',
    'Player U': 'any', 
    'Player W': 'any'
  };

  const usedPlayers = new Set<Player>();
  
  // Check if selection is possible
  const requiredFemales = activity.placeholders.filter(p => placeholderMap[p] === 'female').length;
  const requiredMales = activity.placeholders.filter(p => placeholderMap[p] === 'male').length;
  const availableFemales = players.filter(p => p.gender === 'female').length;
  const availableMales = players.filter(p => p.gender === 'male').length;

  // If impossible selection or someone has queer orientation, use random selection
  if (requiredFemales > availableFemales || 
      requiredMales > availableMales || 
      players.some(p => p.orientation === 'queer')) {
    return randomSelection(players, activity);
  }

  // Assign players based on requirements
  for (const placeholder of activity.placeholders) {
    const requirement = placeholderMap[placeholder];
    let availablePlayers: Player[];

    if (requirement === 'female') {
      availablePlayers = players.filter(p => p.gender === 'female' && !usedPlayers.has(p));
    } else if (requirement === 'male') {
      availablePlayers = players.filter(p => p.gender === 'male' && !usedPlayers.has(p));
    } else {
      availablePlayers = players.filter(p => !usedPlayers.has(p));
    }

    if (availablePlayers.length === 0) {
      // Fallback to any available player
      availablePlayers = players.filter(p => !usedPlayers.has(p));
    }

    if (availablePlayers.length > 0) {
      const selectedPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
      selection[placeholder] = selectedPlayer;
      
      // Only mark as used if placeholder appears once in this activity
      const placeholderCount = activity.placeholders.filter(p => p === placeholder).length;
      if (placeholderCount === 1) {
        usedPlayers.add(selectedPlayer);
      }
    }
  }

  return selection;
}

function randomSelection(players: Player[], activity: Activity): PlayerSelection {
  const selection: PlayerSelection = {};
  
  for (const placeholder of activity.placeholders) {
    selection[placeholder] = players[Math.floor(Math.random() * players.length)];
  }
  
  return selection;
}

export function formatActivityText(activityId: string, selection: PlayerSelection, language: 'es' | 'pt'): string {
  let formatted = getActivityText(activityId, language);
  
  Object.entries(selection).forEach(([placeholder, player]) => {
    const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
    formatted = formatted.replace(regex, player.name);
  });
  
  return formatted;
}
