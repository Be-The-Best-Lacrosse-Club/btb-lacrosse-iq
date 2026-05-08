/**
 * BTB Lacrosse IQ — Complete Concept Taxonomy
 * Designed for Dan Achatz / BTB Lacrosse Club, Long Island
 *
 * Structure: Category > Sub-concept > Specific Action > Variation[]
 * Usage: import TAXONOMY, SEARCH_SYNONYMS, CONCEPT_COLORS, DIFFICULTY_CRITERIA
 */

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY TREE
// ─────────────────────────────────────────────────────────────────────────────

const TAXONOMY = {

  // ── 1. DODGING ──────────────────────────────────────────────────────────────
  DODGING: {
    label: 'Dodging',
    slug: 'dodging',
    subconcepts: {
      SPLIT_DODGE: {
        label: 'Split Dodge',
        slug: 'split-dodge',
        actions: {
          INSIDE_HAND_FINISH: {
            label: 'Inside Hand Finish',
            slug: 'inside-hand-finish',
            variations: ['top-side split inside hand', 'step-down split inside hand', 'split to shot inside hand', 'split to feed inside hand'],
          },
          OUTSIDE_HAND_FINISH: {
            label: 'Outside Hand Finish',
            slug: 'outside-hand-finish',
            variations: ['top-side split outside hand', 'step-down split outside hand', 'split to shot outside hand', 'split to feed outside hand'],
          },
          TOPSIDE_SPLIT: {
            label: 'Top-Side Split',
            slug: 'topside-split',
            variations: ['split dodge top-side drive', 'split to backpipe'],
          },
          STEP_DOWN_SPLIT: {
            label: 'Step-Down Split',
            slug: 'step-down-split',
            variations: ['step-down force baseline', 'step-down to feed', 'step-down to shot'],
          },
        },
      },
      ROLL_DODGE: {
        label: 'Roll Dodge',
        slug: 'roll-dodge',
        actions: {
          ROLL_TO_NEAR_PIPE: { label: 'Roll to Near Pipe', slug: 'roll-near-pipe', variations: ['inside hand roll finish', 'roll overhand near pipe'] },
          ROLL_TO_FAR_PIPE:  { label: 'Roll to Far Pipe',  slug: 'roll-far-pipe',  variations: ['outside hand roll finish', 'roll overhand far pipe'] },
          ROLL_TO_FEED:      { label: 'Roll to Feed',      slug: 'roll-to-feed',   variations: ['roll and dish', 'roll and backpipe feed', 'roll and crease feed'] },
          REVERSE_ROLL:      { label: 'Reverse Roll',      slug: 'reverse-roll',   variations: ['reverse roll to shot', 'reverse roll to feed'] },
        },
      },
      FACE_DODGE: {
        label: 'Face Dodge',
        slug: 'face-dodge',
        actions: {
          FACE_DODGE_TOPSIDE:  { label: 'Face Dodge Top-Side',  slug: 'face-dodge-topside',  variations: ['face dodge to shot top', 'face dodge to feed top'] },
          FACE_DODGE_BASELINE: { label: 'Face Dodge Baseline',  slug: 'face-dodge-baseline', variations: ['face dodge to baseline shot', 'face dodge pump then go'] },
          FACE_DODGE_TO_FEED:  { label: 'Face Dodge to Feed',   slug: 'face-dodge-feed',     variations: ['face dodge crease feed', 'face dodge backpipe feed'] },
        },
      },
      INSIDE_ROLL: {
        label: 'Inside Roll',
        slug: 'inside-roll',
        actions: {
          INSIDE_ROLL_FROM_WING: { label: 'Inside Roll from Wing', slug: 'inside-roll-wing', variations: ['inside roll near pipe', 'inside roll far pipe'] },
          INSIDE_ROLL_FROM_TOP:  { label: 'Inside Roll from Top',  slug: 'inside-roll-top',  variations: ['inside roll to crease', 'inside roll to feed'] },
          INSIDE_ROLL_TO_FEED:   { label: 'Inside Roll to Feed',   slug: 'inside-roll-feed', variations: ['inside roll backpipe feed', 'inside roll crease feed'] },
        },
      },
      ROCKER_DODGE: {
        label: 'Rocker Dodge',
        slug: 'rocker',
        actions: {
          ROCKER_TOPSIDE:  { label: 'Rocker Top-Side',  slug: 'rocker-topside',  variations: ['rocker to shot', 'rocker to feed top'] },
          ROCKER_BASELINE: { label: 'Rocker Baseline',  slug: 'rocker-baseline', variations: ['rocker step baseline', 'rocker to feed baseline'] },
        },
      },
      QUESTION_MARK_DODGE: {
        label: 'Question Mark Dodge',
        slug: 'question-mark',
        actions: {
          QUESTION_MARK_TOPSIDE:      { label: 'Question Mark Top-Side',      slug: 'qm-topside',      variations: ['question mark to shot', 'question mark to crease'] },
          QUESTION_MARK_BACKPIPE:     { label: 'Question Mark to Backpipe',   slug: 'qm-backpipe',     variations: ['question mark backpipe feed', 'question mark backpipe finish'] },
          QUESTION_MARK_CREASE_FEED:  { label: 'Question Mark to Crease Feed',slug: 'qm-crease-feed',  variations: ['question mark seal cut feed'] },
        },
      },
      X_DODGE: {
        label: 'X Dodge',
        slug: 'x-dodge',
        actions: {
          X_DODGE_TOPSIDE:  { label: 'X Dodge Top-Side',  slug: 'x-dodge-topside',  variations: ['drive from X top-side'] },
          X_DODGE_BASELINE: { label: 'X Dodge Baseline',  slug: 'x-dodge-baseline', variations: ['drive from X baseline', 'wrap around from X'] },
          X_DODGE_TO_FEED:  { label: 'X Dodge to Feed',   slug: 'x-dodge-feed',     variations: ['X dodge then feed crease', 'X dodge then backpipe'] },
        },
      },
      BULL_DODGE: {
        label: 'Bull Dodge',
        slug: 'bull-dodge',
        actions: {
          BULL_DODGE_TO_SHOT: { label: 'Bull Dodge to Shot', slug: 'bull-dodge-shot', variations: ['bull dodge near pipe', 'bull dodge far pipe'] },
          BULL_DODGE_TO_FEED: { label: 'Bull Dodge to Feed', slug: 'bull-dodge-feed', variations: ['bull dodge crease feed', 'bull dodge backpipe feed'] },
        },
      },
    },
  },

  // ── 2. FEEDING ───────────────────────────────────────────────────────────────
  FEEDING: {
    label: 'Feeding',
    slug: 'feeding',
    subconcepts: {
      BACKPIPE_FEED: {
        label: 'Backpipe Feed',
        slug: 'backpipe-feed',
        actions: {
          BACKPIPE_FROM_TOP:       { label: 'Backpipe Feed from Top',           slug: 'backpipe-top',         variations: ['backpipe overhand', 'backpipe sidearm', 'backpipe quick-stick'] },
          BACKPIPE_FROM_WING_L:    { label: 'Backpipe Feed from Wing (Left)',    slug: 'backpipe-wing-left',   variations: ['left wing backpipe'] },
          BACKPIPE_FROM_WING_R:    { label: 'Backpipe Feed from Wing (Right)',   slug: 'backpipe-wing-right',  variations: ['right wing backpipe'] },
          BACKPIPE_OFF_SPLIT:      { label: 'Backpipe Feed off Split Dodge',     slug: 'backpipe-off-split',   variations: ['split dodge then backpipe'] },
          BACKPIPE_OFF_ROLL:       { label: 'Backpipe Feed off Roll Dodge',      slug: 'backpipe-off-roll',    variations: ['roll dodge then backpipe'] },
          BACKPIPE_THROWBACK:      { label: 'Backpipe Feed off Throwback',       slug: 'backpipe-throwback',   variations: ['throwback then backpipe', 'two-man throwback backpipe'] },
          BACKPIPE_TO_CREASE:      { label: 'Backpipe Feed to Crease Finisher',  slug: 'backpipe-crease',      variations: ['backpipe to seal cutter', 'backpipe to back-door cutter'] },
          QUICK_STICK_BACKPIPE:    { label: 'Quick-Stick Backpipe Feed',         slug: 'qs-backpipe',          variations: ['catch and release backpipe'] },
        },
      },
      CREASE_FEED: {
        label: 'Crease Feed',
        slug: 'crease-feed',
        actions: {
          CREASE_FEED_FROM_TOP:    { label: 'Crease Feed from Top',        slug: 'crease-feed-top',    variations: ['top crease feed overhand', 'top crease feed sidearm'] },
          CREASE_FEED_FROM_ALLEY:  { label: 'Crease Feed from Alley',      slug: 'crease-feed-alley',  variations: ['alley crease feed'] },
          CREASE_FEED_FROM_X:      { label: 'Crease Feed from Behind Net',  slug: 'crease-feed-x',      variations: ['X to crease feed', 'behind net crease feed'] },
          CREASE_FEED_SEAL_CUT:    { label: 'Crease Feed to Seal Cutter',   slug: 'crease-feed-seal',   variations: ['seal cut finish', 'crease seal feed'] },
          CREASE_FEED_BACKDOOR:    { label: 'Crease Feed to Back-Door',     slug: 'crease-feed-bd',     variations: ['back door crease feed finish'] },
          CREASE_FEED_HIGH_LOW:    { label: 'Crease Feed High-to-Low',      slug: 'crease-feed-h2l',    variations: [] },
          CREASE_FEED_LOW_HIGH:    { label: 'Crease Feed Low-to-High',      slug: 'crease-feed-l2h',    variations: [] },
        },
      },
      ALLEY_FEED: {
        label: 'Alley Feed',
        slug: 'alley-feed',
        actions: {
          ALLEY_FEED_FROM_TOP:   { label: 'Alley Feed from Top',      slug: 'alley-top',    variations: [] },
          ALLEY_FEED_DRIVE_DISH: { label: 'Alley Drive and Dish',     slug: 'alley-dd',     variations: ['drive alley dish to crease'] },
          ALLEY_FEED_SKIP:       { label: 'Alley Skip Pass',          slug: 'alley-skip',   variations: ['alley skip to shooter'] },
        },
      },
      SKIP_PASS: {
        label: 'Skip Pass',
        slug: 'skip-pass',
        actions: {
          SKIP_WING_TO_WING:   { label: 'Skip Wing-to-Wing',       slug: 'skip-w2w',   variations: ['skip to shooter', 'skip to feeder reset'] },
          SKIP_TOP_TO_CREASE:  { label: 'Skip Top-to-Crease',      slug: 'skip-t2c',   variations: [] },
          SKIP_WING_TO_CREASE: { label: 'Skip Wing-to-Crease',     slug: 'skip-w2c',   variations: [] },
          SKIP_THEN_CUT:       { label: 'Skip and Cut',            slug: 'skip-cut',   variations: ['skip pass back-door', 'skip and cut to crease'] },
        },
      },
      BTB_FEED: {
        label: 'Behind-the-Back Feed',
        slug: 'btb-feed',
        actions: {
          BTB_FROM_TOP:  { label: 'BTB Feed from Top',      slug: 'btb-top',   variations: ['behind-the-back feed top'] },
          BTB_FROM_WING: { label: 'BTB Feed from Wing',     slug: 'btb-wing',  variations: ['behind-the-back feed wing'] },
          BTB_OFF_DODGE: { label: 'BTB Feed off Dodge',     slug: 'btb-dodge', variations: ['behind-the-back off split', 'BTB off roll'] },
        },
      },
      QUICK_STICK_FEED: {
        label: 'Quick-Stick Feed',
        slug: 'quick-stick-feed',
        actions: {
          QS_CREASE:     { label: 'Quick-Stick Crease Feed',   slug: 'qs-crease',   variations: ['catch and release crease'] },
          QS_BACKPIPE:   { label: 'Quick-Stick Backpipe Feed', slug: 'qs-backpipe', variations: ['catch and release backpipe'] },
          QS_ALLEY:      { label: 'Quick-Stick Alley Feed',    slug: 'qs-alley',    variations: [] },
        },
      },
      BEHIND_NET_FEED: {
        label: 'Behind-the-Net Feed (from X)',
        slug: 'behind-net-feed',
        actions: {
          X_FEED_CREASE:    { label: 'X Feed to Crease',      slug: 'x-feed-crease',   variations: ['from X to seal cut', 'from X to back-door'] },
          X_FEED_WING:      { label: 'X Feed to Wing',        slug: 'x-feed-wing',     variations: [] },
          X_FEED_BACKPIPE:  { label: 'X Feed Backpipe',       slug: 'x-feed-backpipe', variations: ['behind net backpipe'] },
          X_FEED_OFF_SCREEN:{ label: 'X Feed off Screen',     slug: 'x-feed-screen',   variations: [] },
          X_FEED_BTB:       { label: 'X Feed Behind the Back',slug: 'x-feed-btb',      variations: [] },
          X_FEED_HIP:       { label: 'X Hip Feed',            slug: 'x-hip-feed',      variations: [] },
        },
      },
      HIP_FEED: {
        label: 'Hip Feed',
        slug: 'hip-feed',
        actions: {
          HIP_FEED_CREASE:   { label: 'Hip Feed to Crease',   slug: 'hip-crease',   variations: [] },
          HIP_FEED_BACKPIPE: { label: 'Hip Feed Backpipe',    slug: 'hip-backpipe', variations: [] },
          HIP_FEED_DRIVE_DISH:{ label: 'Hip Feed Drive and Dish', slug: 'hip-dd', variations: [] },
        },
      },
    },
  },

  // ── 3. FINISHING ─────────────────────────────────────────────────────────────
  FINISHING: {
    label: 'Finishing',
    slug: 'finishing',
    subconcepts: {
      NEAR_PIPE: {
        label: 'Near Pipe Finish',
        slug: 'near-pipe',
        actions: {
          NEAR_PIPE_OVERHAND:  { label: 'Near Pipe Overhand', slug: 'near-pipe-oh',     variations: ['near pipe top corner', 'near pipe low'] },
          NEAR_PIPE_SIDEARM:   { label: 'Near Pipe Sidearm',  slug: 'near-pipe-sa',     variations: [] },
          NEAR_PIPE_BOUNCE:    { label: 'Near Pipe Bounce',   slug: 'near-pipe-bounce', variations: [] },
          NEAR_PIPE_OFF_DODGE: { label: 'Near Pipe off Dodge',slug: 'near-pipe-dodge',  variations: ['split near pipe', 'roll near pipe'] },
          NEAR_PIPE_OFF_FEED:  { label: 'Near Pipe off Feed', slug: 'near-pipe-feed',   variations: ['crease feed near pipe', 'backpipe near pipe'] },
        },
      },
      FAR_PIPE: {
        label: 'Far Pipe Finish',
        slug: 'far-pipe',
        actions: {
          FAR_PIPE_OVERHAND: { label: 'Far Pipe Overhand',  slug: 'far-pipe-oh',    variations: [] },
          FAR_PIPE_SIDEARM:  { label: 'Far Pipe Sidearm',   slug: 'far-pipe-sa',    variations: [] },
          FAR_PIPE_L2H:      { label: 'Far Pipe Low-to-High',slug: 'far-pipe-l2h', variations: [] },
          FAR_PIPE_BOUNCE:   { label: 'Far Pipe Bounce',    slug: 'far-pipe-bounce',variations: [] },
          FAR_PIPE_OFF_SKIP: { label: 'Far Pipe off Skip Pass', slug: 'far-pipe-skip', variations: [] },
        },
      },
      LOW_TO_HIGH: {
        label: 'Low-to-High Shot',
        slug: 'low-to-high',
        actions: {
          L2H_FROM_WING: { label: 'Low-to-High from Wing', slug: 'l2h-wing', variations: [] },
          L2H_FROM_TOP:  { label: 'Low-to-High from Top',  slug: 'l2h-top',  variations: [] },
          L2H_BOUNCE:    { label: 'Low-to-High Bounce',    slug: 'l2h-bounce',variations: ['bounce into cage'] },
          L2H_OFF_FEED:  { label: 'Low-to-High off Crease Feed', slug: 'l2h-feed', variations: [] },
        },
      },
      HIGH_TO_LOW: {
        label: 'High-to-Low Shot',
        slug: 'high-to-low',
        actions: {
          H2L_FROM_TOP:  { label: 'High-to-Low from Top (Snap Down)', slug: 'h2l-top',  variations: ['snap down near pipe', 'snap down far pipe'] },
          H2L_FROM_WING: { label: 'High-to-Low from Wing',            slug: 'h2l-wing', variations: [] },
          H2L_FAR_PIPE:  { label: 'High-to-Low Far Pipe',             slug: 'h2l-far',  variations: [] },
        },
      },
      BOUNCE_SHOT: {
        label: 'Bounce Shot',
        slug: 'bounce-shot',
        actions: {
          BOUNCE_OVERHAND:  { label: 'Bounce Overhand',          slug: 'bounce-oh',   variations: [] },
          BOUNCE_SIDEARM:   { label: 'Bounce Sidearm',           slug: 'bounce-sa',   variations: [] },
          BOUNCE_NEAR_PIPE: { label: 'Bounce Near Pipe',         slug: 'bounce-near', variations: [] },
          BOUNCE_FAR_PIPE:  { label: 'Bounce Far Pipe',          slug: 'bounce-far',  variations: [] },
          BOUNCE_OFF_FEED:  { label: 'Bounce off Crease Feed',   slug: 'bounce-feed', variations: [] },
        },
      },
      BTB_SHOT: {
        label: 'Behind-the-Back Shot',
        slug: 'btb-shot',
        actions: {
          BTB_FROM_WING:   { label: 'BTB Shot from Wing',   slug: 'btb-shot-wing',  variations: [] },
          BTB_FROM_CREASE: { label: 'BTB Shot from Crease', slug: 'btb-shot-crease',variations: [] },
          BTB_FROM_X:      { label: 'BTB Shot from X',      slug: 'btb-shot-x',     variations: [] },
        },
      },
      OVERHAND_SHOT: {
        label: 'Overhand Shot',
        slug: 'overhand',
        actions: {
          OVERHAND_TOP_CORNER: { label: 'Overhand Top Corner',  slug: 'oh-top',    variations: ['overhand top-right', 'overhand top-left'] },
          OVERHAND_LOW_CORNER: { label: 'Overhand Low Corner',  slug: 'oh-low',    variations: ['overhand low near pipe', 'overhand low far pipe'] },
          OVERHAND_PIPE:       { label: 'Overhand Pipe Shot',   slug: 'oh-pipe',   variations: [] },
        },
      },
      SIDEARM_SHOT: {
        label: 'Sidearm Shot',
        slug: 'sidearm',
        actions: {
          SIDEARM_NEAR_PIPE: { label: 'Sidearm Near Pipe',    slug: 'sa-near',   variations: [] },
          SIDEARM_FAR_PIPE:  { label: 'Sidearm Far Pipe',     slug: 'sa-far',    variations: [] },
          SIDEARM_L2H:       { label: 'Sidearm Low-to-High',  slug: 'sa-l2h',    variations: [] },
          SIDEARM_BOUNCE:    { label: 'Sidearm Bounce',       slug: 'sa-bounce', variations: [] },
        },
      },
      UNDERHAND_SHOT: {
        label: 'Underhand Shot',
        slug: 'underhand',
        actions: {
          UNDERHAND_NEAR_PIPE:    { label: 'Underhand Near Pipe',    slug: 'uh-near',   variations: [] },
          UNDERHAND_FAR_PIPE:     { label: 'Underhand Far Pipe',     slug: 'uh-far',    variations: [] },
          UNDERHAND_CREASE:       { label: 'Underhand Crease Finish',slug: 'uh-crease', variations: [] },
        },
      },
      CREASE_FINISH: {
        label: 'Crease Finish',
        slug: 'crease-finish',
        actions: {
          CREASE_FINISH_OH:      { label: 'Crease Finish Overhand',     slug: 'cf-oh',       variations: [] },
          CREASE_FINISH_SA:      { label: 'Crease Finish Sidearm',      slug: 'cf-sa',       variations: [] },
          CREASE_FINISH_UH:      { label: 'Crease Finish Underhand',    slug: 'cf-uh',       variations: [] },
          CREASE_BACKDOOR:       { label: 'Crease Finish Back-Door Cut',slug: 'cf-backdoor', variations: [] },
          CREASE_SEAL_CUT:       { label: 'Crease Finish Seal Cut',     slug: 'cf-seal',     variations: [] },
          CREASE_QUICK_STICK:    { label: 'Crease Finish Quick-Stick',  slug: 'cf-qs',       variations: [] },
          CREASE_NEAR_PIPE:      { label: 'Crease Finish Near Pipe',    slug: 'cf-near',     variations: [] },
          CREASE_FAR_PIPE:       { label: 'Crease Finish Far Pipe',     slug: 'cf-far',      variations: [] },
        },
      },
      OFF_HIP_FINISH: {
        label: 'Off-Hip Finish',
        slug: 'off-hip',
        actions: {
          OFF_HIP_NEAR: { label: 'Off-Hip Near Pipe', slug: 'off-hip-near',   variations: [] },
          OFF_HIP_FAR:  { label: 'Off-Hip Far Pipe',  slug: 'off-hip-far',    variations: [] },
          OFF_HIP_BOUNCE:{ label: 'Off-Hip Bounce',   slug: 'off-hip-bounce', variations: [] },
        },
      },
    },
  },

  // ── 4. TWO-MAN GAME ──────────────────────────────────────────────────────────
  TWO_MAN_GAME: {
    label: 'Two-Man Game',
    slug: 'two-man-game',
    subconcepts: {
      PICK_AND_ROLL: {
        label: 'Pick and Roll',
        slug: 'pick-and-roll',
        actions: {
          PAR_BALL_HANDLER:  { label: 'Pick and Roll (Ball Handler Drives)', slug: 'par-drive',    variations: ['pick and roll top', 'pick and roll wing'] },
          PAR_ROLLER:        { label: 'Pick and Roll (Roller to Crease)',    slug: 'par-roller',   variations: ['roller crease finish', 'roller backpipe finish'] },
          PAR_TO_FEED:       { label: 'Pick and Roll to Feed',               slug: 'par-feed',     variations: ['pick and roll then backpipe', 'pick and roll then crease feed'] },
          DOWN_PICK_ROLL:    { label: 'Down Pick and Roll',                  slug: 'down-pick-roll',variations: [] },
        },
      },
      PICK_AND_FADE: {
        label: 'Pick and Fade',
        slug: 'pick-and-fade',
        actions: {
          PAF_BALL_HANDLER: { label: 'Pick and Fade (Ball Handler Drives)', slug: 'paf-drive', variations: [] },
          PAF_FADER:        { label: 'Pick and Fade (Fader Cuts Away)',     slug: 'paf-fade',  variations: ['fade to skip pass', 'pick and fade top'] },
        },
      },
      THROWBACK_PASS: {
        label: 'Throwback Pass',
        slug: 'throwback',
        actions: {
          THROWBACK_BACKPIPE:  { label: 'Throwback to Backpipe Feed',   slug: 'throwback-backpipe', variations: ['throwback then backpipe to crease', 'throwback backpipe shooter'] },
          THROWBACK_CREASE:    { label: 'Throwback to Crease Feed',     slug: 'throwback-crease',   variations: [] },
          THROWBACK_SHOOTER:   { label: 'Throwback to Shooter',         slug: 'throwback-shot',     variations: ['throwback shot overhand', 'throwback skip'] },
          THROWBACK_OFF_DODGE: { label: 'Throwback off Dodge',          slug: 'throwback-dodge',    variations: ['split then throwback', 'roll then throwback'] },
          THROWBACK_RESET:     { label: 'Throwback Reset',              slug: 'throwback-reset',    variations: ['two-man throwback reset'] },
        },
      },
      BACK_DOOR_TWO_MAN: {
        label: 'Back-Door Cut (Two-Man)',
        slug: 'backdoor-two-man',
        actions: {
          BD_FROM_CREASE: { label: 'Back-Door from Crease', slug: 'bd-crease', variations: ['back door crease finish near pipe'] },
          BD_FROM_WING:   { label: 'Back-Door from Wing',   slug: 'bd-wing',   variations: [] },
          BD_FINISH:      { label: 'Back-Door Finish',      slug: 'bd-finish', variations: ['back door overhand', 'back door sidearm'] },
        },
      },
      DRIVE_AND_DISH: {
        label: 'Drive and Dish',
        slug: 'drive-and-dish',
        actions: {
          DD_TO_CREASE:  { label: 'Drive and Dish to Crease',  slug: 'dd-crease',  variations: [] },
          DD_BACKPIPE:   { label: 'Drive and Dish Backpipe',   slug: 'dd-backpipe',variations: [] },
          DD_TO_CUTTER:  { label: 'Drive and Dish to Cutter',  slug: 'dd-cutter',  variations: [] },
          DD_OFF_PICK:   { label: 'Drive and Dish off Pick',   slug: 'dd-pick',    variations: [] },
        },
      },
      STACK_PLAY: {
        label: 'Stack Play',
        slug: 'stack-play',
        actions: {
          STACK_TOP:    { label: 'Stack Play from Top', slug: 'stack-top',    variations: ['top stack to crease', 'top stack backpipe'] },
          STACK_WING:   { label: 'Stack Play from Wing',slug: 'stack-wing',   variations: ['wing stack to crease', 'wing stack backpipe'] },
        },
      },
      GIVE_AND_GO: {
        label: 'Give-and-Go',
        slug: 'give-and-go',
        actions: {
          GNG_TOP:    { label: 'Give-and-Go from Top', slug: 'gng-top',  variations: ['give and go finish', 'give and go feed'] },
          GNG_WING:   { label: 'Give-and-Go from Wing',slug: 'gng-wing', variations: [] },
        },
      },
      BACKPIPE_THROWBACK_FEED: {
        label: 'Backpipe Throwback Feed',
        slug: 'backpipe-throwback-feed',
        actions: {
          BTF_TWO_MAN_PICK:     { label: 'Backpipe Throwback off Two-Man Pick',  slug: 'btf-pick',    variations: ['pick throwback backpipe finish'] },
          BTF_TO_CREASE:        { label: 'Backpipe Throwback to Crease Finisher',slug: 'btf-crease',  variations: [] },
          BTF_THROWBACK_SHOOTER:{ label: 'Throwback to Backpipe Shooter',        slug: 'btf-shooter', variations: ['throwback backpipe overhand', 'throwback backpipe sidearm'] },
          BTF_FULL_SEQUENCE:    { label: 'Full Throwback > Backpipe > Finish',   slug: 'btf-full',    variations: ['two-man throwback backpipe crease finish'] },
        },
      },
      HIDE_PICK: {
        label: 'Hide Pick',
        slug: 'hide-pick',
        actions: {
          HIDE_PICK_ROLL:   { label: 'Hide Pick to Roll',  slug: 'hide-roll',   variations: [] },
          HIDE_PICK_FADE:   { label: 'Hide Pick to Fade',  slug: 'hide-fade',   variations: [] },
          HIDE_PICK_CREASE: { label: 'Hide Pick Crease Entry', slug: 'hide-crease', variations: [] },
        },
      },
    },
  },

  // ── 5. OFF-BALL MOVEMENT ─────────────────────────────────────────────────────
  OFF_BALL: {
    label: 'Off-Ball Movement',
    slug: 'off-ball',
    subconcepts: {
      BACK_DOOR_CUT: {
        label: 'Back-Door Cut',
        slug: 'backdoor-cut',
        actions: {
          BD_OFF_BALL_MOVEMENT: { label: 'Back-Door off Ball Movement', slug: 'bd-ball-move', variations: [] },
          BD_OFF_SKIP:          { label: 'Back-Door off Skip Pass',     slug: 'bd-skip',      variations: [] },
          BD_FROM_CREASE_OB:    { label: 'Back-Door from Crease',       slug: 'bd-crease-ob', variations: [] },
          BD_FROM_WING_OB:      { label: 'Back-Door from Wing',         slug: 'bd-wing-ob',   variations: [] },
          BD_FINISH_NEAR:       { label: 'Back-Door Finish Near Pipe',  slug: 'bd-near',      variations: [] },
          BD_FINISH_FAR:        { label: 'Back-Door Finish Far Pipe',   slug: 'bd-far',       variations: [] },
        },
      },
      V_CUT: {
        label: 'V-Cut',
        slug: 'v-cut',
        actions: {
          VCUT_TOP:     { label: 'V-Cut to Top',         slug: 'vcut-top',    variations: [] },
          VCUT_WING:    { label: 'V-Cut to Wing',        slug: 'vcut-wing',   variations: [] },
          VCUT_CREASE:  { label: 'V-Cut to Crease',      slug: 'vcut-crease', variations: [] },
          VCUT_BACKDOOR:{ label: 'V-Cut then Back-Door', slug: 'vcut-bd',     variations: [] },
        },
      },
      SEAL_CUT: {
        label: 'Seal Cut',
        slug: 'seal-cut',
        actions: {
          SEAL_CREASE:   { label: 'Seal Cut to Crease',       slug: 'seal-crease',  variations: [] },
          SEAL_FROM_X:   { label: 'Seal Cut for X Feed',      slug: 'seal-x',       variations: ['X to seal cut finish'] },
          SEAL_FINISH_OH:{ label: 'Seal Cut Finish Overhand', slug: 'seal-oh',      variations: [] },
          SEAL_FINISH_SA:{ label: 'Seal Cut Finish Sidearm',  slug: 'seal-sa',      variations: [] },
        },
      },
      SKIP_AND_CUT: {
        label: 'Skip and Cut',
        slug: 'skip-and-cut',
        actions: {
          SAC_BACKDOOR: { label: 'Skip Then Back-Door Cut', slug: 'sac-bd',     variations: [] },
          SAC_CREASE:   { label: 'Skip and Cut to Crease',  slug: 'sac-crease', variations: [] },
          SAC_FINISH:   { label: 'Skip and Cut Finish',     slug: 'sac-finish', variations: [] },
        },
      },
      DOWN_PICK: {
        label: 'Down Pick',
        slug: 'down-pick',
        actions: {
          DP_FOR_DODGER: { label: 'Down Pick for Dodger', slug: 'dp-dodger', variations: [] },
          DP_TO_CREASE:  { label: 'Down Pick to Crease',  slug: 'dp-crease', variations: [] },
          DP_ROLL:       { label: 'Down Pick and Roll',   slug: 'dp-roll',   variations: [] },
          DP_FADE:       { label: 'Down Pick and Fade',   slug: 'dp-fade',   variations: [] },
        },
      },
      STACK: {
        label: 'Stack (Off-Ball)',
        slug: 'stack-ob',
        actions: {
          STACK_CREASE:   { label: 'Stack from Crease', slug: 'stack-crease-ob', variations: [] },
          STACK_WING:     { label: 'Stack from Wing',   slug: 'stack-wing-ob',   variations: [] },
          STACK_SPLIT:    { label: 'Stack Split',       slug: 'stack-split',     variations: ['top split vs backside split'] },
          STACK_SHOOTER:  { label: 'Stack to Open Shooter', slug: 'stack-shooter', variations: [] },
        },
      },
      SPACING: {
        label: 'Spacing / Floor Spacing',
        slug: 'spacing',
        actions: {
          SPACING_WEAK_SIDE:  { label: 'Weak-Side Spacing for Skip',  slug: 'space-weak',    variations: [] },
          SPACING_CREASE:     { label: 'Crease Spacing for Feed',     slug: 'space-crease',  variations: [] },
          SPACING_TOP:        { label: 'Top Spacing (Reset)',         slug: 'space-top',     variations: [] },
          SPACING_BACKPIPE:   { label: 'Backpipe Spacing',           slug: 'space-backpipe',variations: [] },
        },
      },
      CREASE_SLIDE_OB: {
        label: 'Crease Slide (Off-Ball)',
        slug: 'crease-slide-ob',
        actions: {
          CS_RECEIVE:    { label: 'Crease Slide to Receive Feed',  slug: 'cs-receive',   variations: [] },
          CS_FRONTSIDE:  { label: 'Crease Slide Front-Side',       slug: 'cs-front',     variations: [] },
          CS_BACKDOOR:   { label: 'Crease Slide Back-Door',        slug: 'cs-backdoor',  variations: [] },
        },
      },
    },
  },

  // ── 6. DEFENSE ───────────────────────────────────────────────────────────────
  DEFENSE: {
    label: 'Defense',
    slug: 'defense',
    subconcepts: {
      TOPSIDE_DENIAL: {
        label: 'Top-Side Denial',
        slug: 'topside-denial',
        actions: {
          TSD_ON_WING:   { label: 'Top-Side Denial on Wing',   slug: 'tsd-wing',   variations: ['chest to chest denial'] },
          TSD_ON_CREASE: { label: 'Top-Side Denial on Crease', slug: 'tsd-crease', variations: [] },
          TSD_INSIDE_CHECK:{ label: 'Top-Side with Inside Hand Check', slug: 'tsd-check', variations: [] },
        },
      },
      STEP_DOWN_DEFENSE: {
        label: 'Step-Down Defense',
        slug: 'step-down-defense',
        actions: {
          SDD_FORCE_BASELINE: { label: 'Step-Down Force Baseline', slug: 'sdd-baseline', variations: [] },
          SDD_FORCE_MIDDLE:   { label: 'Step-Down Force Middle',   slug: 'sdd-middle',   variations: [] },
          SDD_CREASE_SLIDE:   { label: 'Step-Down Crease Slide',   slug: 'sdd-cs',       variations: [] },
          SDD_RECOVERY:       { label: 'Step-Down Recovery',       slug: 'sdd-recover',  variations: [] },
        },
      },
      FORCE_BASELINE: {
        label: 'Force Baseline',
        slug: 'force-baseline',
        actions: {
          FB_WING_DODGER:  { label: 'Force Baseline on Wing Dodger',    slug: 'fb-wing',  variations: [] },
          FB_X_DRIVER:     { label: 'Force Baseline on X Driver',       slug: 'fb-x',     variations: [] },
          FB_BACKSIDE_HELP:{ label: 'Force Baseline with Backside Help', slug: 'fb-help', variations: [] },
        },
      },
      FORCE_MIDDLE: {
        label: 'Force Middle',
        slug: 'force-middle',
        actions: {
          FM_FROM_WING: { label: 'Force Middle from Wing',        slug: 'fm-wing', variations: [] },
          FM_FROM_X:    { label: 'Force Middle from Behind Net',  slug: 'fm-x',    variations: [] },
          FM_TO_SLIDE:  { label: 'Force Middle to Slide',         slug: 'fm-slide',variations: [] },
        },
      },
      HOT_SLIDE: {
        label: 'Hot Slide',
        slug: 'hot-slide',
        actions: {
          HS_FROM_CREASE:   { label: 'Hot Slide from Crease',        slug: 'hs-crease',  variations: [] },
          HS_FROM_ADJACENT: { label: 'Hot Slide from Adjacent',      slug: 'hs-adjacent',variations: [] },
          HS_TIMING:        { label: 'Hot Slide Timing (Step-Down Trigger)', slug: 'hs-timing', variations: [] },
          HS_AND_RECOVER:   { label: 'Hot Slide and Recover',        slug: 'hs-recover', variations: [] },
        },
      },
      SECOND_SLIDE: {
        label: 'Second Slide',
        slug: 'second-slide',
        actions: {
          SS_CREASE_TO_CREASE: { label: 'Second Slide Crease-to-Crease', slug: 'ss-c2c',    variations: [] },
          SS_FROM_TOP:         { label: 'Second Slide from Top',         slug: 'ss-top',    variations: [] },
          SS_COVERAGE:         { label: 'Second Slide Coverage Assignment',slug: 'ss-cover', variations: [] },
          SS_COMMUNICATION:    { label: 'Second Slide Communication',    slug: 'ss-comm',   variations: [] },
        },
      },
      RECOVER_AND_CHECK: {
        label: 'Recover and Check',
        slug: 'recover-check',
        actions: {
          RAC_POKE:   { label: 'Recover and Poke Check',  slug: 'rac-poke',    variations: [] },
          RAC_LIFT:   { label: 'Recover and Lift Check',  slug: 'rac-lift',    variations: [] },
          RAC_TRAIL:  { label: 'Recover and Trail Check', slug: 'rac-trail',   variations: [] },
          RAC_AFTER_SLIDE:{ label: 'Recover after Slide', slug: 'rac-slide',  variations: [] },
        },
      },
      POKE_CHECK: {
        label: 'Poke Check',
        slug: 'poke-check',
        actions: {
          PC_ON_DODGER:  { label: 'Poke Check on Dodger',  slug: 'pc-dodger',  variations: [] },
          PC_FROM_BEHIND:{ label: 'Poke Check from Behind',slug: 'pc-behind',  variations: [] },
          PC_ON_FEEDER:  { label: 'Poke Check on Feeder',  slug: 'pc-feeder',  variations: [] },
          PC_TIMING:     { label: 'Poke Check Timing',     slug: 'pc-timing',  variations: [] },
        },
      },
      LIFT_CHECK: {
        label: 'Lift Check',
        slug: 'lift-check',
        actions: {
          LC_ON_CATCH:   { label: 'Lift Check on Catch',       slug: 'lc-catch',  variations: [] },
          LC_ON_SHOT:    { label: 'Lift Check on Shot Wind-Up', slug: 'lc-shot',   variations: [] },
          LC_ON_CREASE:  { label: 'Lift Check on Crease Player',slug: 'lc-crease', variations: [] },
        },
      },
      TRAIL_CHECK: {
        label: 'Trail Check',
        slug: 'trail-check',
        actions: {
          TC_FROM_BEHIND: { label: 'Trail Check from Behind',      slug: 'tc-behind', variations: [] },
          TC_ON_ROLL:     { label: 'Trail Check on Roll Dodge',    slug: 'tc-roll',   variations: [] },
          TC_ON_DRIVE:    { label: 'Trail Check on Drive',         slug: 'tc-drive',  variations: [] },
        },
      },
      CREASE_DEFENSE: {
        label: 'Crease Defense',
        slug: 'crease-defense',
        actions: {
          CD_POSITIONING: { label: 'Crease Defense Positioning',      slug: 'cd-pos',   variations: [] },
          CD_SEAL_CUT:    { label: 'Crease Defense on Seal Cut',      slug: 'cd-seal',  variations: [] },
          CD_BACKDOOR:    { label: 'Crease Defense on Back-Door',     slug: 'cd-bd',    variations: [] },
          CD_COMM:        { label: 'Crease Defense Communication',    slug: 'cd-comm',  variations: [] },
          CD_SLIDE:       { label: 'Crease Defense Slide Responsibility', slug: 'cd-slide', variations: [] },
        },
      },
      SLIDE_AND_RECOVER: {
        label: 'Slide and Recover',
        slug: 'slide-recover',
        actions: {
          SAR_SEQUENCE:  { label: 'Slide and Recover Sequence',     slug: 'sar-seq',   variations: [] },
          SAR_ROTATION:  { label: 'Slide Trigger + Recovery Rotation',slug:'sar-rot',  variations: [] },
          SAR_COMM:      { label: 'Slide and Recover Communication', slug: 'sar-comm', variations: [] },
        },
      },
      COMMUNICATION: {
        label: 'Communication (Defense)',
        slug: 'defense-comm',
        actions: {
          COMM_SLIDE:    { label: 'Call Slide',         slug: 'comm-slide',   variations: [] },
          COMM_SWITCH:   { label: 'Call Switch',        slug: 'comm-switch',  variations: [] },
          COMM_HELP:     { label: 'Call Help',          slug: 'comm-help',    variations: [] },
          COMM_MATCHUP:  { label: 'Matchup Communication', slug: 'comm-matchup', variations: [] },
          COMM_RESET:    { label: 'Re-Set Communication',  slug: 'comm-reset',   variations: [] },
        },
      },
      MATCHUP_SWITCH: {
        label: 'Matchup Switch',
        slug: 'matchup-switch',
        actions: {
          MS_PICK_ROLL:   { label: 'Switch on Pick-and-Roll',  slug: 'ms-par',  variations: [] },
          MS_PICK_FADE:   { label: 'Switch on Pick-and-Fade',  slug: 'ms-paf',  variations: [] },
          MS_HIDE_PICK:   { label: 'Switch on Hide Pick',      slug: 'ms-hide', variations: [] },
          MS_MISMATCH:    { label: 'Mismatch Exploitation Defense', slug: 'ms-mm', variations: [] },
        },
      },
    },
  },

  // ── 7. FACEOFF ───────────────────────────────────────────────────────────────
  FACEOFF: {
    label: 'Faceoff',
    slug: 'faceoff',
    subconcepts: {
      CLAMP: {
        label: 'Clamp',
        slug: 'clamp',
        actions: {
          STANDARD_CLAMP: { label: 'Standard Clamp',       slug: 'clamp-standard', variations: ['clamp to possession'] },
          CLAMP_AND_RAKE:  { label: 'Clamp and Rake',      slug: 'clamp-rake',     variations: [] },
          CLAMP_AND_PUSH:  { label: 'Clamp and Push',      slug: 'clamp-push',     variations: [] },
          CLAMP_WING_OUT:  { label: 'Clamp to Wing Outlet',slug: 'clamp-wing-out', variations: [] },
        },
      },
      RAKE: {
        label: 'Rake',
        slug: 'rake',
        actions: {
          RAKE_OWN_STICK: { label: 'Rake to Own Stick', slug: 'rake-own',  variations: [] },
          RAKE_TO_WING:   { label: 'Rake to Wing',      slug: 'rake-wing', variations: [] },
          RAKE_TO_GOALIE: { label: 'Rake to Goalie',    slug: 'rake-goalie',variations: [] },
          RAKE_OFF_CLAMP: { label: 'Rake off Clamp',    slug: 'rake-clamp',variations: [] },
        },
      },
      MOTORCYCLE_GRIP: {
        label: 'Motorcycle Grip',
        slug: 'motorcycle-grip',
        actions: {
          MG_SETUP: { label: 'Motorcycle Grip Setup',        slug: 'mg-setup',  variations: [] },
          MG_CLAMP:  { label: 'Motorcycle Grip Clamp',       slug: 'mg-clamp',  variations: [] },
          MG_PUSH_PULL:{ label: 'Motorcycle Grip Push-Pull', slug: 'mg-pp',     variations: [] },
        },
      },
      PUSH_PULL: {
        label: 'Push-Pull',
        slug: 'push-pull',
        actions: {
          PP_POSSESSION: { label: 'Push-Pull to Possession', slug: 'pp-poss',  variations: [] },
          PP_TO_WING:    { label: 'Push-Pull to Wing',       slug: 'pp-wing',  variations: [] },
          PP_OFF_CLAMP:  { label: 'Push-Pull off Clamp',     slug: 'pp-clamp', variations: [] },
        },
      },
      WRIST_CLAMP: {
        label: 'Wrist Clamp',
        slug: 'wrist-clamp',
        actions: {
          WC_TECHNIQUE:  { label: 'Wrist Clamp Technique',   slug: 'wc-tech',   variations: [] },
          WC_POSSESSION: { label: 'Wrist Clamp to Possession',slug: 'wc-poss',  variations: [] },
          WC_OUTLET:     { label: 'Wrist Clamp Outlet',      slug: 'wc-outlet', variations: [] },
        },
      },
      WING_POSITIONING: {
        label: 'Wing Positioning',
        slug: 'wing-pos',
        actions: {
          WP_CLAMP_OUT:  { label: 'Wing for Clamp Outlet',  slug: 'wp-clamp',  variations: [] },
          WP_RAKE_OUT:   { label: 'Wing for Rake Outlet',   slug: 'wp-rake',   variations: [] },
          WP_CRASH:      { label: 'Wing Crash to Possession',slug: 'wp-crash', variations: [] },
          WP_BOXOUT:     { label: 'Wing Box-Out',           slug: 'wp-boxout', variations: [] },
        },
      },
      FO_OUTLET: {
        label: 'Faceoff Outlet Pass',
        slug: 'fo-outlet',
        actions: {
          FO_OUTLET_WING: { label: 'Outlet to Wing (Fast Break)', slug: 'fo-wing',      variations: [] },
          FO_OUTLET_MID:  { label: 'Outlet to Midfield',         slug: 'fo-mid',        variations: [] },
          FO_OUTLET_CLEAR:{ label: 'Outlet to Clear',            slug: 'fo-clear',      variations: [] },
          FO_FAST_BREAK:  { label: 'Faceoff Outlet Fast Break',  slug: 'fo-fastbreak',  variations: [] },
        },
      },
      FACEOFF_TO_CLEAR: {
        label: 'Faceoff to Clear',
        slug: 'fo-clear',
        actions: {
          FTC_WIN_CLEAR:    { label: 'Faceoff Win to Clear',            slug: 'ftc-win',    variations: [] },
          FTC_RAKE_GOALIE:  { label: 'Faceoff Rake to Goalie Clear',   slug: 'ftc-goalie', variations: [] },
          FTC_TURNOVER_PREV:{ label: 'Faceoff Turnover Prevention',    slug: 'ftc-prevent',variations: [] },
        },
      },
    },
  },

  // ── 8. CLEAR / RIDE ──────────────────────────────────────────────────────────
  CLEAR_RIDE: {
    label: 'Clear / Ride',
    slug: 'clear-ride',
    subconcepts: {
      ZONE_CLEAR: {
        label: 'Zone Clear',
        slug: 'zone-clear',
        actions: {
          ZC_ALIGNMENT:   { label: 'Zone Clear Alignment',   slug: 'zc-align',  variations: [] },
          ZC_OUTLET:      { label: 'Zone Clear Outlet',      slug: 'zc-outlet', variations: [] },
          ZC_PROGRESSION: { label: 'Zone Clear Progression', slug: 'zc-prog',   variations: ['1st option', '2nd option', '3rd option'] },
          ZC_MID_BURST:   { label: 'Zone Clear Midfield Burst', slug: 'zc-burst',variations: [] },
        },
      },
      MAN_CLEAR: {
        label: 'Man Clear',
        slug: 'man-clear',
        actions: {
          MC_ONE_ON_ONE: { label: 'Man Clear 1v1',           slug: 'mc-1v1',     variations: [] },
          MC_OUTLET:     { label: 'Man Clear Outlet',        slug: 'mc-outlet',  variations: [] },
          MC_PRESSURE:   { label: 'Man Clear Under Pressure',slug: 'mc-pressure',variations: [] },
        },
      },
      GOALIE_OUTLET: {
        label: 'Goalie Outlet (Clear)',
        slug: 'goalie-outlet-clear',
        actions: {
          GO_TO_WING:     { label: 'Goalie Outlet to Wing',        slug: 'go-wing',    variations: [] },
          GO_TO_TOP:      { label: 'Goalie Outlet to Top',         slug: 'go-top',     variations: [] },
          GO_PRESSURE:    { label: 'Goalie Outlet Under Pressure', slug: 'go-pressure',variations: [] },
          GO_FAST_BREAK:  { label: 'Goalie Outlet to Fast Break',  slug: 'go-fb',      variations: [] },
        },
      },
      DRIVE_AND_DUMP: {
        label: 'Drive-and-Dump',
        slug: 'drive-dump',
        actions: {
          DD_FROM_BEHIND:{ label: 'Drive-and-Dump from Behind Net', slug: 'dd-behind', variations: [] },
          DD_TO_OUTLET:  { label: 'Drive-and-Dump to Outlet',      slug: 'dd-outlet', variations: [] },
          DD_TO_CLEAR:   { label: 'Drive-and-Dump to Clear',       slug: 'dd-clear',  variations: [] },
        },
      },
      FAST_BREAK_CLEAR: {
        label: 'Fast Break (Clear to Transition)',
        slug: 'clear-fastbreak',
        actions: {
          CFB_3V2:   { label: 'Clear to Fast Break 3v2',    slug: 'cfb-3v2',  variations: [] },
          CFB_4V3:   { label: 'Clear to Fast Break 4v3',    slug: 'cfb-4v3',  variations: [] },
          CFB_EARLY: { label: 'Clear to Early Offense',     slug: 'cfb-early',variations: [] },
        },
      },
      NUMBERS_ADVANTAGE: {
        label: 'Numbers Advantage (Clear)',
        slug: 'numbers-clear',
        actions: {
          NA_3V2: { label: '3v2 in Clear', slug: 'na-3v2', variations: [] },
          NA_4V3: { label: '4v3 in Clear', slug: 'na-4v3', variations: [] },
          NA_5V4: { label: '5v4 in Clear', slug: 'na-5v4', variations: [] },
          NA_FINISH:{ label: 'Numbers to Finish', slug: 'na-finish', variations: [] },
        },
      },
      SETTLED_RIDE: {
        label: 'Settled Ride',
        slug: 'settled-ride',
        actions: {
          SR_SETUP:    { label: 'Settled Ride Setup',          slug: 'sr-setup',   variations: [] },
          SR_PRESS:    { label: 'Settled Ride Press Midfield', slug: 'sr-press',   variations: [] },
          SR_TRAP:     { label: 'Settled Ride Trap',           slug: 'sr-trap',    variations: [] },
          SR_TURNOVER: { label: 'Settled Ride Force Turnover', slug: 'sr-turnover',variations: [] },
        },
      },
      ZONE_RIDE: {
        label: 'Zone Ride',
        slug: 'zone-ride',
        actions: {
          ZR_ALIGNMENT: { label: 'Zone Ride Alignment', slug: 'zr-align', variations: [] },
          ZR_PRESS:     { label: 'Zone Ride Press',     slug: 'zr-press', variations: [] },
          ZR_SIDELINE:  { label: 'Zone Ride Force Sideline', slug: 'zr-side', variations: [] },
        },
      },
      MAN_RIDE: {
        label: 'Man Ride',
        slug: 'man-ride',
        actions: {
          MR_BALL_PRESSURE: { label: 'Man Ride (Ball Pressure)',  slug: 'mr-ball',   variations: [] },
          MR_OFF_FACEOFF:   { label: 'Man Ride off Faceoff',     slug: 'mr-fo',     variations: [] },
          MR_MID_TRAP:      { label: 'Man Ride Midfield Trap',   slug: 'mr-trap',   variations: [] },
        },
      },
      MIDFIELD_TRAP: {
        label: 'Midfield Trap',
        slug: 'midfield-trap',
        actions: {
          MT_ON_CLEAR:   { label: 'Midfield Trap on Clear',    slug: 'mt-clear', variations: [] },
          MT_ZONE_RIDE:  { label: 'Midfield Trap in Zone Ride',slug: 'mt-zone',  variations: [] },
          MT_POSSESSION: { label: 'Midfield Trap to Possession',slug:'mt-poss',  variations: [] },
        },
      },
    },
  },

  // ── 9. TRANSITION ────────────────────────────────────────────────────────────
  TRANSITION: {
    label: 'Transition',
    slug: 'transition',
    subconcepts: {
      FAST_BREAK_FINISH: {
        label: 'Fast Break Finish',
        slug: 'fast-break',
        actions: {
          FB_2V1:    { label: '2v1 Fast Break Finish', slug: 'fb-2v1',    variations: ['2v1 drive and dish', '2v1 isolation'] },
          FB_3V2:    { label: '3v2 Fast Break Finish', slug: 'fb-3v2',    variations: ['3v2 to crease', '3v2 skip to shooter'] },
          FB_4V3:    { label: '4v3 Fast Break Finish', slug: 'fb-4v3',    variations: ['4v3 backpipe', '4v3 crease feed'] },
          FB_SETTLE: { label: 'Fast Break to Settled', slug: 'fb-settle', variations: [] },
        },
      },
      FOUR_V_THREE: {
        label: '4v3 Transition',
        slug: '4v3',
        actions: {
          FVT_BALL_MOVE: { label: '4v3 Ball Movement',    slug: '4v3-ball',    variations: [] },
          FVT_QUICK:     { label: '4v3 Quick Shot',        slug: '4v3-quick',   variations: [] },
          FVT_CREASE:    { label: '4v3 to Crease Feed',   slug: '4v3-crease',  variations: [] },
          FVT_BACKPIPE:  { label: '4v3 Backpipe Finish',  slug: '4v3-backpipe',variations: [] },
        },
      },
      THREE_V_TWO: {
        label: '3v2 Transition',
        slug: '3v2',
        actions: {
          TVT_MIDDLE:  { label: '3v2 Drive Middle',     slug: '3v2-middle',  variations: [] },
          TVT_SKIP:    { label: '3v2 Skip to Shooter',  slug: '3v2-skip',    variations: [] },
          TVT_CREASE:  { label: '3v2 to Crease Finish', slug: '3v2-crease',  variations: [] },
          TVT_TRAIL:   { label: '3v2 Trail Man Finish',  slug: '3v2-trail',  variations: [] },
        },
      },
      TWO_V_ONE: {
        label: '2v1 Transition',
        slug: '2v1',
        actions: {
          TVO_DRIVE:    { label: '2v1 Drive and Dish', slug: '2v1-dd',    variations: [] },
          TVO_CREASE:   { label: '2v1 to Crease',     slug: '2v1-crease',variations: [] },
          TVO_ISO:      { label: '2v1 Isolation',     slug: '2v1-iso',   variations: [] },
        },
      },
      TRAIL_MAN: {
        label: 'Trail Man',
        slug: 'trail-man',
        actions: {
          TM_SHOT:    { label: 'Trail Man Shot',                slug: 'tm-shot',   variations: ['trail man high to low', 'trail man overhand'] },
          TM_FEED:    { label: 'Trail Man Feed',                slug: 'tm-feed',   variations: [] },
          TM_SETTLE:  { label: 'Trail Man off Fast Break Settle',slug: 'tm-settle',variations: [] },
        },
      },
      PUSHING_PACE: {
        label: 'Pushing Pace',
        slug: 'pushing-pace',
        actions: {
          PP_OFF_FO:       { label: 'Pushing Pace off Faceoff',  slug: 'pp-fo',    variations: [] },
          PP_OFF_CLEAR:    { label: 'Pushing Pace off Clear',    slug: 'pp-clear', variations: [] },
          PP_OFF_TURNOVER: { label: 'Pushing Pace off Turnover', slug: 'pp-to',    variations: [] },
          PP_EARLY_ATTACK: { label: 'Pushing Pace to Early Attack', slug: 'pp-early', variations: [] },
        },
      },
      EARLY_OFFENSE: {
        label: 'Early Offense',
        slug: 'early-offense',
        actions: {
          EO_OFF_CLEAR:  { label: 'Early Offense off Clear',  slug: 'eo-clear',  variations: [] },
          EO_1V1_PACE:   { label: 'Early Offense 1v1 off Pace', slug: 'eo-1v1', variations: [] },
          EO_SET_PLAY:   { label: 'Early Offense to Set Play', slug: 'eo-set',   variations: [] },
        },
      },
    },
  },

  // ── 10. SPECIAL TEAMS ────────────────────────────────────────────────────────
  SPECIAL_TEAMS: {
    label: 'Special Teams',
    slug: 'special-teams',
    subconcepts: {
      EMO_ROTATION: {
        label: 'EMO — Rotation',
        slug: 'emo-rotation',
        actions: {
          EMO_ROT_TOP:     { label: '6v5 Rotation (Top)',     slug: 'emo-rot-top',     variations: ['rotation skip pass', 'rotation drive and dish'] },
          EMO_ROT_CREASE:  { label: '6v5 Rotation (Crease)', slug: 'emo-rot-crease',  variations: [] },
          EMO_ROT_BACKPIPE:{ label: '6v5 Rotation (Backpipe)',slug: 'emo-rot-backpipe',variations: [] },
        },
      },
      EMO_SKIP: {
        label: 'EMO — Skip Pass',
        slug: 'emo-skip',
        actions: {
          EMO_SKIP_PASS:     { label: 'EMO Skip Pass',              slug: 'emo-skip-pass',    variations: [] },
          EMO_SKIP_CREASE:   { label: 'EMO Skip to Crease',        slug: 'emo-skip-crease',  variations: [] },
          EMO_SKIP_BACKPIPE: { label: 'EMO Skip to Backpipe Shooter', slug: 'emo-skip-bp',   variations: [] },
          EMO_SKIP_TOP:      { label: 'EMO Skip to Shooter (Top)', slug: 'emo-skip-top',     variations: [] },
        },
      },
      EMO_CRASH: {
        label: 'EMO — Crash',
        slug: 'emo-crash',
        actions: {
          EMO_CREASE_CRASH:  { label: 'Crease Crash off Skip',     slug: 'emo-cc-skip',    variations: ['crease crash finish overhand', 'crease crash finish underhand'] },
          EMO_CREASE_ROT:    { label: 'Crease Crash off Rotation', slug: 'emo-cc-rot',     variations: [] },
          EMO_BACKPIPE_CRASH:{ label: 'Backpipe Crash',            slug: 'emo-bp-crash',   variations: [] },
        },
      },
      MAN_DOWN_ZONE: {
        label: 'Man-Down Defense — Zone',
        slug: 'md-zone',
        actions: {
          MDZ_ALIGNMENT:  { label: '5v6 Zone Alignment',        slug: 'mdz-align',    variations: [] },
          MDZ_COVERAGE:   { label: 'Zone Slide Coverage',       slug: 'mdz-coverage', variations: [] },
          MDZ_SIDELINE:   { label: 'Zone Force Sideline',       slug: 'mdz-side',     variations: [] },
          MDZ_BACKPIPE:   { label: 'Zone Prevent Backpipe',     slug: 'mdz-backpipe', variations: [] },
        },
      },
      MAN_DOWN_MATCH: {
        label: 'Man-Down Defense — Match',
        slug: 'md-match',
        actions: {
          MDM_MATCHUP:    { label: 'Match-Up Man-Down',              slug: 'mdm-matchup', variations: [] },
          MDM_TRIGGERS:   { label: 'Match-Up Slide Triggers',       slug: 'mdm-triggers',variations: [] },
          MDM_COMM:       { label: 'Match-Up Communication',        slug: 'mdm-comm',    variations: [] },
        },
      },
      MAN_DOWN_SLIDE: {
        label: 'Man-Down Defense — Slide',
        slug: 'md-slide',
        actions: {
          MDS_CREASE:   { label: 'Slide from Crease (Man-Down)',  slug: 'mds-crease',  variations: [] },
          MDS_ROTATION: { label: 'Slide Rotation (Man-Down)',     slug: 'mds-rot',     variations: [] },
          MDS_RECOVER:  { label: 'Slide and Recover (Man-Down)',  slug: 'mds-recover', variations: [] },
        },
      },
    },
  },

  // ── 11. X — BEHIND THE NET ───────────────────────────────────────────────────
  X_BEHIND_NET: {
    label: 'X — Behind the Net',
    slug: 'x-behind-net',
    subconcepts: {
      DRIVE_FROM_X: {
        label: 'Drive from X',
        slug: 'drive-from-x',
        actions: {
          DFX_TOPSIDE:  { label: 'Drive from X Top-Side',      slug: 'dfx-top',  variations: [] },
          DFX_BASELINE: { label: 'Drive from X Baseline (Wrap)',slug: 'dfx-wrap', variations: [] },
          DFX_TO_SHOT:  { label: 'Drive from X to Shot',       slug: 'dfx-shot', variations: [] },
          DFX_TO_FEED:  { label: 'Drive from X to Feed',       slug: 'dfx-feed', variations: [] },
        },
      },
      FEED_FROM_X: {
        label: 'Feed from X',
        slug: 'feed-from-x',
        actions: {
          FFX_CREASE:    { label: 'X Feed to Crease (Seal Cut)', slug: 'ffx-crease',   variations: [] },
          FFX_BACKPIPE:  { label: 'X Feed Backpipe',             slug: 'ffx-backpipe', variations: [] },
          FFX_WING:      { label: 'X Feed to Wing Cutter',       slug: 'ffx-wing',     variations: [] },
          FFX_BACKDOOR:  { label: 'X Feed Back-Door',            slug: 'ffx-bd',       variations: [] },
          FFX_SCREEN:    { label: 'X Feed off Screen',           slug: 'ffx-screen',   variations: [] },
          FFX_HIP:       { label: 'X Hip Feed',                  slug: 'ffx-hip',      variations: [] },
          FFX_BTB:       { label: 'X BTB Feed',                  slug: 'ffx-btb',      variations: [] },
        },
      },
      SCREEN_AT_X: {
        label: 'Screen at X',
        slug: 'screen-x',
        actions: {
          SAX_FOR_CUTTER:  { label: 'Screen at X for Cutter',  slug: 'sax-cutter', variations: [] },
          SAX_FOR_FEEDER:  { label: 'Screen at X for Feeder',  slug: 'sax-feeder', variations: [] },
          SAX_CREASE:      { label: 'Screen at X Crease Entry',slug: 'sax-crease', variations: [] },
        },
      },
      DOUBLE_TEAM_X: {
        label: 'Double-Team at X',
        slug: 'double-team-x',
        actions: {
          DTX_BASELINE: { label: 'Double-Team Force Baseline', slug: 'dtx-base',  variations: [] },
          DTX_TOP:      { label: 'Double-Team Force Top',      slug: 'dtx-top',   variations: [] },
          DTX_STRIP:    { label: 'Double-Team Possession Strip',slug: 'dtx-strip', variations: [] },
          DTX_COMM:     { label: 'Double-Team Communication',  slug: 'dtx-comm',  variations: [] },
        },
      },
      GOALIE_BEHIND: {
        label: 'Goalie Behind the Net',
        slug: 'goalie-behind',
        actions: {
          GB_HANDLING:   { label: 'Goalie Ball-Handling at X',  slug: 'gb-handle',  variations: [] },
          GB_DRIVE:      { label: 'Goalie Drive from X',        slug: 'gb-drive',   variations: [] },
          GB_FEED:       { label: 'Goalie Feed from X',         slug: 'gb-feed',    variations: [] },
          GB_PRESSURE:   { label: 'Goalie Under Pressure at X', slug: 'gb-pressure',variations: [] },
          GB_OUTLET:     { label: 'Goalie Outlet from X',       slug: 'gb-outlet',  variations: [] },
        },
      },
      POSSESSION_AT_X: {
        label: 'Possession at X',
        slug: 'possession-x',
        actions: {
          PAX_HOLD:     { label: 'Hold at X (Draw Defense)',   slug: 'pax-hold',  variations: [] },
          PAX_TIME:     { label: 'Time-and-Room at X',         slug: 'pax-time',  variations: [] },
          PAX_RESET:    { label: 'Possession at X Reset',      slug: 'pax-reset', variations: [] },
        },
      },
    },
  },

  // ── 12. GOALIE ───────────────────────────────────────────────────────────────
  GOALIE: {
    label: 'Goalie',
    slug: 'goalie',
    subconcepts: {
      SAVE_TECHNIQUE: {
        label: 'Save Technique',
        slug: 'save-technique',
        actions: {
          SAVE_OVERHAND:  { label: 'Overhand Save (Top Corners)', slug: 'save-oh',      variations: ['save top-left', 'save top-right'] },
          SAVE_UNDERHAND: { label: 'Underhand Save (Low Corners)',slug: 'save-uh',      variations: ['save low-left', 'save low-right'] },
          SAVE_NEAR_PIPE: { label: 'Stick Save Near Pipe',        slug: 'save-near',    variations: [] },
          SAVE_FAR_PIPE:  { label: 'Stick Save Far Pipe',         slug: 'save-far',     variations: [] },
          SAVE_BODY:      { label: 'Body Save',                   slug: 'save-body',    variations: [] },
          SAVE_BOUNCE:    { label: 'Reaction Save (Bounce Shot)', slug: 'save-bounce',  variations: [] },
          SAVE_QS:        { label: 'Reaction Save (Quick-Stick)', slug: 'save-qs',      variations: [] },
          SAVE_PADDLE:    { label: 'Paddle Save (Low)',           slug: 'save-paddle',  variations: [] },
        },
      },
      GOALIE_OUTLET: {
        label: 'Goalie Outlet Pass',
        slug: 'goalie-outlet',
        actions: {
          GO_WING_FAST:  { label: 'Outlet to Wing (Fast)',    slug: 'go-wing-fast',  variations: [] },
          GO_PRESSURE:   { label: 'Outlet Under Pressure',   slug: 'go-under-pres', variations: [] },
          GO_FAST_BREAK: { label: 'Outlet to Fast Break',    slug: 'go-fb-start',   variations: [] },
          GO_BTB:        { label: 'Outlet BTB (Emergency)',  slug: 'go-btb',        variations: [] },
        },
      },
      GOALIE_POSITIONING: {
        label: 'Goalie Positioning',
        slug: 'goalie-pos',
        actions: {
          GP_ARC:       { label: 'Angle Positioning (Arc)',     slug: 'gp-arc',      variations: [] },
          GP_SKIP:      { label: 'Positioning on Skip Pass',   slug: 'gp-skip',     variations: [] },
          GP_CREASE_FEED:{ label: 'Positioning on Crease Feed',slug: 'gp-crease',   variations: [] },
          GP_X_FEED:    { label: 'Positioning on X Feed',      slug: 'gp-x',        variations: [] },
          GP_BACKPIPE:  { label: 'Back-Post Positioning (Backpipe)', slug: 'gp-bp', variations: [] },
        },
      },
      GOALIE_COMM: {
        label: 'Goalie Communication',
        slug: 'goalie-comm',
        actions: {
          GC_SLIDE: { label: 'Goalie Slide Call',  slug: 'gc-slide', variations: [] },
          GC_HELP:  { label: 'Goalie Help Call',   slug: 'gc-help',  variations: [] },
          GC_MAN:   { label: 'Goalie Man-On Call', slug: 'gc-man',   variations: [] },
          GC_CLEAR: { label: 'Goalie Clear Call',  slug: 'gc-clear', variations: [] },
          GC_RIDE:  { label: 'Goalie Riding Call', slug: 'gc-ride',  variations: [] },
        },
      },
      GOALIE_CLEARING: {
        label: 'Goalie Clearing',
        slug: 'goalie-clear',
        actions: {
          GCL_OUTLET:    { label: 'Goalie Clear Outlet (Wing)',     slug: 'gcl-wing',    variations: [] },
          GCL_PRESSURE:  { label: 'Goalie Clear Under Pressure',   slug: 'gcl-pressure',variations: [] },
          GCL_DRIVE_DUMP:{ label: 'Goalie Drive-and-Dump',         slug: 'gcl-dd',      variations: [] },
          GCL_FAST_BREAK:{ label: 'Goalie Outlet to Fast Break',   slug: 'gcl-fb',      variations: [] },
        },
      },
    },
  },

}; // end TAXONOMY


