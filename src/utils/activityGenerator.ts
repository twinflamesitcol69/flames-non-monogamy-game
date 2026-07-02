// ─────────────────────────────────────────────────────────────────────────────
// Flames — Combinatorial Activity Generator
//
// Generates endless new dares that follow the exact authoring criteria of the
// hand-written catalog (see docs: one mechanic per card, internal escalation,
// consent built into the mechanic, short durations, the audience always has a
// role, tone matched to the level).
//
// Design:
//  • Trilingual templates (es/pt/en) with slots: {zone} {zone2} {time} {mod}
//  • Lexical banks aligned by index across languages
//  • Session memory: no template repeats within a sliding window, escalation
//    floor rises as cards are served → the night always builds up
//  • Hard constraints (gender placeholders, min/max players) reuse the
//    existing placeholder system, so playerSelection.ts works unchanged
// ─────────────────────────────────────────────────────────────────────────────

import { Activity } from '@/types/kingdom';
import { registerGeneratedText, Lang } from './generatedRegistry';

type Texts = Record<Lang, string>;

interface Template {
  key: string;
  level: 1 | 2 | 3;
  escalation: number; // 0..1 within the level
  mechanic: string;
  minPlayers: number;
  maxPlayers: number;
  placeholders: string[];
  texts: Texts;
}

// ── Lexical banks (index-aligned across languages) ──────────────────────────

const ZONES_L1: Record<Lang, string[]> = {
  en: ['neck', 'ear', 'shoulders', 'lower back', 'inner wrist', 'collarbone', 'hands', 'hair'],
  es: ['cuello', 'oreja', 'hombros', 'parte baja de la espalda', 'parte interna de la muñeca', 'clavícula', 'manos', 'cabello'],
  pt: ['pescoço', 'orelha', 'ombros', 'parte baixa das costas', 'parte interna do pulso', 'clavícula', 'mãos', 'cabelo'],
};

const ZONES_L2: Record<Lang, string[]> = {
  en: ['inner thighs', 'chest', 'whole body', 'most sensitive spot', 'hips', 'lower belly'],
  es: ['parte interna de los muslos', 'pecho', 'cuerpo entero', 'punto más sensible', 'caderas', 'bajo vientre'],
  pt: ['parte interna das coxas', 'peito', 'corpo inteiro', 'ponto mais sensível', 'quadris', 'baixo ventre'],
};

const TIMES: Record<Lang, string[]> = {
  en: ['30 seconds', '60 seconds', '90 seconds', '2 minutes', '3 minutes'],
  es: ['30 segundos', '60 segundos', '90 segundos', '2 minutos', '3 minutos'],
  pt: ['30 segundos', '60 segundos', '90 segundos', '2 minutos', '3 minutos'],
};

const MODS_L1: Record<Lang, string[]> = {
  en: ['without ever using your hands', 'keeping eye contact the whole time', 'in complete silence', 'as slowly as you possibly can', 'while whispering what you feel'],
  es: ['sin usar nunca las manos', 'manteniendo contacto visual todo el tiempo', 'en completo silencio', 'tan lentamente como puedas', 'susurrando lo que sientes'],
  pt: ['sem nunca usar as mãos', 'mantendo contato visual o tempo todo', 'em completo silêncio', 'o mais lentamente que conseguir', 'sussurrando o que sente'],
};

const MODS_L2: Record<Lang, string[]> = {
  en: ['without using your hands', 'in total silence', 'stopping just before it becomes too much', 'as slowly as possible', 'while the others watch without moving'],
  es: ['sin usar las manos', 'en silencio total', 'deteniéndote justo antes de que sea demasiado', 'lo más lento posible', 'mientras los demás observan sin moverse'],
  pt: ['sem usar as mãos', 'em silêncio total', 'parando pouco antes de ser demais', 'o mais devagar possível', 'enquanto os outros observam sem se mover'],
};

// ── Templates ────────────────────────────────────────────────────────────────

