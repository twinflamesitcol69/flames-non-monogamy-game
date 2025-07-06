
import { Activity } from '@/types/kingdom';

const translations = {
  es: {
    // Level 1 - Sensual Warm-up
    'l1_2p_1': '[Player Z], describe abiertamente un nuevo límite que te gustaría probar esta noche. Discutan juntos si ambos se sienten cómodos explorándolo ahora mismo.',
    'l1_2p_2': '[Player Z], describe explícitamente tu fantasía no-monógama más profunda que involucre al otro jugador.',
    'l1_2p_3': '[Player Z], narra un escenario explícito que involucre una fantasía tabú que has guardado en secreto.',
    'l1_2p_4': '[Player Z] elige un jugador, véndales los ojos y pídeles que se arrodillen. Luego explora su cuerpo libremente durante 5 minutos. Puedes usar cualquier objeto cercano.',
    'l1_2p_5': '[Player Z], abre tu boca y cierra los ojos. El otro jugador pone algo dentro (no necesariamente comestible) y te hace adivinar qué es mientras chupas.',
    'l1_2p_6': '[Player Z], ordena a otro jugador que se desnude completamente. Elige la posición más expuesta posible y haz que la mantenga durante 60 segundos.',
    'l1_2p_7': '[Player X] usa lápiz labial, chupetones o un objeto frío para dejar una marca visible en el cuerpo del otro jugador.',
    'l1_2p_8': '[Player Z], acércate y susurra tu fantasía más secreta que involucre a otro jugador directamente en su oído.',
    'l1_2p_9': '[Player Z], traza un dedo lentamente sobre cada parte del cuerpo que deseas explorar.',
    'l1_2p_10': 'Ambos jugadores, respiren profundamente juntos, sincronizando su respiración hasta sentirse perfectamente conectados.',
    'l1_2p_11': '[Player Z], venda los ojos de tu pareja. Luego describe tres cosas sexys que notaste sobre ellos esta noche.',
    'l1_2p_12': '[Player Z], da besos suaves en el cuello de tu pareja, deteniéndote justo antes de que se vuelva demasiado intenso.',
    'l1_2p_13': 'Mírense a los ojos en silencio durante 30 segundos, luego digan exactamente lo que quieren hacer a continuación.',
    'l1_2p_14': '[Player X], realiza un baile breve, lento y sensual, manteniendo contacto visual intenso.',
    'l1_2p_15': 'Túrnense para explorar puntos sensibles en los cuerpos del otro.',
    'l1_2p_16': '¡Salud! ¡Tomen un trago de ron o cualquier licor que les guste!',

    'l1_3p_1': '[Player Z], describe explícitamente tu fantasía no-monógama más profunda que involucre a los jugadores.',
    'l1_3p_2': '[Player Z], narra un escenario explícito que involucre una fantasía tabú que has guardado en secreto.',
    'l1_3p_3': '[Player X], ponte una venda en los ojos y arrodíllate. [Player Y], explora el cuerpo de [Player X] libremente durante 5 minutos. Puedes usar cualquier objeto cercano.',
    'l1_3p_4': '[Player Z], abre tu boca y cierra los ojos. [Player U], pon algo dentro (no necesariamente comestible) y haz que adivinen qué es mientras chupan.',
    'l1_3p_5': '[Player X], ordena a [Player Z] y [Player U] que se desnuden completamente. Elige la posición más expuesta posible y haz que la mantengan durante 60 segundos.',
    'l1_3p_6': '[Player X] usa lápiz labial, chupetones o un objeto frío para dejar una marca visible en el cuerpo de [Player Y].',
    'l1_3p_7': '[Player X], acércate y susurra tu fantasía más secreta que involucre a [Player Z] directamente en su oído.',
    'l1_3p_8': '[Player Z], traza un dedo lentamente sobre cada parte del cuerpo de [Player U] que deseas explorar, con el otro compañero observando.',
    'l1_3p_9': '[Player Z], véndalo los ojos. [Player U], describe tres cosas sexys que notaste sobre [Player Z] esta noche.',
    'l1_3p_10': '[Player Y], da a [Player X] besos suaves en su cuello, deteniéndote justo antes de que se vuelva demasiado intenso.',
    'l1_3p_11': '[Player X] y [Player Y], mírense a los ojos en silencio durante 30 segundos, luego digan exactamente lo que quieren hacer a continuación.',
    'l1_3p_12': '[Player X], realiza un baile breve, lento y sensual, manteniendo contacto visual intenso.',
    'l1_3p_13': 'Túrnense para explorar puntos sensibles en los cuerpos de los demás.',
    'l1_3p_14': '¡Salud! ¡Tomen un trago de ron o cualquier licor que les guste!',

    // Level 2 - Playful Challenges
    'l2_2p_1': '[Player Z], venda los ojos del otro jugador y usa tu cuerpo para excitarlo.',
    'l2_2p_2': '[Player Z] y [Player U], mastúrbense abiertamente mirándose el uno al otro.',
    'l2_2p_3': '[Player Z], párate completamente desnudo frente a tu pareja. Mastúrbate lentamente mientras te observan sin tocarte.',
    'l2_2p_4': '[Player Z], quédate quieto. [Player U], usa solo tu boca para llevarlos lo más cerca posible del orgasmo, luego detente justo antes del clímax.',
    'l2_2p_5': 'Mastúrbense al mismo tiempo. Ambos deben detenerse cada vez que uno de ustedes se acerque al orgasmo.',
    'l2_2p_6': '[Player Z], lame cada centímetro del cuerpo de [Player U] desde los dedos de los pies hasta la frente.',
    'l2_2p_7': '[Player X], siéntate con las piernas bien abiertas y las manos detrás de la cabeza. Déjate mirar y tocar en todas partes sin moverte.',
    'l2_2p_8': '[Player Z], quita lentamente una prenda de ropa del otro jugador sin usar las manos.',
    'l2_2p_9': '[Player Z], toma las manos del otro jugador y guíalas exactamente donde quieres ser tocado ahora mismo.',
    'l2_2p_10': '[Player Z], estimula al otro jugador usando tu boca y dedos simultáneamente.',

    // Level 3 - Exploration of Limits
    'l3_2p_1': 'Salgan y disfruten de una experiencia íntima en un lugar semi-público. Podría ser el baño de un bar, su jardín, su balcón, o un lugar apartado en el parque... cualquier lugar que los excite.',
    'l3_2p_2': 'Comiencen una relación sexual apasionada y cambien de posición cada 60 segundos. Elijan poses que normalmente evitan o les da vergüenza.',
    'l3_2p_3': 'Solo [Player Z] puede recibir placer. El otro lo da todo, sin ser tocado o tocarse a sí mismo.',
    'l3_2p_4': '[Player Z], solo puedes usar tu boca para dar placer a tu pareja durante los próximos 3 minutos. Sin manos, sin juguetes.',
    'l3_2p_5': '[Player Z], escribe 3 actos sexuales que nunca has probado. [Player U] mézclalos y elige uno al azar. [Player Z], hazlo inmediatamente.',
    'l3_2p_6': 'Mantengan contacto sexual durante 3 minutos sin hacer ningún sonido. Si alguien gime o habla, deben detenerse.'
  },
  pt: {
    // Level 1 - Sensual Warm-up
    'l1_2p_1': '[Player Z], descreva abertamente um novo limite que gostaria de testar hoje à noite. Discutam juntos se ambos se sentem confortáveis em explorá-lo agora.',
    'l1_2p_2': '[Player Z], descreva explicitamente sua fantasia não-monogâmica mais profunda envolvendo o outro jogador.',
    'l1_2p_3': '[Player Z], narre um cenário explícito envolvendo uma fantasia tabu que guardou em segredo.',
    'l1_2p_4': '[Player Z] escolha um jogador, vende os olhos dele e peça para se ajoelhar. Então explore seu corpo livremente por 5 minutos. Você pode usar qualquer objeto próximo.',
    'l1_2p_5': '[Player Z], abra sua boca e feche os olhos. O outro jogador coloca algo dentro (não necessariamente comestível) e faz você adivinhar o que é enquanto chupa.',
    'l1_2p_6': '[Player Z], ordene a outro jogador que se despir completamente. Escolha a posição mais exposta possível e faça-o mantê-la por 60 segundos.',
    'l1_2p_7': '[Player X] use batom, chupões ou um objeto frio para deixar uma marca visível no corpo do outro jogador.',
    'l1_2p_8': '[Player Z], aproxime-se e sussurre sua fantasia mais secreta envolvendo outro jogador diretamente no ouvido dele.',
    'l1_2p_9': '[Player Z], trace um dedo lentamente sobre cada parte do corpo que deseja explorar.',
    'l1_2p_10': 'Ambos os jogadores, respirem profundamente juntos, sincronizando sua respiração até se sentirem perfeitamente conectados.',
    'l1_2p_11': '[Player Z], vende os olhos do seu parceiro. Então descreva três coisas sexy que notou sobre eles hoje à noite.',
    'l1_2p_12': '[Player Z], dê beijos suaves no pescoço do parceiro, parando pouco antes de ficar muito intenso.',
    'l1_2p_13': 'Olhem nos olhos um do outro em silêncio por 30 segundos, então digam exatamente o que querem fazer em seguida.',
    'l1_2p_14': '[Player X], execute uma dança breve, lenta e sensual, mantendo contato visual intenso.',
    'l1_2p_15': 'Alternem-se explorando pontos sensíveis nos corpos um do outro.',
    'l1_2p_16': 'Saúde! Tomem um shot de rum ou qualquer bebida que gostem!',

    'l1_3p_1': '[Player Z], descreva explicitamente sua fantasia não-monogâmica mais profunda envolvendo os jogadores.',
    'l1_3p_2': '[Player Z], narre um cenário explícito envolvendo uma fantasia tabu que guardou em segredo.',
    'l1_3p_3': '[Player X], coloque uma venda nos olhos e se ajoelhe. [Player Y], explore o corpo de [Player X] livremente por 5 minutos. Você pode usar qualquer objeto próximo.',
    'l1_3p_4': '[Player Z], abra sua boca e feche os olhos. [Player U], coloque algo dentro (não necessariamente comestível) e faça-o adivinhar o que é enquanto chupa.',
    'l1_3p_5': '[Player X], ordene a [Player Z] e [Player U] que se despam completamente. Escolha a posição mais exposta possível e faça-os mantê-la por 60 segundos.',
    'l1_3p_6': '[Player X] use batom, chupões ou um objeto frio para deixar uma marca visível no corpo de [Player Y].',
    'l1_3p_7': '[Player X], aproxime-se e sussurre sua fantasia mais secreta envolvendo [Player Z] diretamente no ouvido dele.',
    'l1_3p_8': '[Player Z], trace um dedo lentamente sobre cada parte do corpo de [Player U] que deseja explorar, com o outro parceiro observando.',
    'l1_3p_9': '[Player Z], vende seus olhos. [Player U], descreva três coisas sexy que notou sobre [Player Z] hoje à noite.',
    'l1_3p_10': '[Player Y], dê a [Player X] beijos suaves no pescoço, parando pouco antes de ficar muito intenso.',
    'l1_3p_11': '[Player X] e [Player Y], olhem nos olhos um do outro em silêncio por 30 segundos, então digam exatamente o que querem fazer em seguida.',
    'l1_3p_12': '[Player X], execute uma dança breve, lenta e sensual, mantendo contato visual intenso.',
    'l1_3p_13': 'Alternem-se explorando pontos sensíveis nos corpos uns dos outros.',
    'l1_3p_14': 'Saúde! Tomem um shot de rum ou qualquer bebida que gostem!',

    // Level 2 - Playful Challenges
    'l2_2p_1': '[Player Z], vende os olhos do outro jogador e use seu corpo para excitá-lo.',
    'l2_2p_2': '[Player Z] e [Player U], masturbem-se abertamente de frente um para o outro.',
    'l2_2p_3': '[Player Z], fique completamente nu na frente do seu parceiro. Masturbe-se lentamente enquanto eles observam sem te tocar.',
    'l2_2p_4': '[Player Z], fique parado. [Player U], use apenas sua boca para levá-los o mais perto possível do orgasmo, então pare pouco antes do clímax.',
    'l2_2p_5': 'Masturbem-se ao mesmo tempo. Vocês dois devem parar toda vez que um de vocês se aproximar do orgasmo.',
    'l2_2p_6': '[Player Z], lamba cada centímetro do corpo de [Player U] dos dedos dos pés até a testa.',
    'l2_2p_7': '[Player X], sente-se com as pernas bem abertas e as mãos atrás da cabeça. Deixe-se ser olhado e tocado em todos os lugares sem se mover.',
    'l2_2p_8': '[Player Z], remova lentamente uma peça de roupa do outro jogador sem usar as mãos.',
    'l2_2p_9': '[Player Z], pegue as mãos do outro jogador e guie-as exatamente onde você quer ser tocado agora.',
    'l2_2p_10': '[Player Z], estimule o outro jogador usando sua boca e dedos simultaneamente.',

    // Level 3 - Exploration of Limits
    'l3_2p_1': 'Saiam e desfrutem de uma experiência íntima em um local semi-público. Pode ser o banheiro de um bar, seu jardim, sua varanda, ou um local isolado no parque... qualquer lugar que os excite.',
    'l3_2p_2': 'Comecem uma relação sexual apaixonada e mudem de posição a cada 60 segundos. Escolham poses que normalmente evitam ou sentem vergonha.',
    'l3_2p_3': 'Apenas [Player Z] pode receber prazer. O outro dá tudo, sem ser tocado ou se tocar.',
    'l3_2p_4': '[Player Z], você só pode usar sua boca para dar prazer ao seu parceiro pelos próximos 3 minutos. Sem mãos, sem brinquedos.',
    'l3_2p_5': '[Player Z], escreva 3 atos sexuais que nunca experimentou. [Player U] embaralhe-os e escolha um aleatoriamente. [Player Z], faça-o imediatamente.',
    'l3_2p_6': 'Mantenham contato sexual por 3 minutos sem fazer nenhum som. Se alguém gemer ou falar, vocês devem parar.'
  }
};