// ─────────────────────────────────────────────────────────────────────────────
// SEARCH SYNONYMS
// Key: canonical term (lowercase, no punctuation)
// Value: array of synonyms / alternate phrasings to also search
// ─────────────────────────────────────────────────────────────────────────────

const SEARCH_SYNONYMS = {
  // Backpipe aliases
  'backpipe':              ['back pipe', 'back-pipe', 'behind net feed', 'pipe feed', 'behind the net feed', 'backpipe feed'],
  'back pipe':             ['backpipe', 'back-pipe', 'behind net feed', 'pipe feed'],
  'behind net':            ['backpipe', 'behind the net', 'X feed', 'from X', 'feed from X'],
  'pipe feed':             ['backpipe feed', 'back pipe feed', 'behind net feed'],

  // Two-man game aliases
  'two man':               ['two-man game', 'pick and roll', 'give and go', 'throwback', 'pick and fade', 'drive and dish', 'stack play', 'hide pick'],
  'two-man':               ['two man game', 'pick and roll', 'give and go', 'throwback', 'pick and fade'],
  'two man game':          ['two-man game', 'pick and roll', 'give and go', 'throwback', 'pick and fade', 'back door cut'],
  'pick roll':             ['pick and roll', 'par', 'screen and roll', 'down pick roll'],
  'pick and roll':         ['screen and roll', 'down pick', 'pick roll', 'pick fade'],
  'pick fade':             ['pick and fade', 'fade cut'],
  'give go':               ['give and go', 'give-and-go'],
  'throwback':             ['throw back', 'throw-back', 'throwback pass', 'backpipe throwback'],

  // Dodge aliases
  'split':                 ['split dodge', 'inside hand finish', 'outside hand finish', 'step down split'],
  'split dodge':           ['split', 'inside hand', 'outside hand', 'topside split', 'step-down split'],
  'roll':                  ['roll dodge', 'roll to near pipe', 'roll to far pipe', 'reverse roll'],
  'roll dodge':            ['roll', 'inside roll', 'reverse roll'],
  'inside roll':           ['inside roll dodge', 'roll inside'],
  'face dodge':            ['face-dodge', 'face deke'],
  'rocker':                ['rocker dodge', 'rocker step'],
  'question mark':         ['question-mark dodge', 'qm dodge'],
  'bull dodge':            ['bull-dodge', 'power through'],

  // Finishing aliases
  'near pipe':             ['near-pipe', 'near post', 'pipe finish', 'near side finish'],
  'far pipe':              ['far-pipe', 'far post', 'backside finish', 'away pipe'],
  'bounce shot':           ['bounce', 'ball bounce', 'skip shot'],
  'btb':                   ['behind the back', 'behind-the-back', 'btb shot', 'btb feed'],
  'behind the back':       ['btb', 'behind-the-back', 'behind back'],
  'low to high':           ['low-to-high', 'l2h', 'low high shot', 'rising shot'],
  'high to low':           ['high-to-low', 'h2l', 'snap down', 'snap shot'],
  'overhand':              ['overhand shot', 'overhand finish', 'top hand'],
  'sidearm':               ['side arm', 'sidearm shot', 'sidearm finish'],
  'underhand':             ['under hand', 'underhand finish', 'shovel shot'],
  'crease finish':         ['crease shot', 'in close finish', 'goal mouth finish'],
  'off hip':               ['off-hip', 'hip shot', 'hip finish'],
  'quick stick':           ['quick-stick', 'qs', 'catch and release'],

  // Feeding aliases
  'crease feed':           ['crease pass', 'feed to crease', 'center feed'],
  'alley feed':            ['alley pass', 'alley feed drive', 'alley dish'],
  'skip pass':             ['skip', 'skip feed', 'skip ball', 'wing to wing'],
  'hip feed':              ['hip pass', 'hip dish'],

  // Defense aliases
  'hot slide':             ['hot-slide', 'immediate slide', 'first slide'],
  'second slide':          ['second-slide', '2nd slide', 'help slide'],
  'topside':               ['top-side', 'top side', 'top side denial'],
  'force baseline':        ['force baseline', 'push baseline', 'take baseline'],
  'force middle':          ['force middle', 'push middle', 'take middle'],
  'poke check':            ['poke', 'poke-check', 'stick check poke'],
  'lift check':            ['lift', 'lift-check', 'stick check lift'],
  'trail check':           ['trail', 'trail-check', 'check from behind'],
  'slide recover':         ['slide and recover', 'slide recovery', 'get back'],

  // Faceoff aliases
  'faceoff':               ['face off', 'face-off', 'FO', 'ground ball', 'clamp', 'rake'],
  'clamp':                 ['faceoff clamp', 'clamp faceoff'],
  'motorcycle':            ['motorcycle grip', 'moto grip', 'bike grip'],

  // Transition aliases
  'fast break':            ['fastbreak', 'fast-break', '2v1', '3v2', '4v3', 'numbers up', 'transition'],
  '2v1':                   ['two on one', '2 on 1', 'two v one'],
  '3v2':                   ['three on two', '3 on 2', 'three v two'],
  '4v3':                   ['four on three', '4 on 3', 'four v three'],
  'trail man':             ['trailer', 'trail player', 'trail attacker'],
  'pushing pace':          ['push pace', 'run', 'go to goal', 'early attack'],
  'early offense':         ['early o', 'fast attack', 'quick offense'],

  // Special teams aliases
  'emo':                   ['extra man', 'extra man offense', '6v5', 'man up', 'power play'],
  'man up':                ['extra man', 'emo', '6v5', 'power play'],
  'man down':              ['short handed', 'shorthanded', '5v6', 'penalty kill'],
  'power play':            ['emo', 'extra man', 'man up', '6v5'],

  // X / behind net aliases
  'x':                     ['behind the net', 'behind net', 'from X', 'at X', 'X position'],
  'from x':                ['from behind the net', 'X feed', 'X drive', 'behind net'],
  'behind the net':        ['X', 'from X', 'at X', 'x position', 'goalie behind'],
  'x dodge':               ['dodge from X', 'behind net dodge'],
  'screen at x':           ['X screen', 'pick at X', 'set screen X'],

  // Goalie aliases
  'goalie':                ['goalkeeper', 'goaltender', 'GK', 'keeper'],
  'outlet':                ['outlet pass', 'goalie outlet', 'clear outlet'],
  'save':                  ['save technique', 'stop', 'make save'],
  'clear':                 ['zone clear', 'man clear', 'goalie clear', 'clearing'],
  'ride':                  ['zone ride', 'man ride', 'settled ride', 'riding'],

  // General combo searches
  'dodge and feed':        ['split and feed', 'roll and feed', 'dodge feed'],
  'drive and dish':        ['drive dish', 'drive and pass', 'pass off drive'],
  'back door':             ['back-door', 'backdoor', 'backdoor cut', 'back door cut'],
  'seal cut':              ['seal-cut', 'seal screen', 'seal and receive'],
  'v cut':                 ['v-cut', 'v cut move'],
  'down pick':             ['down-pick', 'downpick', 'pick down'],
  'spacing':               ['floor spacing', 'spread', 'wide spacing'],
  'communication':         ['comm', 'talking', 'calling slide'],
};


