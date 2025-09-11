
import { Player, PlayerSelection, Activity } from '@/types/kingdom';
import { getActivityText } from '@/data/kingdomActivities';

// Check if a pairing requires consent (heteroflexible with same gender or with non-binary)
export function requiresConsent(player1: Player, player2: Player): boolean {
  const isFlexibleMatch = (p1: Player, p2: Player) => {
    // Heteroflexible with same gender
    if (p1.orientation === 'heteroflexible' && p1.gender === p2.gender) return true;
    // Heteroflexible with non-binary
    if (p1.orientation === 'heteroflexible' && p2.gender === 'nonbinary') return true;
    return false;
  };
  
  return isFlexibleMatch(player1, player2) || isFlexibleMatch(player2, player1);
}

  // Check if two players are compatible
export function arePlayersCompatible(player1: Player, player2: Player): boolean {
  // Queer orientation - always compatible
  if (player1.orientation === 'queer' || player2.orientation === 'queer') return true;
  
  // Bisexual - always compatible
  if (player1.orientation === 'bisexual' || player2.orientation === 'bisexual') return true;
  
  // Heterosexual compatibility
  if (player1.orientation === 'heterosexual') {
    return player2.gender !== player1.gender || player2.gender === 'nonbinary';
  }
  
  // Homosexual compatibility
  if (player1.orientation === 'homosexual') {
    return player2.gender === player1.gender || player2.gender === 'nonbinary';
  }
  
  // Heteroflexible - primarily opposite gender but flexible
  if (player1.orientation === 'heteroflexible') {
    // Opposite gender - always compatible
    if (player2.gender !== player1.gender && player2.gender !== 'nonbinary') return true;
    // Same gender or non-binary - compatible with consent if other player is flexible
    return ['bisexual', 'queer', 'heteroflexible'].includes(player2.orientation);
  }
  
  return true; // Default to true for edge cases
}

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

export function formatActivityText(activityId: string, selection: PlayerSelection, language: 'es' | 'pt' | 'en'): string {
  let formatted = getActivityText(activityId, language);
  
  // Replace placeholders with actual player names
  Object.entries(selection).forEach(([placeholder, player]) => {
    const regex = new RegExp(`\\[${placeholder}\\]`, 'g');
    formatted = formatted.replace(regex, player.name);
  });
  
  return formatted;
}
