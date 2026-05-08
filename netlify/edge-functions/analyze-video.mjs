export default async function handler(req, context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json',
  };

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { youtube_url, game_title, level, team, notes } = body;

    if (!youtube_url || !game_title) {
      return new Response(JSON.stringify({ error: 'youtube_url and game_title are required' }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'GEMINI_API_KEY not configured' }), {
        status: 500,
        headers: corsHeaders,
      });
    }

    // Extract video ID from YouTube URL
    const videoIdMatch = youtube_url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';

    const prompt = `VIDEO URL: ${youtube_url}

You are an elite lacrosse coaching analyst with deep knowledge of men's and women's lacrosse at all levels. Analyze this YouTube video and identify every notable moment — every play, drill rep, skill demonstration, set play execution, or teachable coaching moment.

Game context: "${game_title}"${level ? ` | Level: ${level}` : ''}${team ? ` | Team: ${team}` : ''}${notes ? `\nCoaching notes: ${notes}` : ''}

For EACH moment, return a JSON object with EXACTLY these fields:
- timestamp_seconds: number (seconds from start of video)
- timestamp_label: string in M:SS format (e.g. "1:23", "12:45")
- youtube_deep_link: string (full URL with &t=NNs appended, e.g. "${youtube_url.includes('?') ? youtube_url + '&t=' : youtube_url.replace(/&.*/, '') + '?t='}0s")
- concept_primary: string (the main lacrosse concept, e.g. "Two-Man Game", "Split Dodge", "Backpipe Feed")
- concept_chain: string showing the full concept progression with > separators (e.g. "Two-Man Game > Pick and Roll > Backpipe Feed > Near Pipe Finish" or "Split Dodge > Top-Side > Hip-to-Hip Feed > Crease Finish")
- concept_tags: array of strings — all relevant lacrosse terms (e.g. ["split dodge", "top-side", "on-ball", "right-handed", "1v1", "step-down defense"])
- skill_category: one of exactly: "Dodging", "Finishing", "Feeding", "Defense", "Faceoff", "Transition", "Clear/Ride", "Special Teams", "X Behind", "Off-Ball", "Communication"
- content_type: one of exactly: "Game Film", "Drill", "Instructional", "Highlight"
- difficulty: one of exactly: "Beginner", "Intermediate", "Advanced", "Elite"
- teaching_point: string (1-2 sentences — what a coach would say to show this clip to a player)
- coaching_cue: string (1 short sentence — the exact verbal cue, e.g. "Attack the hip and go top-side into the lane")
- players_involved: array of strings (positions or numbers visible, e.g. ["#22 attackman", "crease midfielder", "LSM"])
- result: string (what happened — e.g. "Goal", "Save", "Turnover", "Incomplete", "Draw", "Clear", "Ride successful")
- video_quality: number between 0 and 1 (1.0 = broadcast quality, 0.5 = decent sideline, 0.2 = shaky phone)

Use precise lacrosse terminology:
DODGES: split dodge, roll dodge, face dodge, inside dodge, rocker dodge, question mark dodge, swim move, stutter step
FEEDS: backpipe feed, crease feed, skip feed, alley feed, behind-the-back feed, wrap feed, over-the-shoulder feed
FINISHES: near pipe, far pipe, low-to-high, bounce shot, behind-the-back shot, off-hand finish, quick stick, inside roll finish
DEFENSE: top-side defense, step-down slide, help slide, zone, recover, shut-off, riding, trail check, poke check
FACEOFF: clamp, rake, motorcycle grip, push-pull, jam, wrap
X BEHIND THE GOAL: X dodge, X feed, backside cut, crease cut from X, clear from X
TRANSITION: fast break, man-up, man-down, clear, ride, EMO

Be EXHAUSTIVE — tag every moment worth showing a player or analyzing in film session. For game film, aim for 30-80 moments minimum. For drills, capture every rep.

concept_chain must be SPECIFIC and detailed, building the complete play story:
- NOT: "Dodge"
- YES: "Split Dodge > Creates Space > Hip-to-Hip Pass > Cutting Midfielder > Crease Finish"

Return ONLY a valid JSON array. No markdown. No explanation. No code blocks. Just the raw JSON array starting with [ and ending with ].`;

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 65536,
            responseMimeType: 'application/json',
          }
        })
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error('Gemini API error:', errText);
      return new Response(JSON.stringify({ error: `Gemini API error: ${geminiRes.status}`, details: errText }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    const geminiData = await geminiRes.json();

    // Extract the text response
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!rawText) {
      return new Response(JSON.stringify({ error: 'Gemini returned empty response', raw: geminiData }), {
        status: 502,
        headers: corsHeaders,
      });
    }

    // Parse JSON — handle cases where Gemini wraps in markdown
    let moments = [];
    try {
      // Try direct parse first
      const cleaned = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();
      moments = JSON.parse(cleaned);
      if (!Array.isArray(moments)) {
        // Maybe it's wrapped in an object
        if (moments.moments) moments = moments.moments;
        else moments = [moments];
      }
    } catch (parseErr) {
      // Try to extract JSON array from the text
      const arrayMatch = rawText.match(/\[[\s\S]*\]/);
      if (arrayMatch) {
        try {
          moments = JSON.parse(arrayMatch[0]);
        } catch(e2) {
          return new Response(JSON.stringify({ error: 'Failed to parse Gemini response as JSON', raw: rawText.slice(0, 500) }), {
            status: 502,
            headers: corsHeaders,
          });
        }
      } else {
        return new Response(JSON.stringify({ error: 'No JSON array found in Gemini response', raw: rawText.slice(0, 500) }), {
          status: 502,
          headers: corsHeaders,
        });
      }
    }

    // Validate and normalize each moment
    const validCategories = ['Dodging','Finishing','Feeding','Defense','Faceoff','Transition','Clear/Ride','Special Teams','X Behind','Off-Ball','Communication'];
    const validContentTypes = ['Game Film','Drill','Instructional','Highlight'];
    const validDifficulties = ['Beginner','Intermediate','Advanced','Elite'];

    const normalizedMoments = moments.map(m => {
      const ts = Number(m.timestamp_seconds) || 0;
      const videoUrl = youtube_url.split('&t=')[0].split('?t=')[0];
      const baseUrl = videoUrl.includes('?') ? videoUrl : `https://www.youtube.com/watch?v=${videoId}`;
      const deepLink = `${baseUrl}&t=${Math.floor(ts)}s`;

      return {
        timestamp_seconds: ts,
        timestamp_label: m.timestamp_label || formatTimestamp(ts),
        youtube_deep_link: m.youtube_deep_link || deepLink,
        concept_primary: m.concept_primary || 'Lacrosse Play',
        concept_chain: m.concept_chain || m.concept_primary || 'Lacrosse Play',
        concept_tags: Array.isArray(m.concept_tags) ? m.concept_tags : (typeof m.concept_tags === 'string' ? m.concept_tags.split(',').map(t => t.trim()) : []),
        skill_category: validCategories.includes(m.skill_category) ? m.skill_category : 'Off-Ball',
        content_type: validContentTypes.includes(m.content_type) ? m.content_type : 'Game Film',
        difficulty: validDifficulties.includes(m.difficulty) ? m.difficulty : 'Intermediate',
        teaching_point: m.teaching_point || '',
        coaching_cue: m.coaching_cue || '',
        players_involved: Array.isArray(m.players_involved) ? m.players_involved : [],
        result: m.result || '',
        video_quality: typeof m.video_quality === 'number' ? Math.min(1, Math.max(0, m.video_quality)) : 0.7,
      };
    });

    return new Response(JSON.stringify({
      moments: normalizedMoments,
      count: normalizedMoments.length,
      video_id: videoId,
      game_title,
    }), { status: 200, headers: corsHeaders });

  } catch (err) {
    console.error('analyze-video error:', err);
    return new Response(JSON.stringify({ error: err.message || 'Internal server error' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}

function formatTimestamp(seconds) {
  const s = Math.floor(seconds);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, '0')}`;
}

export const config = { path: '/api/analyze-video' };