const T = (
  key: string, level: 1 | 2 | 3, escalation: number, mechanic: string,
  minPlayers: number, maxPlayers: number, placeholders: string[], texts: Texts,
): Template => ({ key, level, escalation, mechanic, minPlayers, maxPlayers, placeholders, texts });

const TEMPLATES: Template[] = [
  // ───────────── LEVEL 1 — Sensual Warm-up ─────────────
  T('l1_gaze', 1, 0.1, 'verbal', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z] and [Player U], sit close and hold eye contact in silence for {time}. Then each of you says one thing you desire right now.',
    es: '[Player Z] y [Player U], siéntense cerca y mírense a los ojos en silencio durante {time}. Luego cada uno dice una cosa que desea ahora mismo.',
    pt: '[Player Z] e [Player U], sentem-se perto e mantenham contato visual em silêncio por {time}. Depois cada um diz uma coisa que deseja agora.',
  }),
  T('l1_whisper', 1, 0.2, 'verbal', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], lean close to [Player U] and whisper in their ear, {mod}, exactly what you would love to do to them later tonight.',
    es: '[Player Z], acércate a [Player U] y susúrrale al oído, {mod}, exactamente lo que te encantaría hacerle más tarde esta noche.',
    pt: '[Player Z], aproxime-se de [Player U] e sussurre no ouvido, {mod}, exatamente o que adoraria fazer com essa pessoa mais tarde.',
  }),
  T('l1_compliment_map', 1, 0.3, 'verbal', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], tell [Player U] the three places on their body you cannot stop looking at tonight — and point at each one, slowly.',
    es: '[Player Z], dile a [Player U] los tres lugares de su cuerpo que no has dejado de mirar esta noche — y señala cada uno, lentamente.',
    pt: '[Player Z], diga a [Player U] os três lugares do corpo que você não parou de olhar esta noite — e aponte cada um, devagar.',
  }),
  T('l1_dance', 1, 0.35, 'performance', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], pull [Player U] up for a slow dance. Bodies pressed together for one full song, {mod}.',
    es: '[Player Z], saca a [Player U] a bailar lento. Cuerpos pegados durante una canción entera, {mod}.',
    pt: '[Player Z], chame [Player U] para uma dança lenta. Corpos colados durante uma música inteira, {mod}.',
  }),
  T('l1_trace', 1, 0.4, 'sensory', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], trace your fingertips over [Player U]’s {zone} for {time}, {mod}.',
    es: '[Player Z], recorre con la punta de los dedos el/la {zone} de [Player U] durante {time}, {mod}.',
    pt: '[Player Z], percorra com a ponta dos dedos o/a {zone} de [Player U] por {time}, {mod}.',
  }),
  T('l1_breath', 1, 0.45, 'sensory', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], breathe slowly against [Player U]’s {zone} for {time} — without ever letting your lips touch.',
    es: '[Player Z], respira lentamente sobre el/la {zone} de [Player U] durante {time} — sin dejar que tus labios lo toquen jamás.',
    pt: '[Player Z], respire lentamente sobre o/a {zone} de [Player U] por {time} — sem nunca deixar seus lábios encostarem.',
  }),
  T('l1_blind_guess', 1, 0.5, 'blindfold', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], close your eyes. [Player U], touch their {zone} with three different objects or parts of you — [Player Z] must guess each one.',
    es: '[Player Z], cierra los ojos. [Player U], toca su {zone} con tres objetos o partes de ti diferentes — [Player Z] debe adivinar cada uno.',
    pt: '[Player Z], feche os olhos. [Player U], toque o/a {zone} com três objetos ou partes de você diferentes — [Player Z] deve adivinhar cada um.',
  }),
  T('l1_mirror_touch', 1, 0.55, 'sensory', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], touch your own {zone} showing [Player U] exactly how you like to be touched. [Player U], now repeat it on them, perfectly.',
    es: '[Player Z], toca tu propio {zone} mostrándole a [Player U] exactamente cómo te gusta que te toquen. [Player U], ahora repítelo en su cuerpo, a la perfección.',
    pt: '[Player Z], toque seu próprio {zone} mostrando a [Player U] exatamente como gosta de ser tocado. [Player U], agora repita no corpo dessa pessoa, perfeitamente.',
  }),
  T('l1_kiss_line', 1, 0.6, 'sensory', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], kiss [Player U] from the {zone} up to the ear, {mod}.',
    es: '[Player Z], besa a [Player U] desde el/la {zone} hasta la oreja, {mod}.',
    pt: '[Player Z], beije [Player U] do/da {zone} até a orelha, {mod}.',
  }),
  T('l1_group_confess', 1, 0.5, 'group-verbal', 3, 10, [], {
    en: 'Everyone, in turn: confess which player you would choose for a night with no rules — and say why, looking them in the eyes.',
    es: 'Todos, por turnos: confiesen a qué jugador elegirían para una noche sin reglas — y digan por qué, mirándole a los ojos.',
    pt: 'Todos, na sua vez: confessem qual jogador escolheriam para uma noite sem regras — e digam por quê, olhando nos olhos.',
  }),
  T('l1_secret_signal', 1, 0.25, 'playful', 2, 2, [], {
    en: 'Agree on a secret signal. Whoever uses it first tonight earns the right to ask the other for any sensual favor, no questions asked.',
    es: 'Acuerden una señal secreta. Quien la use primero esta noche gana el derecho a pedirle al otro cualquier favor sensual, sin preguntas.',
    pt: 'Combinem um sinal secreto. Quem usá-lo primeiro esta noite ganha o direito de pedir ao outro qualquer favor sensual, sem perguntas.',
  }),
  T('l1_cheers', 1, 0.05, 'icebreaker', 2, 10, [], {
    en: 'Cheers! Everyone takes a sip together — and toasts to the boldest thing said so far tonight.',
    es: '¡Salud! Todos beben un trago juntos — y brindan por lo más atrevido que se ha dicho esta noche.',
    pt: 'Saúde! Todos bebem um gole juntos — e brindam à coisa mais ousada dita esta noite.',
  }),

  // ───────────── LEVEL 2 — Playful Challenges ─────────────
  T('l2_strip_slow', 2, 0.2, 'undress', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], undress [Player U] one piece at a time, {mod}.',
    es: '[Player Z], desnuda a [Player U] una prenda a la vez, {mod}.',
    pt: '[Player Z], tire a roupa de [Player U] uma peça de cada vez, {mod}.',
  }),
  T('l2_lap_tease', 2, 0.3, 'tease', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], sit on [Player U]’s lap facing them and move {mod} for {time}. Their hands stay behind their back the whole time.',
    es: '[Player Z], siéntate en el regazo de [Player U] de frente y muévete {mod} durante {time}. Sus manos se quedan atrás todo el tiempo.',
    pt: '[Player Z], sente-se no colo de [Player U] de frente e mova-se {mod} por {time}. As mãos dessa pessoa ficam para trás o tempo todo.',
  }),
  T('l2_guided_hands', 2, 0.35, 'guided', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], place [Player U]’s hands where you want them most, and guide every single movement for {time}.',
    es: '[Player Z], pon las manos de [Player U] donde más las deseas, y guía cada movimiento durante {time}.',
    pt: '[Player Z], coloque as mãos de [Player U] onde mais deseja, e guie cada movimento por {time}.',
  }),
  T('l2_lips_only', 2, 0.4, 'oral-tease', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], use only your lips on [Player U]’s {zone2} for {time}. Nothing else is allowed.',
    es: '[Player Z], usa solo tus labios sobre el/la {zone2} de [Player U] durante {time}. Nada más está permitido.',
    pt: '[Player Z], use apenas seus lábios no/na {zone2} de [Player U] por {time}. Nada mais é permitido.',
  }),
  T('l2_circle_consent', 2, 0.45, 'group-touch', 3, 10, ['Player Z'], {
    en: '[Player Z], stand in the middle. Each player, in turn, touches or kisses one part of your body they choose. You may say “pass” at any moment — and it is always respected.',
    es: '[Player Z], ponte en el centro. Cada jugador, por turnos, toca o besa una parte de tu cuerpo que elija. Puedes decir “paso” en cualquier momento — y siempre se respeta.',
    pt: '[Player Z], fique no centro. Cada jogador, na sua vez, toca ou beija uma parte do seu corpo que escolher. Você pode dizer “passo” a qualquer momento — e será sempre respeitado.',
  }),
  T('l2_no_hands', 2, 0.5, 'constraint', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], excite [Player U] as much as you can for {time}, using everything except your hands.',
    es: '[Player Z], excita a [Player U] tanto como puedas durante {time}, usando todo excepto las manos.',
    pt: '[Player Z], excite [Player U] o máximo que conseguir por {time}, usando tudo exceto as mãos.',
  }),
  T('l2_ice_trail', 2, 0.55, 'sensory', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], run something cold over [Player U]’s naked {zone2} — then warm every spot back up with your mouth.',
    es: '[Player Z], pasa algo frío por el/la {zone2} desnudo de [Player U] — y luego calienta cada punto con tu boca.',
    pt: '[Player Z], passe algo gelado no/na {zone2} de [Player U] — e depois aqueça cada ponto com a boca.',
  }),
  T('l2_edge_show', 2, 0.6, 'edging', 2, 2, ['Player Z', 'Player U'], {
    en: '[Player Z], pleasure yourself in front of [Player U] — but stop every time they raise a hand. They control your rhythm completely.',
    es: '[Player Z], date placer frente a [Player U] — pero detente cada vez que levante la mano. Esa persona controla tu ritmo por completo.',
    pt: '[Player Z], dê prazer a si mesmo na frente de [Player U] — mas pare toda vez que essa pessoa levantar a mão. Ela controla totalmente o seu ritmo.',
  }),
  T('l2_director', 2, 0.65, 'command', 3, 10, ['Player Z', 'Player U', 'Player W'], {
    en: '[Player Z], you are the director: tell [Player U] and [Player W] exactly how to touch each other — and they must obey, move by move.',
    es: '[Player Z], eres el director: dile a [Player U] y [Player W] exactamente cómo tocarse — y deben obedecer, movimiento a movimiento.',
    pt: '[Player Z], você é o diretor: diga a [Player U] e [Player W] exatamente como se tocarem — e eles devem obedecer, movimento por movimento.',
  }),
  T('l2_blind_mouths', 2, 0.7, 'blindfold', 3, 10, ['Player Z'], {
    en: '[Player Z], blindfold yourself. The others take turns using their mouths on your {zone2} — guess who each one is.',
    es: '[Player Z], véndate los ojos. Los demás se turnan usando su boca sobre tu {zone2} — adivina quién es cada uno.',
    pt: '[Player Z], vende os olhos. Os outros se revezam usando a boca no/na sua {zone2} — adivinhe quem é cada um.',
  }),
  T('l2_sync_stop', 2, 0.75, 'edging', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z] and [Player U], stimulate each other at the same time — and freeze completely every {time}. Restart only when you are both breathing in sync.',
    es: '[Player Z] y [Player U], estimúlense al mismo tiempo — y quédense inmóviles cada {time}. Reinicien solo cuando respiren al mismo ritmo.',
    pt: '[Player Z] e [Player U], estimulem-se ao mesmo tempo — e congelem completamente a cada {time}. Recomecem apenas quando estiverem respirando no mesmo ritmo.',
  }),

  // ───────────── LEVEL 3 — Exploration of Limits ─────────────
  T('l3_permission', 3, 0.25, 'consent-ritual', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], ask [Player U] out loud, in explicit detail, for permission to do exactly what you have wanted all night. They answer: yes, no, or “convince me”.',
    es: '[Player Z], pídele a [Player U] en voz alta, con detalle explícito, permiso para hacer exactamente lo que has querido toda la noche. Responde: sí, no, o “convénceme”.',
    pt: '[Player Z], peça a [Player U] em voz alta, em detalhe explícito, permissão para fazer exatamente o que você quis a noite toda. A resposta: sim, não, ou “me convença”.',
  }),
  T('l3_mouth_only', 3, 0.35, 'constraint', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], for the next {time} you may use only your mouth on [Player U]. Nothing else. Make it count.',
    es: '[Player Z], durante los próximos {time} solo puedes usar tu boca sobre [Player U]. Nada más. Que valga la pena.',
    pt: '[Player Z], pelos próximos {time} você só pode usar a boca em [Player U]. Nada mais. Faça valer.',
  }),
  T('l3_watch_direct', 3, 0.4, 'compersion', 3, 10, ['Player Z'], {
    en: '[Player Z], choose two players. Sit back and watch them please each other — you may speak only to give one instruction per minute.',
    es: '[Player Z], elige a dos jugadores. Recuéstate y míralos darse placer — solo puedes hablar para dar una instrucción por minuto.',
    pt: '[Player Z], escolha dois jogadores. Recoste-se e assista enquanto eles se dão prazer — você só pode falar para dar uma instrução por minuto.',
  }),
  T('l3_position_roulette', 3, 0.5, 'timer', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z] and [Player U], start making love and switch position every {time}. Choose poses you normally avoid.',
    es: '[Player Z] y [Player U], comiencen a hacer el amor y cambien de posición cada {time}. Elijan poses que normalmente evitan.',
    pt: '[Player Z] e [Player U], comecem a fazer amor e troquem de posição a cada {time}. Escolham poses que normalmente evitam.',
  }),
  T('l3_silent_group', 3, 0.55, 'constraint', 3, 10, [], {
    en: 'Everyone: intimate contact in total silence for {time}. A single moan restarts the timer for the whole group.',
    es: 'Todos: contacto íntimo en silencio total durante {time}. Un solo gemido reinicia el tiempo para todo el grupo.',
    pt: 'Todos: contato íntimo em silêncio total por {time}. Um único gemido reinicia o tempo para o grupo inteiro.',
  }),
  T('l3_two_on_one', 3, 0.6, 'group', 3, 10, ['Player Z', 'Player U', 'Player W'], {
    en: '[Player U] and [Player W], devote yourselves entirely to [Player Z]’s pleasure for {time}. [Player Z] only receives — nothing is asked in return.',
    es: '[Player U] y [Player W], dedíquense por completo al placer de [Player Z] durante {time}. [Player Z] solo recibe — no se le pide nada a cambio.',
    pt: '[Player U] e [Player W], dediquem-se inteiramente ao prazer de [Player Z] por {time}. [Player Z] apenas recebe — nada é pedido em troca.',
  }),
  T('l3_full_control', 3, 0.7, 'power', 2, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], agree on a stop-word with [Player U]. Then, for {time}, their body is yours to enjoy exactly as you desire.',
    es: '[Player Z], acuerda una palabra de seguridad con [Player U]. Luego, durante {time}, su cuerpo es tuyo para disfrutarlo exactamente como desees.',
    pt: '[Player Z], combine uma palavra de segurança com [Player U]. Depois, por {time}, o corpo dessa pessoa é seu para aproveitar exatamente como desejar.',
  }),
  T('l3_group_countdown', 3, 0.75, 'group-timer', 3, 10, ['Player Z', 'Player U'], {
    en: '[Player Z], bring [Player U] to the edge before the group’s countdown of {time} ends. The group sets the rhythm out loud.',
    es: '[Player Z], lleva a [Player U] al límite antes de que termine la cuenta regresiva del grupo de {time}. El grupo marca el ritmo en voz alta.',
    pt: '[Player Z], leve [Player U] ao limite antes que a contagem regressiva do grupo de {time} termine. O grupo dita o ritmo em voz alta.',
  }),
  T('l3_semi_public', 3, 0.8, 'daring', 2, 2, [], {
    en: 'Find the most daring spot you can reach in five minutes — balcony, hallway, garden — and enjoy each other there.',
    es: 'Encuentren el lugar más atrevido al que puedan llegar en cinco minutos — balcón, pasillo, jardín — y disfrútense allí.',
    pt: 'Encontrem o lugar mais ousado que conseguirem alcançar em cinco minutos — varanda, corredor, jardim — e aproveitem um ao outro lá.',
  }),
  T('l3_swap_scene', 3, 0.85, 'enm-swap', 4, 10, [], {
    en: 'Form new pairs — no one with their usual partner. Enjoy each other side by side, close enough to watch everything.',
    es: 'Formen parejas nuevas — nadie con su pareja habitual. Disfrútense lado a lado, lo bastante cerca para verlo todo.',
    pt: 'Formem novos pares — ninguém com o parceiro de sempre. Aproveitem lado a lado, perto o suficiente para ver tudo.',
  }),
];