// ─────────────────────────────────────────────────────────────────────────────
// CONCEPT COLORS
// One distinct color per top-level category for UI badges, tags, filter chips
// ─────────────────────────────────────────────────────────────────────────────

const CONCEPT_COLORS = {
  DODGING:       { primary: '#3B82F6', light: '#DBEAFE', label: 'Blue',       text: '#1E40AF' },  // blue
  FEEDING:       { primary: '#8B5CF6', light: '#EDE9FE', label: 'Purple',     text: '#5B21B6' },  // purple
  FINISHING:     { primary: '#EF4444', light: '#FEE2E2', label: 'Red',        text: '#991B1B' },  // red
  TWO_MAN_GAME:  { primary: '#EC4899', light: '#FCE7F3', label: 'Pink',       text: '#9D174D' },  // pink
  OFF_BALL:      { primary: '#06B6D4', light: '#CFFAFE', label: 'Cyan',       text: '#164E63' },  // cyan
  DEFENSE:       { primary: '#F97316', light: '#FFEDD5', label: 'Orange',     text: '#9A3412' },  // orange
  FACEOFF:       { primary: '#EAB308', light: '#FEF9C3', label: 'Yellow',     text: '#713F12' },  // yellow
  CLEAR_RIDE:    { primary: '#84CC16', light: '#F7FEE7', label: 'Lime',       text: '#3F6212' },  // lime
  TRANSITION:    { primary: '#10B981', light: '#D1FAE5', label: 'Green',      text: '#064E3B' },  // green
  SPECIAL_TEAMS: { primary: '#F43F5E', light: '#FFE4E6', label: 'Rose',       text: '#881337' },  // rose
  X_BEHIND_NET:  { primary: '#6366F1', light: '#E0E7FF', label: 'Indigo',     text: '#312E81' },  // indigo
  GOALIE:        { primary: '#14B8A6', light: '#CCFBF1', label: 'Teal',       text: '#134E4A' },  // teal
};


