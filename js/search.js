/**
 * BTB Lacrosse IQ — Client-Side Search Enhancement
 * Expands search queries using SEARCH_SYNONYMS and CONCEPT_INDEX
 * before hitting the API, so coaches find clips in seconds.
 *
 * Usage:
 *   const { expandedTerms, apiParams } = SearchEnhancer.expand('backpipe throwback');
 *   // -> searches API with all synonym expansions included
 *
 * Depends on: taxonomy.js (must be loaded first, or bundled together)
 */

(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) {
    // Node / CommonJS
    const taxonomy = require('./taxonomy.js');
    module.exports = factory(taxonomy);
  } else if (typeof window !== 'undefined') {
    // Browser global
    root.BTBSearch = factory(root.BTBTaxonomy || {});
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function (taxonomy) {

  const {
    TAXONOMY        = {},
    SEARCH_SYNONYMS = {},
    CONCEPT_COLORS  = {},
    DIFFICULTY_CRITERIA = {},
    CONCEPT_INDEX   = [],
  } = taxonomy;

  // ───────────────────────────────────────────────────────────────────────────
  // INTERNAL HELPERS
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * Normalize a string: lowercase, strip punctuation, collapse spaces.
   */
  function normalize(str) {
    return (str || '')
      .toLowerCase()
      .replace(/['\-_]/g, ' ')   // hyphens/apostrophes → space
      .replace(/[^a-z0-9 ]/g, '') // strip remaining punctuation
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Tokenize a query into individual words.
   */
  function tokenize(query) {
    return normalize(query).split(' ').filter(Boolean);
  }

  /**
   * Return all synonym expansions for a single normalized token or phrase.
   * Checks both exact match and substring match.
   */
  function synonymsForTerm(term) {
    const t = normalize(term);
    const found = new Set();

    // Exact match
    if (SEARCH_SYNONYMS[t]) {
      SEARCH_SYNONYMS[t].forEach(s => found.add(normalize(s)));
    }

    // Substring: if any synonym key is contained in the query or vice-versa
    for (const [key, vals] of Object.entries(SEARCH_SYNONYMS)) {
      if (t.includes(key) || key.includes(t)) {
        found.add(key);
        vals.forEach(s => found.add(normalize(s)));
      }
    }

    return Array.from(found);
  }

  /**
   * Build a set of all unique search terms from a raw query string.
   * - Adds the original terms
   * - Adds single-word synonyms
   * - Adds multi-word synonym phrases as quoted strings (for API phrase search)
   */
  function expandQuery(rawQuery) {
    const norm = normalize(rawQuery);
    const tokens = tokenize(rawQuery);

    const terms = new Set();

    // Always include the original normalized query
    terms.add(norm);

    // Single-token expansions
    tokens.forEach(token => {
      terms.add(token);
      synonymsForTerm(token).forEach(s => terms.add(s));
    });

    // Multi-token phrase expansions (2-gram and 3-gram windows)
    for (let size = 2; size <= 3; size++) {
      for (let i = 0; i <= tokens.length - size; i++) {
        const phrase = tokens.slice(i, i + size).join(' ');
        terms.add(phrase);
        synonymsForTerm(phrase).forEach(s => terms.add(s));
      }
    }

    // Full query synonyms
    synonymsForTerm(norm).forEach(s => terms.add(s));

    // Remove empties
    terms.delete('');

    return Array.from(terms);
  }

  /**
   * Score how well a CONCEPT_INDEX entry matches the expanded terms.
   * Higher = better match.
   */
  function scoreEntry(entry, expandedTerms) {
    let score = 0;
    const text = entry.searchText;

    for (const term of expandedTerms) {
      if (text.includes(term)) {
        // Longer matches score higher
        score += term.split(' ').length * 2;
        // Bonus for matching category/sub label directly
        if (normalize(entry.categoryLabel).includes(term)) score += 3;
        if (normalize(entry.subLabel).includes(term)) score += 2;
        if (normalize(entry.actionLabel).includes(term)) score += 4;
      }
    }

    return score;
  }

  // ───────────────────────────────────────────────────────────────────────────
  // SEARCH ENHANCER — PUBLIC API
  // ───────────────────────────────────────────────────────────────────────────

  const SearchEnhancer = {

    /**
     * expand(rawQuery)
     *
     * Main entry point. Takes a raw search string and returns:
     *  - expandedTerms: deduplicated array of all search terms
     *  - apiParams: object ready to pass to your API (Mux, Supabase, etc.)
     *  - matchedConcepts: top taxonomy concepts matching the query
     *  - suggestedCategories: categories most relevant to the query
     *
     * Example:
     *   SearchEnhancer.expand('backpipe throwback')
     *   // expandedTerms: ['backpipe throwback', 'backpipe', 'back pipe', 'back-pipe',
     *   //                  'behind net feed', 'throwback', 'throw back', 'throwback pass', ...]
     */
    expand(rawQuery) {
      if (!rawQuery || !rawQuery.trim()) {
        return { expandedTerms: [], apiParams: {}, matchedConcepts: [], suggestedCategories: [] };
      }

      const expandedTerms = expandQuery(rawQuery);
      const matchedConcepts = this.matchConcepts(expandedTerms);
      const suggestedCategories = this.suggestCategories(matchedConcepts);

      const apiParams = this.buildApiParams(rawQuery, expandedTerms, matchedConcepts);

      return {
        originalQuery: rawQuery,
        normalizedQuery: normalize(rawQuery),
        expandedTerms,
        apiParams,
        matchedConcepts,
        suggestedCategories,
      };
    },

    /**
     * matchConcepts(expandedTerms)
     *
     * Finds the best-matching CONCEPT_INDEX entries for the expanded terms.
     * Returns top 10 sorted by score.
     */
    matchConcepts(expandedTerms, limit = 10) {
      if (!CONCEPT_INDEX.length) return [];

      const scored = CONCEPT_INDEX
        .map(entry => ({ entry, score: scoreEntry(entry, expandedTerms) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ entry, score }) => ({ ...entry, score }));

      return scored;
    },

    /**
     * suggestCategories(matchedConcepts)
     *
     * Returns unique categories found in matched concepts, with their colors.
     */
    suggestCategories(matchedConcepts) {
      const seen = new Set();
      const cats = [];
      for (const c of matchedConcepts) {
        if (!seen.has(c.categoryKey)) {
          seen.add(c.categoryKey);
          cats.push({
            key: c.categoryKey,
            label: c.categoryLabel,
            slug: c.categorySlug,
            color: CONCEPT_COLORS[c.categoryKey] || null,
          });
        }
      }
      return cats;
    },

    /**
     * buildApiParams(rawQuery, expandedTerms, matchedConcepts)
     *
     * Builds a params object for your backend search API.
     * Adjust the shape to match your actual API (Mux metadata search,
     * Supabase full-text, Algolia, etc.)
     *
     * Returns:
     *   {
     *     q: string,              // original query
     *     terms: string[],        // all expanded terms (for OR search)
     *     categoryFilter: string[], // top matched category slugs
     *     conceptSlugs: string[], // top matched action slugs
     *     difficultyHint: string | null,
     *   }
     */
    buildApiParams(rawQuery, expandedTerms, matchedConcepts) {
      const categoryFilter = [...new Set(matchedConcepts.map(c => c.categorySlug))].slice(0, 4);
      const conceptSlugs   = matchedConcepts.slice(0, 6).map(c => c.actionSlug);
      const difficultyHint = this.detectDifficulty(rawQuery);

      return {
        q: rawQuery,
        terms: expandedTerms,
        categoryFilter,
        conceptSlugs,
        difficultyHint,
      };
    },

    /**
     * detectDifficulty(rawQuery)
     *
     * Heuristic: if query contains difficulty-related words, return that level.
     * Returns one of: 'beginner' | 'intermediate' | 'advanced' | 'elite' | null
     */
    detectDifficulty(rawQuery) {
      const n = normalize(rawQuery);
      if (/elite|game speed|game pressure|under pressure|live defense/.test(n))  return 'elite';
      if (/advanced|multi concept|three concept|chain/.test(n))                  return 'advanced';
      if (/intermediate|two concept|moderate/.test(n))                           return 'intermediate';
      if (/beginner|basic|drill|walk through|no pressure/.test(n))               return 'beginner';
      return null;
    },

    /**
     * filterByCategory(categoryKey)
     *
     * Returns all concept index entries for a given category key.
     * Use to populate a category filter page.
     */
    filterByCategory(categoryKey) {
      return CONCEPT_INDEX.filter(e => e.categoryKey === categoryKey);
    },

    /**
     * filterByDifficulty(level)
     * Level: 'beginner' | 'intermediate' | 'advanced' | 'elite'
     *
     * Returns difficulty criteria object for display / filtering.
     */
    filterByDifficulty(level) {
      const key = level.toUpperCase();
      return DIFFICULTY_CRITERIA[key] || null;
    },

    /**
     * allCategories()
     * Returns a list of all top-level categories with their colors.
     */
    allCategories() {
      return Object.entries(TAXONOMY).map(([key, cat]) => ({
        key,
        label: cat.label,
        slug: cat.slug,
        color: CONCEPT_COLORS[key] || null,
        subconcepts: Object.keys(cat.subconcepts || {}).length,
      }));
    },

    /**
     * allConceptsInCategory(categoryKey)
     * Returns flat list of all sub > action in a given category.
     */
    allConceptsInCategory(categoryKey) {
      return CONCEPT_INDEX.filter(e => e.categoryKey === categoryKey);
    },

    /**
     * searchSuggest(partial, limit = 8)
     *
     * Typeahead autocomplete: given a partial query string,
     * returns up to `limit` suggested concept labels.
     */
    searchSuggest(partial, limit = 8) {
      if (!partial || partial.length < 2) return [];

      const norm = normalize(partial);
      const results = [];
      const seen = new Set();

      // Match concept labels
      for (const entry of CONCEPT_INDEX) {
        if (entry.searchText.includes(norm)) {
          const label = `${entry.subLabel} — ${entry.actionLabel}`;
          if (!seen.has(label)) {
            seen.add(label);
            results.push({
              label,
              categoryLabel: entry.categoryLabel,
              categorySlug: entry.categorySlug,
              actionSlug: entry.actionSlug,
              color: CONCEPT_COLORS[entry.categoryKey] || null,
            });
          }
          if (results.length >= limit) break;
        }
      }

      // If still room, add synonym key matches
      if (results.length < limit) {
        for (const key of Object.keys(SEARCH_SYNONYMS)) {
          if (key.includes(norm) && !seen.has(key)) {
            seen.add(key);
            results.push({ label: key, type: 'synonym', synonyms: SEARCH_SYNONYMS[key] });
            if (results.length >= limit) break;
          }
        }
      }

      return results;
    },

    /**
     * buildTagList(categoryKeys)
     *
     * Given an array of category keys, returns UI-ready tag objects with colors.
     * Useful for rendering filter chips / badges.
     */
    buildTagList(categoryKeys) {
      return categoryKeys.map(key => ({
        key,
        label: TAXONOMY[key] ? TAXONOMY[key].label : key,
        color: CONCEPT_COLORS[key] || { primary: '#6B7280', light: '#F3F4F6', label: 'Gray', text: '#374151' },
      }));
    },

    // ── COMBO QUERY PATTERNS ─────────────────────────────────────────────────
    // Pre-built searches for Dan's most common multi-concept queries.
    // Each returns a pre-expanded result from expand().

    COMBO_SEARCHES: {
      'throwback backpipe finish':         'two man throwback backpipe feed crease finish',
      'pick and roll crease':              'pick and roll roller crease finish',
      'split dodge near pipe':             'split dodge inside hand near pipe finish',
      'X feed seal cut':                   'from X feed seal cut crease finish',
      'fast break 3v2 crease':             'fast break 3v2 crease finish',
      'emo skip backpipe':                 'extra man offense skip backpipe shooter',
      'goalie outlet fast break':          'goalie outlet fast break transition',
      'faceoff clamp outlet':              'faceoff clamp wing outlet fast break',
      'force baseline hot slide':          'force baseline hot slide recover',
      'man down stop clear fast break':    'man down zone slide communication clear fast break',
    },

    /**
     * comboSearch(comboKey)
     * Run one of the pre-built combo searches.
     * comboKey is a key from COMBO_SEARCHES (or any alias substring).
     */
    comboSearch(comboKey) {
      const norm = normalize(comboKey);
      for (const [k, v] of Object.entries(this.COMBO_SEARCHES)) {
        if (normalize(k).includes(norm) || norm.includes(normalize(k))) {
          return this.expand(v);
        }
      }
      // Fallback: treat the key itself as a raw query
      return this.expand(comboKey);
    },

  };

  // ───────────────────────────────────────────────────────────────────────────
  // INTEGRATION HELPERS
  // ───────────────────────────────────────────────────────────────────────────

  /**
   * wrapFetch(fetchFn, apiBaseUrl)
   *
   * Returns a search function that:
   *  1. Expands the query using SearchEnhancer
   *  2. Calls fetchFn(url, params) with expanded params
   *  3. Returns combined results
   *
   * Example:
   *   const search = wrapFetch(fetch, 'https://api.btblacrosse.iq/search');
   *   const results = await search('backpipe throwback');
   */
  function wrapFetch(fetchFn, apiBaseUrl) {
    return async function enhancedSearch(rawQuery, extraParams = {}) {
      const { apiParams, expandedTerms, matchedConcepts, suggestedCategories } =
        SearchEnhancer.expand(rawQuery);

      const payload = {
        ...apiParams,
        ...extraParams,
      };

      let response = null;
      try {
        const res = await fetchFn(`${apiBaseUrl}?q=${encodeURIComponent(rawQuery)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        response = await res.json();
      } catch (err) {
        console.warn('[BTBSearch] API call failed:', err);
      }

      return {
        query: rawQuery,
        expandedTerms,
        matchedConcepts,
        suggestedCategories,
        apiParams,
        response,
      };
    };
  }

  /**
   * attachSearchInput(inputEl, onResults, opts)
   *
   * Attach live search expansion to an <input> element.
   * Calls onResults(expandResult) on every keystroke (debounced).
   *
   * opts.debounce  — ms to debounce (default 250)
   * opts.minChars  — min characters to trigger (default 2)
   */
  function attachSearchInput(inputEl, onResults, opts = {}) {
    const debounce  = opts.debounce  || 250;
    const minChars  = opts.minChars  || 2;

    let timer = null;

    inputEl.addEventListener('input', function () {
      clearTimeout(timer);
      const val = this.value.trim();
      if (val.length < minChars) {
        onResults(null);
        return;
      }
      timer = setTimeout(() => {
        const result = SearchEnhancer.expand(val);
        onResults(result);
      }, debounce);
    });
  }

  // ───────────────────────────────────────────────────────────────────────────
  // RETURN PUBLIC API
  // ───────────────────────────────────────────────────────────────────────────

  return {
    SearchEnhancer,
    expandQuery,
    normalize,
    tokenize,
    synonymsForTerm,
    wrapFetch,
    attachSearchInput,
  };

}));


// ─────────────────────────────────────────────────────────────────────────────
// USAGE EXAMPLES (reference — not executed)
// ─────────────────────────────────────────────────────────────────────────────
/*

// 1. Basic expansion
const { expandedTerms, matchedConcepts } = BTBSearch.SearchEnhancer.expand('backpipe');
// expandedTerms includes: 'backpipe', 'back pipe', 'back-pipe', 'behind net feed', 'pipe feed', ...
// matchedConcepts: top taxonomy entries for FEEDING > BACKPIPE_FEED, TWO_MAN_GAME > BACKPIPE_THROWBACK_FEED, etc.

// 2. Multi-concept Dan query
const result = BTBSearch.SearchEnhancer.expand('two man throwback backpipe feed crease finish');
// expandedTerms: ~30 terms covering two-man game, throwback, backpipe, feeding, crease finish
// matchedConcepts: TWO_MAN_GAME > BACKPIPE_THROWBACK_FEED (top), FEEDING > BACKPIPE_FEED, FINISHING > CREASE_FINISH, etc.

// 3. Combo search shortcut
const r = BTBSearch.SearchEnhancer.comboSearch('throwback backpipe finish');
// Same as expand('two man throwback backpipe feed crease finish')

// 4. Autocomplete typeahead
const suggestions = BTBSearch.SearchEnhancer.searchSuggest('backp');
// [{label: 'Backpipe Feed — Backpipe Feed from Top', categoryLabel: 'Feeding', ...}, ...]

// 5. API integration
const search = BTBSearch.wrapFetch(fetch, 'https://api.btblacrosse.iq/clips/search');
const clips = await search('split dodge near pipe');

// 6. Attach to DOM input
BTBSearch.attachSearchInput(
  document.getElementById('search-input'),
  (result) => {
    if (!result) return;
    renderSuggestions(result.suggestedCategories);
    fetchClips(result.apiParams);
  },
  { debounce: 200, minChars: 2 }
);

// 7. Category filter page
const dodgingConcepts = BTBSearch.SearchEnhancer.allConceptsInCategory('DODGING');
// All split dodge, roll dodge, face dodge, etc. entries

// 8. Color-coded tags
const tags = BTBSearch.SearchEnhancer.buildTagList(['DODGING', 'FEEDING', 'FINISHING']);
// [{key:'DODGING', label:'Dodging', color:{primary:'#3B82F6', ...}}, ...]

*/