// ── Session memory ───────────────────────────────────────────────────────────

const RECENT_WINDOW = 7;
let recentKeys: string[] = [];
let servedByLevel: Record<number, number> = { 1: 0, 2: 0, 3: 0 };
let idCounter = 0;

export function resetGeneratorSession(): void {
  recentKeys = [];
  servedByLevel = { 1: 0, 2: 0, 3: 0 };
}

// ── Core generation ──────────────────────────────────────────────────────────

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillSlots(template: Template): Texts {
  // Pick bank indices once so all three languages stay semantically aligned.
  const zoneIdx = Math.floor(Math.random() * ZONES_L1.en.length);
  const zone2Idx = Math.floor(Math.random() * ZONES_L2.en.length);
  const timeIdx = Math.floor(Math.random() * TIMES.en.length);
  const modBank = template.level === 1 ? MODS_L1 : MODS_L2;
  const modIdx = Math.floor(Math.random() * modBank.en.length);

  const out = {} as Texts;
  (['es', 'pt', 'en'] as Lang[]).forEach((lang) => {
    out[lang] = template.texts[lang]
      .replace(/\{zone\}/g, ZONES_L1[lang][zoneIdx])
      .replace(/\{zone2\}/g, ZONES_L2[lang][zone2Idx])
      .replace(/\{time\}/g, TIMES[lang][timeIdx])
      .replace(/\{mod\}/g, modBank[lang][modIdx]);
  });
  return out;
}