// ─────────────────────────────────────────────────────────────────────────────
// DIFFICULTY CRITERIA
// ─────────────────────────────────────────────────────────────────────────────

const DIFFICULTY_CRITERIA = {
  BEGINNER: {
    label: 'Beginner',
    slug: 'beginner',
    color: '#22C55E',
    description: 'Single-concept, controlled environment, no live defensive pressure.',
    criteria: [
      'One concept shown at a time (dodge only, feed only, or finish only)',
      'Slow to moderate tempo',
      'Stationary or slow-moving ball before action',
      'Drill or walk-through setting (no full-speed defender)',
      'Standard dodge mechanics without deceptive setup',
      'Basic feed from set position (no dodge required)',
      'Basic save technique against static shot',
      'Faceoff clamp or rake without opponent counter-move',
      'Clear with no ride pressure',
    ],
    examples: [
      'Catch and shoot overhand from top',
      'Roll dodge to near pipe in drill',
      'Crease feed from set top position',
      'Clamp faceoff to wing outlet (no counter)',
    ],
  },

  INTERMEDIATE: {
    label: 'Intermediate',
    slug: 'intermediate',
    color: '#3B82F6',
    description: 'Two-concept sequences, moderate pressure, reads required.',
    criteria: [
      'Two-concept sequence (dodge + feed, pick + roll, feed + finish)',
      'Moderate defensive pressure present',
      'Ball movement with 1-2 passes before action',
      'Two-man game actions (pick and roll, give and go)',
      'Transition reads (2v1 or 3v2)',
      'EMO rotation with one or two passes',
      'Faceoff with wing outlet and transition',
      'Clear against settled ride',
      'Man-down slide rotation with communication',
    ],
    examples: [
      'Split dodge to backpipe feed',
      'Pick and roll, roller crease finish',
      '3v2 fast break to skip to shooter',
      'EMO rotation skip to crease crash',
    ],
  },

  ADVANCED: {
    label: 'Advanced',
    slug: 'advanced',
    color: '#F97316',
    description: 'Three-concept chain, live defensive pressure, multiple reads.',
    criteria: [
      'Three or more concepts chained (dodge + feed + off-ball cut + finish)',
      'High defensive pressure, contested',
      'Fast break reads with trail man',
      'Two-man game with backpipe throwback feed and finish',
      'EMO crash from backpipe off rotation',
      'Man-down slide rotation against fast EMO',
      'X play with back-door cutter and finish',
      'Goalie drive-from-X in game-like pressure',
      'Faceoff to immediate fast break finish',
      'Full settled ride disruption to force turnover',
    ],
    examples: [
      'Pick and roll, throwback, backpipe feed, crease finish',
      'Split dodge, dish to X, X feed seal cut near pipe',
      'EMO rotation, skip, backpipe crash finish',
      '4v3 fast break trail man high-to-low shot',
    ],
  },

  ELITE: {
    label: 'Elite',
    slug: 'elite',
    color: '#8B5CF6',
    description: 'Full multi-concept sequences under maximum game-speed pressure.',
    criteria: [
      'Full multi-concept sequences under game-speed, live defense',
      'Throwback + backpipe feed + crease finish under full pressure',
      'Man-down stop on backpipe EMO with communication and slide',
      'Faceoff win to immediate fast break 2v1 finish',
      'Goalie drive-from-X under double-team pressure',
      'Complete EMO rotation with skip, back-door cut, and finish',
      'Dodge chain: face dodge, rocker, then question mark to backpipe',
      'X possession under double-team, feed back-door, finish far pipe',
      'Full transition sequence: clear → pushing pace → early offense → finish',
      'Man-down stop + clear + fast break to score',
    ],
    examples: [
      'Faceoff clamp → wing outlet → 4v3 → backpipe throwback → crease finish',
      'Man-down zone stop backpipe EMO → clear → 3v2 finish',
      'X double-team, possession, feed back-door cut far pipe',
      'Goalie outlet under pressure → full-field fast break → trail man finish',
    ],
  },
};


