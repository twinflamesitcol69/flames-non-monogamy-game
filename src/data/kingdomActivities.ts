
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
    'l2_2p_11': '[Player Z], usa solo tu lengua para explorar íntimamente al otro jugador durante 3 minutos.',
    'l2_2p_12': 'Alternen entre dar y recibir placer oral. Cambien cada 90 segundos.',
    'l2_2p_13': '[Player Z], ata las manos del otro jugador y controla completamente su placer por 5 minutos.',
    'l2_2p_14': 'Tengan sexo en una posición que nunca han probado antes.',
    'l2_2p_15': '[Player Z], usa juguetes o objetos del hogar para estimular al otro jugador.',

    'l2_3p_1': '[Player Z], venda los ojos de [Player X] mientras [Player Y] los observa y describe todo lo que ve.',
    'l2_3p_2': '[Player Z] y [Player U], mastúrbense mientras [Player W] les da instrucciones explícitas.',
    'l2_3p_3': '[Player X], párate desnudo en el centro. [Player Y] y [Player Z] pueden tocarte pero tú no puedes tocarlos.',
    'l2_3p_4': '[Player Z], estimula a [Player X] con tu boca mientras [Player Y] usa sus manos en ti.',
    'l2_3p_5': 'Formen una cadena de placer: cada persona estimula a la siguiente en línea.',
    'l2_3p_6': '[Player X], elige quién de los otros dos debe desnudarse primero y cómo deben hacerlo.',
    'l2_3p_7': 'Túrnense siendo el observador: uno mira mientras los otros dos se complacen mutuamente.',
    'l2_3p_8': '[Player Z], usa tus manos en [Player X] mientras [Player Y] usa su boca en [Player Z].',
    'l2_3p_9': 'Todos deben mantener contacto físico íntimo simultáneamente por 3 minutos.',
    'l2_3p_10': '[Player X], da órdenes específicas a [Player Y] sobre cómo complacer a [Player Z].',

    'l2_4p_1': 'Formen dos parejas. Una pareja se complace mientras la otra observa, luego cambien.',
    'l2_4p_2': '[Player Z], elige dos personas para que te estimulen simultáneamente mientras la cuarta observa.',
    'l2_4p_3': 'Cadena de caricias: cada persona toca íntimamente a la siguiente formando un círculo.',
    'l2_4p_4': 'Una persona en el centro recibe atención de las otras tres por 2 minutos, luego roten.',
    'l2_4p_5': 'Divídanse en parejas y tengan contacto íntimo mientras mantienen contacto visual con la otra pareja.',

    'l2_5p_1': 'Una persona en el centro, las otras cuatro se turnan para darle placer de diferentes maneras.',
    'l2_5p_2': 'Formen una estrella: todos conectados físicamente íntimamente al mismo tiempo.',
    'l2_5p_3': '[Player Z], elige dos personas para estimularte mientras diriges a las otras dos en cómo complacerse.',

    // Level 3 - Exploration of Limits
    'l3_2p_1': 'Salgan y disfruten de una experiencia íntima en un lugar semi-público. Podría ser el baño de un bar, su jardín, su balcón, o un lugar apartado en el parque... cualquier lugar que los excite.',
    'l3_2p_2': 'Comiencen una relación sexual apasionada y cambien de posición cada 60 segundos. Elijan poses que normalmente evitan o les da vergüenza.',
    'l3_2p_3': 'Solo [Player Z] puede recibir placer. El otro lo da todo, sin ser tocado o tocarse a sí mismo.',
    'l3_2p_4': '[Player Z], solo puedes usar tu boca para dar placer a tu pareja durante los próximos 3 minutos. Sin manos, sin juguetes.',
    'l3_2p_5': '[Player Z], escribe 3 actos sexuales que nunca has probado. [Player U] mézclalos y elige uno al azar. [Player Z], hazlo inmediatamente.',
    'l3_2p_6': 'Mantengan contacto sexual durante 3 minutos sin hacer ningún sonido. Si alguien gime o habla, deben detenerse.',
    'l3_2p_7': '[Player Z], realiza un show erótico completo para tu pareja. Incluye baile, desnudez y auto-placer.',
    'l3_2p_8': 'Simulen compartir a [Player Z] con una tercera persona imaginaria. Describan detalladamente lo que haría esa persona.',
    'l3_2p_9': '[Player Z], venda tus ojos y permite que tu pareja haga contigo lo que desee por 5 minutos.',
    'l3_2p_10': 'Graben un video íntimo de ustedes mismos (solo para verlo juntos después).',
    'l3_2p_11': '[Player Z], actúa como si fueras completamente sumiso. Tu pareja tiene control total.',
    'l3_2p_12': 'Tengan una experiencia sexual completa en un lugar donde podrían ser descubiertos.',

    'l3_3p_1': '[Player Z], realiza un show de desnudez y masturbación para los otros dos mientras ellos no pueden tocarte.',
    'l3_3p_2': 'Simulen un encuentro con una pareja externa. [Player X] actúa como la pareja mientras [Player Y] y [Player Z] lo comparten.',
    'l3_3p_3': '[Player Z], venda tus ojos y permite que los otros dos hagan contigo lo que deseen por 5 minutos.',
    'l3_3p_4': 'Una persona debe complacer completamente a las otras dos simultáneamente usando solo su boca y manos.',
    'l3_3p_5': 'Todos deben estar desnudos y tener contacto sexual simultáneo en diferentes combinaciones por 5 minutos.',
    'l3_3p_6': '[Player X], eres el director. Ordena exactamente cómo [Player Y] y [Player Z] deben complacerse mutuamente.',
    'l3_3p_7': 'Graben un video íntimo de los tres juntos (solo para verlo después entre ustedes).',
    'l3_3p_8': 'Simulen ser observados por otros mientras tienen un encuentro íntimo triple.',

    'l3_4p_1': 'Una persona realiza un show erótico completo para las otras tres, incluyendo masturbación.',
    'l3_4p_2': 'Simulen un intercambio de parejas: dos personas actúan como observadores externos mientras las otras dos se complacen.',
    'l3_4p_3': 'Todos deben estar conectados físicamente de manera íntima simultáneamente formando una cadena.',
    'l3_4p_4': '[Player Z], tienes control total sobre las otras tres personas. Diriges exactamente qué hace cada una.',
    'l3_4p_5': 'Una persona en el centro es complacida por las otras tres de diferentes maneras simultáneamente.',

    'l3_5p_1': 'Una persona debe complacer a todas las demás en secuencia mientras las otras observan.',
    'l3_5p_2': 'Simulen una orgía completa: todos conectados íntimamente de alguna manera simultáneamente.',
    'l3_5p_3': '[Player Z] es el centro de atención: las otras cuatro personas deben satisfacer todos sus deseos.',
    'l3_5p_4': 'Divídanse en grupos y simulen intercambio de parejas mientras se observan mutuamente.'
  },
  en: {
    // Level 1 - Sensual Warm-up
    'l1_2p_1': '[Player Z], openly describe a new boundary you\'d like to test tonight. Discuss together if you both feel comfortable exploring it right now.',
    'l1_2p_2': '[Player Z], explicitly describe your deepest non-monogamous fantasy involving the other player.',
    'l1_2p_3': '[Player Z], narrate an explicit scenario involving a taboo fantasy you\'ve kept secret.',
    'l1_2p_4': '[Player Z] choose a player, blindfold them and ask them to kneel. Then explore their body freely for 5 minutes. You can use any nearby object.',
    'l1_2p_5': '[Player Z], open your mouth and close your eyes. The other player puts something inside (not necessarily edible) and makes you guess what it is while you suck.',
    'l1_2p_6': '[Player Z], order another player to undress completely. Choose the most exposed position possible and make them hold it for 60 seconds.',
    'l1_2p_7': '[Player X] use lipstick, hickeys or a cold object to leave a visible mark on the other player\'s body.',
    'l1_2p_8': '[Player Z], approach and whisper your most secret fantasy involving another player directly in their ear.',
    'l1_2p_9': '[Player Z], trace a finger slowly over every part of the body you want to explore.',
    'l1_2p_10': 'Both players, breathe deeply together, synchronizing your breathing until you feel perfectly connected.',
    'l1_2p_11': '[Player Z], blindfold your partner. Then describe three sexy things you noticed about them tonight.',
    'l1_2p_12': '[Player Z], give soft kisses on your partner\'s neck, stopping just before it gets too intense.',
    'l1_2p_13': 'Look into each other\'s eyes in silence for 30 seconds, then say exactly what you want to do next.',
    'l1_2p_14': '[Player X], perform a brief, slow and sensual dance, maintaining intense eye contact.',
    'l1_2p_15': 'Take turns exploring sensitive spots on each other\'s bodies.',
    'l1_2p_16': 'Cheers! Take a shot of rum or any liquor you like!',

    'l1_3p_1': '[Player Z], explicitly describe your deepest non-monogamous fantasy involving the players.',
    'l1_3p_2': '[Player Z], narrate an explicit scenario involving a taboo fantasy you\'ve kept secret.',
    'l1_3p_3': '[Player X], put on a blindfold and kneel. [Player Y], explore [Player X]\'s body freely for 5 minutes. You can use any nearby object.',
    'l1_3p_4': '[Player Z], open your mouth and close your eyes. [Player U], put something inside (not necessarily edible) and make them guess what it is while they suck.',
    'l1_3p_5': '[Player X], order [Player Z] and [Player U] to undress completely. Choose the most exposed position possible and make them hold it for 60 seconds.',
    'l1_3p_6': '[Player X] use lipstick, hickeys or a cold object to leave a visible mark on [Player Y]\'s body.',
    'l1_3p_7': '[Player X], approach and whisper your most secret fantasy involving [Player Z] directly in their ear.',
    'l1_3p_8': '[Player Z], trace a finger slowly over every part of [Player U]\'s body you want to explore, with the other partner watching.',
    'l1_3p_9': '[Player Z], blindfold yourself. [Player U], describe three sexy things you noticed about [Player Z] tonight.',
    'l1_3p_10': '[Player Y], give [Player X] soft kisses on their neck, stopping just before it gets too intense.',
    'l1_3p_11': '[Player X] and [Player Y], look into each other\'s eyes in silence for 30 seconds, then say exactly what you want to do next.',
    'l1_3p_12': '[Player X], perform a brief, slow and sensual dance, maintaining intense eye contact.',
    'l1_3p_13': 'Take turns exploring sensitive spots on each other\'s bodies.',
    'l1_3p_14': 'Cheers! Take a shot of rum or any liquor you like!',

    // Level 2 - Playful Challenges
    'l2_2p_1': '[Player Z], blindfold the other player and use your body to arouse them.',
    'l2_2p_2': '[Player Z] and [Player U], masturbate openly facing each other.',
    'l2_2p_3': '[Player Z], stand completely naked in front of your partner. Masturbate slowly while they watch without touching you.',
    'l2_2p_4': '[Player Z], stay still. [Player U], use only your mouth to bring them as close as possible to orgasm, then stop just before climax.',
    'l2_2p_5': 'Masturbate at the same time. You both must stop every time one of you gets close to orgasm.',
    'l2_2p_6': '[Player Z], lick every inch of [Player U]\'s body from toes to forehead.',
    'l2_2p_7': '[Player X], sit with legs wide open and hands behind your head. Let yourself be looked at and touched everywhere without moving.',
    'l2_2p_8': '[Player Z], slowly remove a piece of clothing from the other player without using your hands.',
    'l2_2p_9': '[Player Z], take the other player\'s hands and guide them exactly where you want to be touched right now.',
    'l2_2p_10': '[Player Z], stimulate the other player using your mouth and fingers simultaneously.',
    'l2_2p_11': '[Player Z], use only your tongue to intimately explore the other player for 3 minutes.',
    'l2_2p_12': 'Alternate between giving and receiving oral pleasure. Switch every 90 seconds.',
    'l2_2p_13': '[Player Z], tie the other player\'s hands and completely control their pleasure for 5 minutes.',
    'l2_2p_14': 'Have sex in a position you\'ve never tried before.',
    'l2_2p_15': '[Player Z], use toys or household objects to stimulate the other player.',

    'l2_3p_1': '[Player Z], blindfold [Player X] while [Player Y] watches and describes everything they see.',
    'l2_3p_2': '[Player Z] and [Player U], masturbate while [Player W] gives explicit instructions.',
    'l2_3p_3': '[Player X], stand naked in the center. [Player Y] and [Player Z] can touch you but you can\'t touch them.',
    'l2_3p_4': '[Player Z], stimulate [Player X] with your mouth while [Player Y] uses their hands on you.',
    'l2_3p_5': 'Form a pleasure chain: each person stimulates the next in line.',
    'l2_3p_6': '[Player X], choose which of the other two should undress first and how they should do it.',
    'l2_3p_7': 'Take turns being the observer: one watches while the other two pleasure each other.',
    'l2_3p_8': '[Player Z], use your hands on [Player X] while [Player Y] uses their mouth on [Player Z].',
    'l2_3p_9': 'Everyone must maintain intimate physical contact simultaneously for 3 minutes.',
    'l2_3p_10': '[Player X], give specific orders to [Player Y] about how to please [Player Z].',

    'l2_4p_1': 'Form two couples. One couple pleasures each other while the other watches, then switch.',
    'l2_4p_2': '[Player Z], choose two people to stimulate you simultaneously while the fourth watches.',
    'l2_4p_3': 'Caress chain: each person intimately touches the next forming a circle.',
    'l2_4p_4': 'One person in the center receives attention from the other three for 2 minutes, then rotate.',
    'l2_4p_5': 'Divide into couples and have intimate contact while maintaining eye contact with the other couple.',

    'l2_5p_1': 'One person in the center, the other four take turns giving pleasure in different ways.',
    'l2_5p_2': 'Form a star: everyone physically connected intimately at the same time.',
    'l2_5p_3': '[Player Z], choose two people to stimulate you while directing the other two on how to please each other.',

    // Level 3 - Exploration of Limits
    'l3_2p_1': 'Go out and enjoy an intimate experience in a semi-public place. It could be a bar bathroom, your garden, your balcony, or a secluded spot in the park... anywhere that excites you.',
    'l3_2p_2': 'Begin passionate sexual intercourse and change positions every 60 seconds. Choose poses you normally avoid or are embarrassed by.',
    'l3_2p_3': 'Only [Player Z] can receive pleasure. The other gives everything, without being touched or touching themselves.',
    'l3_2p_4': '[Player Z], you can only use your mouth to give pleasure to your partner for the next 3 minutes. No hands, no toys.',
    'l3_2p_5': '[Player Z], write down 3 sexual acts you\'ve never tried. [Player U] shuffle them and pick one randomly. [Player Z], do it immediately.',
    'l3_2p_6': 'Maintain sexual contact for 3 minutes without making any sound. If anyone moans or speaks, you must stop.',
    'l3_2p_7': '[Player Z], perform a complete erotic show for your partner. Include dancing, nudity and self-pleasure.',
    'l3_2p_8': 'Simulate sharing [Player Z] with an imaginary third person. Describe in detail what that person would do.',
    'l3_2p_9': '[Player Z], blindfold yourself and allow your partner to do whatever they want with you for 5 minutes.',
    'l3_2p_10': 'Record an intimate video of yourselves (just to watch together later).',
    'l3_2p_11': '[Player Z], act as if you were completely submissive. Your partner has total control.',
    'l3_2p_12': 'Have a complete sexual experience in a place where you could be discovered.',

    'l3_3p_1': '[Player Z], perform a nudity and masturbation show for the other two while they can\'t touch you.',
    'l3_3p_2': 'Simulate an encounter with an external couple. [Player X] acts as the couple while [Player Y] and [Player Z] share them.',
    'l3_3p_3': '[Player Z], blindfold yourself and allow the other two to do whatever they want with you for 5 minutes.',
    'l3_3p_4': 'One person must completely please the other two simultaneously using only their mouth and hands.',
    'l3_3p_5': 'Everyone must be naked and have simultaneous sexual contact in different combinations for 5 minutes.',
    'l3_3p_6': '[Player X], you are the director. Order exactly how [Player Y] and [Player Z] should pleasure each other.',
    'l3_3p_7': 'Record an intimate video of the three of you together (just to watch later among yourselves).',
    'l3_3p_8': 'Simulate being watched by others while having a triple intimate encounter.',

    'l3_4p_1': 'One person performs a complete erotic show for the other three, including masturbation.',
    'l3_4p_2': 'Simulate a couple swap: two people act as external observers while the other two pleasure each other.',
    'l3_4p_3': 'Everyone must be intimately connected physically simultaneously forming a chain.',
    'l3_4p_4': '[Player Z], you have total control over the other three people. You direct exactly what each one does.',
    'l3_4p_5': 'One person in the center is pleased by the other three in different ways simultaneously.',

    'l3_5p_1': 'One person must please all the others in sequence while the others watch.',
    'l3_5p_2': 'Simulate a complete orgy: everyone intimately connected somehow simultaneously.',
    'l3_5p_3': '[Player Z] is the center of attention: the other four people must satisfy all their desires.',
    'l3_5p_4': 'Divide into groups and simulate couple swapping while watching each other.'
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
    'l2_2p_11': '[Player Z], use apenas sua língua para explorar intimamente o outro jogador por 3 minutos.',
    'l2_2p_12': 'Alternem entre dar e receber prazer oral. Mudem a cada 90 segundos.',
    'l2_2p_13': '[Player Z], amarre as mãos do outro jogador e controle completamente seu prazer por 5 minutos.',
    'l2_2p_14': 'Façam sexo em uma posição que nunca experimentaram antes.',
    'l2_2p_15': '[Player Z], use brinquedos ou objetos da casa para estimular o outro jogador.',

    'l2_3p_1': '[Player Z], vende os olhos de [Player X] enquanto [Player Y] observa e descreve tudo que vê.',
    'l2_3p_2': '[Player Z] e [Player U], masturbem-se enquanto [Player W] dá instruções explícitas.',
    'l2_3p_3': '[Player X], fique nu no centro. [Player Y] e [Player Z] podem te tocar mas você não pode tocá-los.',
    'l2_3p_4': '[Player Z], estimule [Player X] com sua boca enquanto [Player Y] usa as mãos em você.',
    'l2_3p_5': 'Formem uma corrente de prazer: cada pessoa estimula a próxima em linha.',
    'l2_3p_6': '[Player X], escolha quem dos outros dois deve se despir primeiro e como devem fazê-lo.',
    'l2_3p_7': 'Alternem sendo o observador: um assiste enquanto os outros dois se satisfazem mutuamente.',
    'l2_3p_8': '[Player Z], use suas mãos em [Player X] enquanto [Player Y] usa a boca em [Player Z].',
    'l2_3p_9': 'Todos devem manter contato físico íntimo simultaneamente por 3 minutos.',
    'l2_3p_10': '[Player X], dê ordens específicas a [Player Y] sobre como satisfazer [Player Z].',

    'l2_4p_1': 'Formem dois casais. Um casal se satisfaz enquanto o outro observa, depois troquem.',
    'l2_4p_2': '[Player Z], escolha duas pessoas para te estimularem simultaneamente enquanto a quarta observa.',
    'l2_4p_3': 'Corrente de carícias: cada pessoa toca intimamente a próxima formando um círculo.',
    'l2_4p_4': 'Uma pessoa no centro recebe atenção das outras três por 2 minutos, depois rodem.',
    'l2_4p_5': 'Dividam-se em casais e tenham contato íntimo mantendo contato visual com o outro casal.',

    'l2_5p_1': 'Uma pessoa no centro, as outras quatro se alternam para dar prazer de diferentes formas.',
    'l2_5p_2': 'Formem uma estrela: todos conectados fisicamente intimamente ao mesmo tempo.',
    'l2_5p_3': '[Player Z], escolha duas pessoas para te estimular enquanto dirige as outras duas em como se satisfazer.',

    // Level 3 - Exploration of Limits
    'l3_2p_1': 'Saiam e desfrutem de uma experiência íntima em um local semi-público. Pode ser o banheiro de um bar, seu jardim, sua varanda, ou um local isolado no parque... qualquer lugar que os excite.',
    'l3_2p_2': 'Comecem uma relação sexual apaixonada e mudem de posição a cada 60 segundos. Escolham poses que normalmente evitam ou sentem vergonha.',
    'l3_2p_3': 'Apenas [Player Z] pode receber prazer. O outro dá tudo, sem ser tocado ou se tocar.',
    'l3_2p_4': '[Player Z], você só pode usar sua boca para dar prazer ao seu parceiro pelos próximos 3 minutos. Sem mãos, sem brinquedos.',
    'l3_2p_5': '[Player Z], escreva 3 atos sexuais que nunca experimentou. [Player U] embaralhe-os e escolha um aleatoriamente. [Player Z], faça-o imediatamente.',
    'l3_2p_6': 'Mantenham contato sexual por 3 minutos sem fazer nenhum som. Se alguém gemer ou falar, vocês devem parar.',
    'l3_2p_7': '[Player Z], realize um show erótico completo para seu parceiro. Inclua dança, nudez e auto-prazer.',
    'l3_2p_8': 'Simulem compartilhar [Player Z] com uma terceira pessoa imaginária. Descrevam detalhadamente o que essa pessoa faria.',
    'l3_2p_9': '[Player Z], vende seus olhos e permita que seu parceiro faça com você o que desejar por 5 minutos.',
    'l3_2p_10': 'Gravem um vídeo íntimo de vocês mesmos (apenas para assistirem juntos depois).',
    'l3_2p_11': '[Player Z], aja como se fosse completamente submisso. Seu parceiro tem controle total.',
    'l3_2p_12': 'Tenham uma experiência sexual completa em um lugar onde poderiam ser descobertos.',

    'l3_3p_1': '[Player Z], realize um show de nudez e masturbação para os outros dois enquanto eles não podem te tocar.',
    'l3_3p_2': 'Simulem um encontro com um casal externo. [Player X] atua como o casal enquanto [Player Y] e [Player Z] o compartilham.',
    'l3_3p_3': '[Player Z], vende seus olhos e permita que os outros dois façam com você o que desejarem por 5 minutos.',
    'l3_3p_4': 'Uma pessoa deve satisfazer completamente as outras duas simultaneamente usando apenas sua boca e mãos.',
    'l3_3p_5': 'Todos devem estar nus e ter contato sexual simultâneo em diferentes combinações por 5 minutos.',
    'l3_3p_6': '[Player X], você é o diretor. Ordene exatamente como [Player Y] e [Player Z] devem se satisfazer mutuamente.',
    'l3_3p_7': 'Gravem um vídeo íntimo dos três juntos (apenas para assistir depois entre vocês).',
    'l3_3p_8': 'Simulem ser observados por outros enquanto têm um encontro íntimo triplo.',

    'l3_4p_1': 'Uma pessoa realiza um show erótico completo para as outras três, incluindo masturbação.',
    'l3_4p_2': 'Simulem uma troca de casais: duas pessoas atuam como observadores externos enquanto as outras duas se satisfazem.',
    'l3_4p_3': 'Todos devem estar conectados fisicamente de maneira íntima simultaneamente formando uma corrente.',
    'l3_4p_4': '[Player Z], você tem controle total sobre as outras três pessoas. Dirige exatamente o que cada uma faz.',
    'l3_4p_5': 'Uma pessoa no centro é satisfeita pelas outras três de diferentes maneiras simultaneamente.',

    'l3_5p_1': 'Uma pessoa deve satisfazer todas as outras em sequência enquanto as outras assistem.',
    'l3_5p_2': 'Simulem uma orgia completa: todos conectados intimamente de alguma forma simultaneamente.',
    'l3_5p_3': '[Player Z] é o centro das atenções: as outras quatro pessoas devem satisfazer todos os seus desejos.',
    'l3_5p_4': 'Dividam-se em grupos e simulem troca de casais enquanto se observam mutuamente.'
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
  {
    id: 'l2_2p_11',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_12',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l2_2p_13',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_2p_14',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l2_2p_15',
    level: 2,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },

  // Level 2 - Playful Challenges (3 players)
  {
    id: 'l2_3p_1',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player X', 'Player Y']
  },
  {
    id: 'l2_3p_2',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player U', 'Player W']
  },
  {
    id: 'l2_3p_3',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y', 'Player Z']
  },
  {
    id: 'l2_3p_4',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player X', 'Player Y']
  },
  {
    id: 'l2_3p_5',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l2_3p_6',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X']
  },
  {
    id: 'l2_3p_7',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l2_3p_8',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z', 'Player X', 'Player Y']
  },
  {
    id: 'l2_3p_9',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l2_3p_10',
    level: 2,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y', 'Player Z']
  },

  // Level 2 - Playful Challenges (4 players)
  {
    id: 'l2_4p_1',
    level: 2,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l2_4p_2',
    level: 2,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: ['Player Z']
  },
  {
    id: 'l2_4p_3',
    level: 2,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l2_4p_4',
    level: 2,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l2_4p_5',
    level: 2,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },

  // Level 2 - Playful Challenges (5+ players)
  {
    id: 'l2_5p_1',
    level: 2,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: []
  },
  {
    id: 'l2_5p_2',
    level: 2,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: []
  },
  {
    id: 'l2_5p_3',
    level: 2,
    minPlayers: 5,
    maxPlayers: 10,
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
  },
  {
    id: 'l3_2p_7',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_8',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_9',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_10',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },
  {
    id: 'l3_2p_11',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_2p_12',
    level: 3,
    minPlayers: 2,
    maxPlayers: 2,
    placeholders: []
  },

  // Level 3 - Exploration of Limits (3 players)
  {
    id: 'l3_3p_1',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_3p_2',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y', 'Player Z']
  },
  {
    id: 'l3_3p_3',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_3p_4',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l3_3p_5',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l3_3p_6',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: ['Player X', 'Player Y', 'Player Z']
  },
  {
    id: 'l3_3p_7',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },
  {
    id: 'l3_3p_8',
    level: 3,
    minPlayers: 3,
    maxPlayers: 3,
    placeholders: []
  },

  // Level 3 - Exploration of Limits (4 players)
  {
    id: 'l3_4p_1',
    level: 3,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l3_4p_2',
    level: 3,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l3_4p_3',
    level: 3,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },
  {
    id: 'l3_4p_4',
    level: 3,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_4p_5',
    level: 3,
    minPlayers: 4,
    maxPlayers: 4,
    placeholders: []
  },

  // Level 3 - Exploration of Limits (5+ players)
  {
    id: 'l3_5p_1',
    level: 3,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: []
  },
  {
    id: 'l3_5p_2',
    level: 3,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: []
  },
  {
    id: 'l3_5p_3',
    level: 3,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: ['Player Z']
  },
  {
    id: 'l3_5p_4',
    level: 3,
    minPlayers: 5,
    maxPlayers: 10,
    placeholders: []
  }
];

export function getActivityText(activityId: string, language: 'es' | 'pt' | 'en'): string {
  return translations[language][activityId] || activityId;
}
