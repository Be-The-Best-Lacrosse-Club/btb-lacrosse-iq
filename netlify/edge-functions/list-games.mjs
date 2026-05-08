const AIRTABLE_BASE = 'appjseA9aHJR7erlD';
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
    // Fetch all records with just the fields we need for the catalogue
    let allRecords = [];
    let offset = undefined;

    do {
      const params = new URLSearchParams({
        fields: JSON.stringify(['GameTitle', 'YouTubeURL', 'VideoID', 'Level', 'Team', 'ContentType', 'CreatedAt']),
        sort: JSON.stringify([{ field: 'CreatedAt', direction: 'desc' }]),
        maxRecords: '1000',
      });

      if (offset) params.set('offset', offset);

      const res = await fetch(
        `${AIRTABLE_API}/${AIRTABLE_BASE}/${encodeURIComponent(AIRTABLE_TABLE)}?${params.toString()}`,
        {
          headers: {
            'Authorization': `Bearer ${pat}`,
            'Content-Type': 'application/json',
          }
        }
      );

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        return new Response(JSON.stringify({ error: 'Airtable query failed', details: errData }), {
          status: 502,
          headers: corsHeaders,
        });
      }

      const data = await res.json();
      allRecords = allRecords.concat(data.records || []);
      offset = data.offset; // undefined when no more pages
    } while (offset);

    // Group by GameTitle
    const gameMap = new Map();

    for (const record of allRecords) {
      const f = record.fields;
      const title = f.GameTitle || 'Untitled';
      const key = title.toLowerCase().trim();

      if (!gameMap.has(key)) {
        gameMap.set(key, {
          GameTitle: title,
          YouTubeURL: f.YouTubeURL || '',
          VideoID: f.VideoID || '',
          Level: f.Level || '',
          Team: f.Team || '',
          content_types: new Set(),
          moment_count: 0,
          CreatedAt: f.CreatedAt || '',
        });
      }

      const game = gameMap.get(key);
      game.moment_count += 1;
      if (f.ContentType) game.content_types.add(f.ContentType);

      // Keep most recent CreatedAt
      if (f.CreatedAt && f.CreatedAt > game.CreatedAt) {
        game.CreatedAt = f.CreatedAt;
      }
    }

    // Convert to array and sort by CreatedAt desc
    const games = Array.from(gameMap.values())
      .map(g => ({
        GameTitle: g.GameTitle,
        YouTubeURL: g.YouTubeURL,
        VideoID: g.VideoID,
        Level: g.Level,
        Team: g.Team,
        ContentTypes: Array.from(g.content_types),
        moment_count: g.moment_count,
        CreatedAt: g.CreatedAt,
      }))
      .sort((a, b) => (b.CreatedAt > a.CreatedAt ? 1 : -1));

    return new Response(JSON.stringify({
      games,
      total_games: games.length,
      total_moments: allRecords.length,
    }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('list-games error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

export const config = { path: '/api/list-games' };
