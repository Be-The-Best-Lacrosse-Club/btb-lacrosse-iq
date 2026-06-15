const AIRTABLE_BASE = 'appvLo6AOYhFmBsQ9';
const AIRTABLE_TABLE = 'LacrosseIQ';
const AIRTABLE_API = 'https://api.airtable.com/v0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Content-Type': 'application/json',
};

export default async function handler(req, context) {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
  }

  const pat = Deno.env.get('AIRTABLE_PAT');
  if (!pat) {
    return new Response(JSON.stringify({ error: 'AIRTABLE_PAT not configured' }), {
      status: 500,
      headers: corsHeaders,
    });
  }

  try {
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || '';
    const contentType = url.searchParams.get('content_type') || '';
    const difficulty = url.searchParams.get('difficulty') || '';
    const game = url.searchParams.get('game') || '';
    const gender = url.searchParams.get('gender') || '';
    const level = url.searchParams.get('level') || '';

    // Build Airtable filterByFormula
    const filters = [];

    if (q) {
      const safeQ = q.replace(/'/g, "\\'");
      filters.push(`OR(
        SEARCH(LOWER("${safeQ}"), LOWER({ConceptChain})),
        SEARCH(LOWER("${safeQ}"), LOWER({ConceptTags})),
        SEARCH(LOWER("${safeQ}"), LOWER({TeachingPoint})),
        SEARCH(LOWER("${safeQ}"), LOWER({ConceptPrimary})),
        SEARCH(LOWER("${safeQ}"), LOWER({CoachingCue})),
        SEARCH(LOWER("${safeQ}"), LOWER({GameTitle}))
      )`);
    }

    if (category) {
      filters.push(`{SkillCategory} = "${category.replace(/"/g, '\\"')}"`);
    }

    if (contentType) {
      filters.push(`{ContentType} = "${contentType.replace(/"/g, '\\"')}"`);
    }

    if (difficulty) {
      filters.push(`{Difficulty} = "${difficulty.replace(/"/g, '\\"')}"`);
    }

    if (game) {
      const safeGame = game.replace(/'/g, "\\'");
      filters.push(`SEARCH(LOWER("${safeGame}"), LOWER({GameTitle}))`);
    }

    if (gender) {
      const safeGender = gender.replace(/"/g, '\\"');
      filters.push(`SEARCH(LOWER("${safeGender.toLowerCase()}"), LOWER({Level}))`)
    }

    if (level) {
      filters.push(`{Level} = "${level.replace(/"/g, '\\"')}"`)
    }

    let formula = '';
    if (filters.length === 0) {
      formula = 'NOT({GameTitle} = "")';
    } else if (filters.length === 1) {
      formula = filters[0];
    } else {
      formula = `AND(${filters.join(', ')})`;
    }

    const params = new URLSearchParams({
      filterByFormula: formula,
      maxRecords: '200',
    });
    // fields must use indexed bracket notation, not JSON.stringify
    const fieldNames = [
      'GameTitle', 'YouTubeURL', 'VideoID', 'TimestampSeconds', 'TimestampLabel',
      'DeepLink', 'ConceptPrimary', 'ConceptChain', 'ConceptTags', 'SkillCategory',
      'ContentType', 'Difficulty', 'TeachingPoint', 'CoachingCue', 'PlayersInvolved',
      'Result', 'VideoQuality', 'Level', 'Team', 'CreatedAt'
    ];
    fieldNames.forEach((f, i) => params.set(`fields[${i}]`, f));
    params.set('sort[0][field]', 'TimestampSeconds');
    params.set('sort[0][direction]', 'asc');

    const airtableUrl = `${AIRTABLE_API}/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?${params.toString()}`;

    const res = await fetch(airtableUrl, {
      headers: {
        'Authorization': `Bearer ${pat}`,
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      console.error('Airtable search error:', errData);
      return new Response(JSON.stringify({ error: 'Airtable query failed', details: errData }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    const data = await res.json();
    const records = data.records || [];

    // Flatten fields for frontend consumption
    const moments = records.map(r => {
      const f = r.fields;
      return {
        id: r.id,
        GameTitle: f.GameTitle || '',
        YouTubeURL: f.YouTubeURL || '',
        VideoID: f.VideoID || '',
        TimestampSeconds: f.TimestampSeconds || 0,
        TimestampLabel: f.TimestampLabel || '',
        DeepLink: f.DeepLink || '',
        ConceptPrimary: f.ConceptPrimary || '',
        ConceptChain: f.ConceptChain || '',
        ConceptTags: f.ConceptTags || '',
        SkillCategory: f.SkillCategory || '',
        ContentType: f.ContentType || '',
        Difficulty: f.Difficulty || '',
        TeachingPoint: f.TeachingPoint || '',
        CoachingCue: f.CoachingCue || '',
        PlayersInvolved: f.PlayersInvolved || '',
        Result: f.Result || '',
        VideoQuality: f.VideoQuality || 0,
        Level: f.Level || '',
        Team: f.Team || '',
        CreatedAt: f.CreatedAt || '',
      };
    });

    // Simple relevance sort: boost exact matches in concept_chain
    if (q) {
      const qLower = q.toLowerCase();
      moments.sort((a, b) => {
        const aChain = (a.ConceptChain || '').toLowerCase();
        const bChain = (b.ConceptChain || '').toLowerCase();
        const aScore = (aChain.includes(qLower) ? 10 : 0) + (a.VideoQuality || 0);
        const bScore = (bChain.includes(qLower) ? 10 : 0) + (b.VideoQuality || 0);
        return bScore - aScore;
      });
    }

    return new Response(JSON.stringify({
      moments,
      count: moments.length,
      query: q,
    }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('search-moments error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export const config = { path: '/api/search-moments' };