export const activities: Activity[] = [
  // Level 1 - Sensual Warm-up (2 players)
  {
    id: 'l1_2p_1',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_2',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_3',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_4',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_5',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_6',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_7',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player X']
  },
  {
    id: 'l1_2p_8',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_9',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_10',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l1_2p_11',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_12',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_2p_13',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l1_2p_14',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player X']
  },
  {
    id: 'l1_2p_15',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l1_2p_16',
    level: 1,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },

  // Level 1 - Sensual Warm-up (3 players)
  {
    id: 'l1_3p_1',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_3p_2',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z']
  },
  {
    id: 'l1_3p_3',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y']
  },
  {
    id: 'l1_3p_4',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l1_3p_5',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Z', 'Player U']
  },
  {
    id: 'l1_3p_6',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y']
  },
  {
    id: 'l1_3p_7',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Z']
  },
  {
    id: 'l1_3p_8',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l1_3p_9',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l1_3p_10',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Y', 'Player X']
  },
  {
    id: 'l1_3p_11',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y']
  },
  {
    id: 'l1_3p_12',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X']
  },
  {
    id: 'l1_3p_13',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l1_3p_14',
    level: 1,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },

  // Level 2 - Playful Challenges (2 players)
  {
    id: 'l2_2p_1',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_2',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l2_2p_3',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_4',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l2_2p_5',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l2_2p_6',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l2_2p_7',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player X']
  },
  {
    id: 'l2_2p_8',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_9',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_10',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },

  // Level 3 - Exploration of Limits (2 players)
  {
    id: 'l3_2p_1',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l3_2p_2',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l3_2p_3',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_4',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_5',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z', 'Player U']
  },
  {
    id: 'l3_2p_6',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  }
];

export function getActivityText(activityId: string, language: 'es' | 'pt'): string {
  return translations[language][activityId] || activityId;
}