/**
 * Generate a brand-new activity for the given level and player count.
 * Never repeats a template within the recent window; escalation rises
 * softly as the session progresses.
 */
export function generateActivity(level: 1 | 2 | 3, numPlayers: number): Activity {
  const eligible = TEMPLATES.filter(
    (t) => t.level === level && t.minPlayers <= numPlayers && t.maxPlayers >= numPlayers,
  );

  // Escalation floor: after N generated cards on this level, prefer bolder ones.
  const floor = Math.min(0.6, servedByLevel[level] * 0.07);
  let pool = eligible.filter((t) => t.escalation >= floor && !recentKeys.includes(t.key));
  if (pool.length === 0) pool = eligible.filter((t) => !recentKeys.includes(t.key));
  if (pool.length === 0) pool = eligible; // safety net

  const template = pick(pool);

  recentKeys.push(template.key);
  if (recentKeys.length > RECENT_WINDOW) recentKeys.shift();
  servedByLevel[level] += 1;

  const id = `gen_l${level}_${++idCounter}_${Math.random().toString(36).slice(2, 7)}`;
  registerGeneratedText(id, fillSlots(template));

  return {
    id,
    level,
    minPlayers: template.minPlayers,
    maxPlayers: template.maxPlayers,
    placeholders: template.placeholders,
  };
}