// ─────────────────────────────────────────────────────────────────────────────
// FLAT CONCEPT INDEX
// Auto-generated flat list of all concept slugs for quick lookup
// ─────────────────────────────────────────────────────────────────────────────

function buildConceptIndex(taxonomy) {
  const index = [];
  for (const [catKey, category] of Object.entries(taxonomy)) {
    for (const [subKey, sub] of Object.entries(category.subconcepts || {})) {
      for (const [actionKey, action] of Object.entries(sub.actions || {})) {
        index.push({
          categoryKey: catKey,
          categoryLabel: category.label,
          categorySlug: category.slug,
          subKey,
          subLabel: sub.label,
          subSlug: sub.slug,
          actionKey,
          actionLabel: action.label,
          actionSlug: action.slug,
          variations: action.variations || [],
          // full search text
          searchText: [
            category.label,
            sub.label,
            action.label,
            ...(action.variations || []),
          ].join(' ').toLowerCase(),
        });
      }
    }
  }
  return index;
}

const CONCEPT_INDEX = buildConceptIndex(TAXONOMY);


// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

// CommonJS (Node / bundlers)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TAXONOMY,
    SEARCH_SYNONYMS,
    CONCEPT_COLORS,
    DIFFICULTY_CRITERIA,
    CONCEPT_INDEX,
    buildConceptIndex,
  };
}

// ES Module (modern bundlers / browser native modules)
// Uncomment if using ESM:
// export { TAXONOMY, SEARCH_SYNONYMS, CONCEPT_COLORS, DIFFICULTY_CRITERIA, CONCEPT_INDEX, buildConceptIndex };

// Browser global fallback
if (typeof window !== 'undefined') {
  window.BTBTaxonomy = {
    TAXONOMY,
    SEARCH_SYNONYMS,
    CONCEPT_COLORS,
    DIFFICULTY_CRITERIA,
    CONCEPT_INDEX,
    buildConceptIndex,
  };
}
