const AIRTABLE_BASE = 'appvLo6AOYhFmBsQ9';
const AIRTABLE_TABLE = 'LacrosseIQ';
const AIRTABLE_API = 'https://api.airtable.com/v0';

// This endpoint writes into the main production base, which also holds Players,
// Payments, Waivers and Staff Auth. It is called from the browser, so there is
// no client secret to check — a key shipped in index.html is not a secret.
// What we can do is require the request to come from one of our own pages.
// Browsers always send Origin on a POST; curl and scripted abuse do not.
const ALLOWED_ORIGINS = [
  'https://btb-lacrosse-iq.netlify.app',
  'https://os.bethebestli.com',
  'https://www.bethebestli.com',
  'http://localhost:8888',
];

// Airtable batch-creates 10 per request; this bounds how many round trips one
// caller can drive, and with it how much they can write in a single call.
const MAX_MOMENTS = 200;

function headersFor(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
    'Content-Type': 'application/json',
  };
}

export default async function handler(req, context) {
  const origin = req.headers.get('origin') || '';
  const corsHeaders = headersFor(origin);

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
  }

  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });
  }

  const pat = Deno.env.get('AIRTABLE_PAT');
  if (!pat) {
    return new Response(JSON.stringify({ error: 'AIRTABLE_PAT not configured' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  try {
    const body = await req.json();
    const { moments, game_title, youtube_url, video_id, level, team } = body;

    if (!moments || !Array.isArray(moments) || moments.length === 0) {
      return new Response(JSON.stringify({ error: 'moments array is required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    if (moments.length > MAX_MOMENTS) {
      return new Response(JSON.stringify({ error: `moments array exceeds the ${MAX_MOMENTS} limit` }), {
        status: 413,
        headers: corsHeaders,
      });
    }

    // Airtable batch create — max 10 records per request
    const BATCH_SIZE = 10;
    let savedCount = 0;
    const errors = [];

    for (let i = 0; i < moments.length; i += BATCH_SIZE) {
      const batch = moments.slice(i, i + BATCH_SIZE);

      const records = batch.map(m => ({
        fields: {
          GameTitle: game_title || '',
          YouTubeURL: youtube_url || '',
          VideoID: video_id || '',
          TimestampSeconds: typeof m.timestamp_seconds === 'number' ? m.timestamp_seconds : 0,
          TimestampLabel: m.timestamp_label || '',
          DeepLink: m.youtube_deep_link || '',
          ConceptPrimary: m.concept_primary || '',
          ConceptChain: m.concept_chain || '',
          ConceptTags: Array.isArray(m.concept_tags) ? m.concept_tags.join('\n') : (m.concept_tags || ''),
          SkillCategory: m.skill_category || '',
          ContentType: m.content_type || '',
          Difficulty: m.difficulty || '',
          TeachingPoint: m.teaching_point || '',
          CoachingCue: m.coaching_cue || '',
          PlayersInvolved: Array.isArray(m.players_involved) ? m.players_involved.join(', ') : (m.players_involved || ''),
          Result: m.result || '',
          VideoQuality: typeof m.video_quality === 'number' ? m.video_quality : 0,
          Level: level || '',
          Team: team || '',
          CreatedAt: new Date().toISOString(),
        }
      }));

      const res = await fetch(`${AIRTABLE_API}/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${pat}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error('Airtable batch error:', errData);
        errors.push(`Batch ${i}-${i + BATCH_SIZE}: ${errData.error?.message || res.status}`);
      } else {
        const data = await res.json();
        savedCount += (data.records || []).length;
      }

      // Small delay to avoid rate limiting
      if (i + BATCH_SIZE < moments.length) {
        await new Promise(r => setTimeout(r, 100));
      }
    }

    return new Response(JSON.stringify({
      saved: savedCount,
      errors: errors.length ? errors : undefined,
      total: moments.length,
    }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('save-moments error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export const config = { path: '/api/save-moments' };
