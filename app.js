"use strict";

    const DATA_URL = "NVAtlas-AI-Agent.csv";
    const PAGE_SIZE = 25;
    const SVG_NS = "http://www.w3.org/2000/svg";

    const CATEGORY_ORDER = ["state", "communicative", "direct", "recast"];
    const CATEGORIES = {
      state: {
        en: "State / experience",
        zh: "狀態／經驗",
        color: "#925d78",
        summaryEn: "The English nominal profiles a feeling, condition, or mental experience; Chinese tends to verbalize that state.",
        summaryZh: "英文名詞表達感覺、狀態或心理經驗；中文傾向把該狀態動詞化。",
        definitionEn: "A nominal whose main contribution is a persistent condition, emotion, perception, or psychological experience, rather than an observable event or a speech act.",
        definitionZh: "主要表達持續狀態、情緒、感知或心理經驗，而不是可觀察事件或言語行為的名詞。",
        theoryEn: "Catford (1965) on level shifts, with Martin (1992) on ideational grammatical metaphor.",
        theoryZh: "Catford（1965）的層次轉換，並參考 Martin（1992）的經驗語法隱喻。",
        ruleEn: "Apply first when the English nominal denotes an internal state or experience. The target verb must preserve the participants and the experienced condition.",
        ruleZh: "若英文名詞表示內在狀態或經驗，優先採用。中文動詞須保留原有參與者與所描述的狀態。",
        positiveEn: "disappointment → 失望",
        negativeEn: "destruction → 毀滅 is an observable event, not a state.",
        boundaryEn: "silence → 閉嘴 is imperative and social; it stays in this category because the English nominal profiles a state, but the spoken context should be explained.",
        positiveZh: "disappointment → 失望",
        negativeZh: "destruction → 毀滅 是可觀察事件，不是狀態。",
        boundaryZh: "silence → 閉嘴 帶命令與社交功能；因英文名詞表達狀態，仍歸此類，但需在口頭報告解釋語境。"
      },
      communicative: {
        en: "Communicative act",
        zh: "交際行為",
        color: "#137b78",
        summaryEn: "The nominal names a social or speech act; Chinese often renders it with a performative or directive verb.",
        summaryZh: "名詞指涉社交或言語行為；中文常用施為動詞或指令動詞表達。",
        definitionEn: "A nominal that primarily names what an utterance or interaction performs, such as asking, permitting, explaining, confessing, or directing attention.",
        definitionZh: "名詞主要說明話語或互動所完成的行為，例如提問、批准、解釋、招供或提醒注意。",
        theoryEn: "Austin (1962) and Searle (1969) on speech acts; Vinay and Darbelnet (1958/1995) on transposition.",
        theoryZh: "Austin（1962）與 Searle（1969）的言語行為理論；Vinay 與 Darbelnet（1958/1995）的詞性轉換。",
        ruleEn: "Apply after state/experience when the nominal conventionally names a communicative function rather than an object. Prefer the verb that performs that function in context.",
        ruleZh: "在排除狀態／經驗後，若名詞慣常表示交際功能而非物件，即採用此類；以語境中完成該功能的動詞為準。",
        positiveEn: "permission → 批准",
        negativeEn: "publication → 出版 names an event, not a request or permission.",
        boundaryEn: "question → 問 is a straightforward act of asking; question → 不行 in “out of the question” remains here by the nominal-first rule, even though its idiom deserves separate discussion.",
        positiveZh: "permission → 批准",
        negativeZh: "publication → 出版 是事件名稱，不是請求或批准。",
        boundaryZh: "question → 問 是直接的提問行為；在 “out of the question” 中譯成「不行」仍因名詞優先規則歸此類，但該慣用語應另行討論。"
      },
      direct: {
        en: "Direct transposition",
        zh: "直接詞性轉換",
        color: "#39739b",
        summaryEn: "The nominal's event or action meaning corresponds closely to the Chinese verb; the main change is grammatical class.",
        summaryZh: "名詞的事件或行動意義與中文動詞緊密對應，主要變化是語法詞類。",
        definitionEn: "An event/action nominal whose target verb is the same nominal's dominant realization in this corpus and whose core meaning remains stable.",
        definitionZh: "事件或行動名詞的目標動詞是它在語料中的主要實現，而且核心意義保持穩定。",
        theoryEn: "Vinay and Darbelnet (1958/1995), transposition.",
        theoryZh: "Vinay 與 Darbelnet（1958/1995）的詞性轉換。",
        ruleEn: "After the first two rules, classify here when the target verb equals the most frequent verb supplied for that nominal, or when the nominal occurs only once and no contextual idiom blocks a direct reading.",
        ruleZh: "套用前兩條後，若中文動詞是該名詞最常見的動詞實現，或該名詞只出現一次且沒有慣用語阻礙直接理解，即歸此類。",
        positiveEn: "destruction → 毀滅",
        negativeEn: "A nominal mapped to a different verb from its own dominant pattern is recast, not direct.",
        boundaryEn: "A single occurrence is called direct only provisionally; without a comparison set, frequency cannot confirm that the rendering is typical.",
        positiveZh: "destruction → 毀滅",
        negativeZh: "若名詞連向不同於自身主要模式的其他動詞，應歸語境重寫。",
        boundaryZh: "只出現一次的名詞只能暫定為直接轉換；沒有比較資料時，不能憑單次出現證明譯法典型。"
      },
      recast: {
        en: "Contextual recasting",
        zh: "語境重寫",
        color: "#b17a25",
        summaryEn: "The target changes the nominal's local expression, using an idiom or differently profiled verb to fit the scene.",
        summaryZh: "譯文改變名詞在局部語境中的表達，以慣用語或不同視角的動詞配合場景。",
        definitionEn: "A repeated nominal rendered with a Chinese verb outside its dominant pattern, where the source noun's category is not the primary explanation for the change.",
        definitionZh: "重複出現的名詞被譯成其主要模式以外的中文動詞，而詞性轉換本身不足以解釋該差異。",
        theoryEn: "Nida and Taber (1969) on dynamic equivalence; House (2015) on translation quality and contextual fit.",
        theoryZh: "Nida 與 Taber（1969）的動態對等；House（2015）關於翻譯品質與語境適配的討論。",
        ruleEn: "Use only after state, communicative, and direct tests fail. The entry must belong to a repeated nominal whose target verb differs from that nominal's dominant target.",
        ruleZh: "只有狀態、交際與直接轉換皆不適用時才採用。資料必須屬於重複名詞，而且目標動詞不同於該名詞最主要的目標。",
        positiveEn: "destruction → 烧毁",
        negativeEn: "permission → 批准 is a recurring communicative act and belongs to the prior rule.",
        boundaryEn: "A one-off verb change may reflect an annotation error. Such rows should be checked manually before analytic claims are made.",
        positiveZh: "destruction → 烧毁",
        negativeZh: "permission → 批准 是重複出現的交際行為，應歸前一條規則。",
        boundaryZh: "只出現一次的動詞差異可能只是標註錯誤；提出分析結論前應人工核對。"
      }
    };

    const STATE_TERMS = new Set([
      "admiration", "amusement", "dependence", "devotion", "disappointment", "excitement",
      "existence", "fixation", "impression", "intention", "intoxication", "notion",
      "obsession", "passion", "pleasure", "presence", "reputation", "resemblance",
      "satisfaction", "sensation", "silence", "trance"
    ]);

    const COMMUNICATIVE_TERMS = new Set([
      "announcement", "argument", "attention", "authorization", "communication",
      "compliment", "confession", "consideration", "conversation", "declaration",
      "discussion", "exception", "explanation", "expression", "information",
      "interpretation", "interrogation", "invitation", "lecture", "mention",
      "objection", "permission", "persuasion", "petition", "preachment",
      "pronouncement", "question", "recitation", "recognition", "recommendation",
      "suggestion", "warning"
    ]);

    const state = {
      query: "",
      category: "",
      checked: "",
      hideDuplicates: false,
      sort: "id",
      direction: "asc",
      page: 1,
      lang: "en"
    };

    let corpus = [];
    let filtered = [];
    let datasetReady = false;
    let networkView = { zoom: 1, panX: 0, panY: 0, nodes: [], links: [], layer: null, svg: null };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
    const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[char]));
    const escapeRegExp = value => String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    function paired(en, zh) {
      return `<span class="en">${en}</span><span class="zh">${zh}</span>`;
    }

    function parseCsv(text) {
      const rows = [];
      let row = [];
      let field = "";
      let quoted = false;
      const clean = text.replace(/^\uFEFF/, "");
      for (let i = 0; i < clean.length; i += 1) {
        const char = clean[i];
        if (quoted) {
          if (char === '"' && clean[i + 1] === '"') {
            field += '"';
            i += 1;
          } else if (char === '"') {
            quoted = false;
          } else {
            field += char;
          }
        } else if (char === '"') {
          quoted = true;
        } else if (char === ",") {
          row.push(field);
          field = "";
        } else if (char === "\n" || char === "\r") {
          if (char === "\r" && clean[i + 1] === "\n") i += 1;
          row.push(field);
          if (row.some(cell => cell !== "")) rows.push(row);
          row = [];
          field = "";
        } else {
          field += char;
        }
      }
      row.push(field);
      if (row.some(cell => cell !== "")) rows.push(row);
      return rows;
    }

    function mostCommon(rows, key) {
      const counts = new Map();
      rows.forEach(row => counts.set(row[key], (counts.get(row[key]) || 0) + 1));
      let winner = "";
      let best = -1;
      [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).forEach(([value, count]) => {
        if (count > best) {
          winner = value;
          best = count;
        }
      });
      return winner;
    }

    function enrichCorpus(rawRows) {
      const nounCounts = new Map();
      const pairCounts = new Map();
      rawRows.forEach(item => {
        nounCounts.set(item.nominal, (nounCounts.get(item.nominal) || 0) + 1);
        const pairKey = `${item.source_text}\u0000${item.target_text}`;
        pairCounts.set(pairKey, (pairCounts.get(pairKey) || 0) + 1);
      });
      const dominantVerb = new Map();
      [...nounCounts.keys()].forEach(noun => {
        dominantVerb.set(noun, mostCommon(rawRows.filter(row => row.nominal === noun), "targetVerb"));
      });

      const seenPairs = new Set();
      return rawRows.map((item, index) => {
        let category = "direct";
        if (STATE_TERMS.has(item.nominal)) {
          category = "state";
        } else if (COMMUNICATIVE_TERMS.has(item.nominal)) {
          category = "communicative";
        } else if (nounCounts.get(item.nominal) > 1 && item.targetVerb !== dominantVerb.get(item.nominal)) {
          category = "recast";
        }
        const pairKey = `${item.source_text}\u0000${item.target_text}`;
        const duplicateCopy = seenPairs.has(pairKey);
        seenPairs.add(pairKey);
        return {
          ...item,
          id: item.id,
          site_id: `NV-${String(index + 1).padStart(3, "0")}`,
          source_text: item.source_text,
          target_text: item.target_text,
          source: `NVAtlas-AI-Agent.csv · record ${index + 2} · original sentence ID ${item.id} · local file dated 2026-10-30 · upstream URL/version not supplied`,
          category,
          human_checked: "no",
          unit: "sentence pair",
          key_term: item.nominal,
          target_key_term: item.targetVerb,
          notes: "Nominal and Chinese verb were supplied in the source CSV; neither was independently verified against an upstream snapshot.",
          duplicate: pairCounts.get(pairKey) > 1,
          duplicateCopy,
          sourceLength: item.source_text.length,
          targetLength: item.target_text.length
        };
      });
    }

    async function loadCorpus() {
      const response = await fetch(DATA_URL, { cache: "no-store" });
      if (!response.ok) throw new Error(`Could not load ${DATA_URL} (${response.status})`);
      const matrix = parseCsv(await response.text());
      if (matrix.length < 2) throw new Error("The CSV contains no data rows.");
      const headers = matrix[0].map(header => header.trim());
      const expected = ["id", "English", "Chinese", "English_Nominal", "Chinese_Verb"];
      const missing = expected.filter(field => !headers.includes(field));
      if (missing.length) throw new Error(`Missing CSV fields: ${missing.join(", ")}`);
      const raw = matrix.slice(1).map(values => {
        const record = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
        return {
          id: record.id.trim(),
          source_text: record.English.trim(),
          target_text: record.Chinese.trim(),
          nominal: record.English_Nominal.trim().toLowerCase(),
          targetVerb: record.Chinese_Verb.trim()
        };
      }).filter(row => Object.values(row).every(Boolean));
      corpus = enrichCorpus(raw);
      datasetReady = true;
    }

    function applyLanguage() {
      document.documentElement.dataset.lang = state.lang;
      document.documentElement.lang = state.lang === "zh" ? "zh-Hant" : "en";
      $$("[data-en][data-zh]").forEach(element => {
        const replacement = element.dataset[state.lang] ?? element.dataset.en;
        if (replacement.includes("<")) element.innerHTML = replacement;
        else element.textContent = replacement;
      });
      const languageSelect = $("#langSwitch");
      if (languageSelect) {
        languageSelect.value = state.lang;
        languageSelect.setAttribute("aria-label", state.lang === "zh" ? "介面語言" : "Interface language");
      }
      if ($("#search")) {
        $("#search").placeholder = state.lang === "zh"
          ? "試試：attention、注意、permission…"
          : "Try: attention, 注意, permission...";
      }
      localStorage.setItem("nvatlas-language", state.lang);
      renderAll();
    }

    function setLanguage(lang) {
      state.lang = lang === "zh" ? "zh" : "en";
      applyLanguage();
    }

    function readStateFromUrl() {
      const params = new URLSearchParams(location.search);
      state.query = params.get("q") || "";
      state.category = CATEGORY_ORDER.includes(params.get("category")) ? params.get("category") : "";
      state.checked = ["yes", "no"].includes(params.get("checked")) ? params.get("checked") : "";
      state.hideDuplicates = params.get("duplicates") === "hide";
      state.sort = params.get("sort") || "id";
      state.direction = params.get("direction") === "desc" ? "desc" : "asc";
      state.page = Math.max(1, Number.parseInt(params.get("page") || "1", 10) || 1);
      $("#search").value = state.query;
      $("#categoryFilter").value = state.category;
      $("#checkedFilter").value = state.checked;
      $("#duplicateFilter").value = state.hideDuplicates ? "hide" : "";
    }

    function syncUrl() {
      const params = new URLSearchParams();
      if (state.query) params.set("q", state.query);
      if (state.category) params.set("category", state.category);
      if (state.checked) params.set("checked", state.checked);
      if (state.hideDuplicates) params.set("duplicates", "hide");
      if (state.sort !== "id") params.set("sort", state.sort);
      if (state.direction !== "asc") params.set("direction", state.direction);
      if (state.page > 1) params.set("page", state.page);
      const query = params.toString();
      history.replaceState(null, "", `${location.pathname}${query ? `?${query}` : ""}${location.hash}`);
    }

    function rowMatches(row) {
      if (state.category && row.category !== state.category) return false;
      if (state.checked && row.human_checked !== state.checked) return false;
      if (state.hideDuplicates && row.duplicateCopy) return false;
      const query = state.query.trim().toLocaleLowerCase();
      if (!query) return true;
      return [
        row.id, row.source_text, row.target_text, row.nominal, row.targetVerb, row.category
      ].some(value => String(value).toLocaleLowerCase().includes(query));
    }

    function computeFiltered() {
      filtered = corpus.filter(rowMatches);
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      state.page = Math.min(Math.max(1, state.page), totalPages);
      filtered.sort((a, b) => {
        let left = a[state.sort];
        let right = b[state.sort];
        if (state.sort === "id") {
          left = Number(left);
          right = Number(right);
        } else if (state.sort === "category") {
          left = categoryLabel(a.category);
          right = categoryLabel(b.category);
        }
        const compared = typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right), state.lang === "zh" ? "zh-Hant" : "en", { numeric: true, sensitivity: "base" });
        return state.direction === "asc" ? compared : -compared;
      });
    }

    function categoryLabel(category) {
      return CATEGORIES[category]?.[state.lang] || category;
    }

    function checkedLabel(value) {
      if (value === "yes") return state.lang === "zh" ? "已核對" : "Checked";
      return state.lang === "zh" ? "未核對" : "Not checked";
    }

    function topCounts(rows, getter, limit = Infinity) {
      const counts = new Map();
      rows.forEach(row => {
        const values = getter(row);
        [...new Set(Array.isArray(values) ? values : [values])].filter(Boolean).forEach(value => {
          counts.set(value, (counts.get(value) || 0) + 1);
        });
      });
      return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit);
    }

    function highlightText(value, term) {
      const safe = escapeHtml(value);
      const needle = term.trim();
      if (!needle) return safe;
      return safe.replace(new RegExp(escapeRegExp(needle), "gi"), match => `<mark>${match}</mark>`);
    }

    function selectTerm(term) {
      if (!term) return;
      state.query = term;
      state.page = 1;
      if ($("#search")) $("#search").value = term;
      if (!document.querySelector("#results")) {
        const params = new URLSearchParams();
        if (state.query) params.set("q", state.query);
        if (state.category) params.set("category", state.category);
        if (state.checked) params.set("checked", state.checked);
        if (state.hideDuplicates) params.set("duplicates", "hide");
        window.location.href = `index.html?${params.toString()}#explore`;
        return;
      }
      renderAll();
      $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function updateCategoryOptions() {
      const select = $("#categoryFilter");
      if (!select) return;
      select.innerHTML = `<option value="">${state.lang === "zh" ? "全部類別" : "All categories"}</option>` +
        CATEGORY_ORDER.map(key => `<option value="${key}">${escapeHtml(CATEGORIES[key][state.lang])}</option>`).join("");
      select.value = state.category;
      const checked = $("#checkedFilter");
      checked.innerHTML = state.lang === "zh"
        ? '<option value="">全部核對狀態</option><option value="yes">已核對</option><option value="no">未核對</option>'
        : '<option value="">All review states</option><option value="yes">Checked: yes</option><option value="no">Checked: no</option>';
      checked.value = state.checked;
      const duplicate = $("#duplicateFilter");
      duplicate.innerHTML = state.lang === "zh"
        ? '<option value="">包含重複句對</option><option value="hide">隱藏完全相同句對</option>'
        : '<option value="">Include duplicates</option><option value="hide">Hide exact duplicates</option>';
      duplicate.value = state.hideDuplicates ? "hide" : "";
    }

    function renderSummary() {
      const duplicateRows = corpus.filter(row => row.duplicateCopy).length;
      if ($("#heroTotal")) $("#heroTotal").textContent = corpus.length;
      if ($("#heroNominals")) $("#heroNominals").textContent = new Set(corpus.map(row => row.nominal)).size;
      if ($("#heroChecked")) $("#heroChecked").textContent = corpus.filter(row => row.human_checked === "yes").length;
      if ($("#resultCount")) $("#resultCount").textContent = filtered.length;
      const chips = [];
      if (state.query) chips.push(`${state.lang === "zh" ? "搜尋" : "Search"}: ${escapeHtml(state.query)}`);
      if (state.category) chips.push(categoryLabel(state.category));
      if (state.checked) chips.push(checkedLabel(state.checked));
      if (state.hideDuplicates) chips.push(state.lang === "zh" ? `已隱藏 ${duplicateRows} 列重複資料` : `Duplicate rows hidden: ${duplicateRows}`);
      if (!chips.length) chips.push(state.lang === "zh" ? "顯示全部資料" : "Showing the complete corpus");
      if ($("#activeChips")) $("#activeChips").innerHTML = chips.map(text => `<span class="chip">${text}</span>`).join("");
    }

    function nodeRadius(count) {
      return 5 + Math.sqrt(count) * 2.15;
    }

    function initNetworkPositions(nouns, verbs) {
      const nodes = [];
      const yFor = (index, length) => 40 + (length === 1 ? 220 : (index / (length - 1)) * 440);
      nouns.forEach((node, index) => nodes.push({ ...node, type: "noun", x: 155 + (index % 3) * 9, y: yFor(index, nouns.length), vx: 0, vy: 0 }));
      verbs.forEach((node, index) => nodes.push({ ...node, type: "verb", x: 605 - (index % 3) * 9, y: yFor(index, verbs.length), vx: 0, vy: 0 }));
      return nodes;
    }

    function renderNetwork() {
      const svg = $("#networkSvg");
      if (!svg) return;
      const topN = Number($("#topTerms").value);
      const minimum = Number($("#minWeight").value);
      $("#topTermsValue").textContent = topN;
      $("#minWeightValue").textContent = minimum;
      if (!filtered.length) {
        svg.innerHTML = `<text x="380" y="210" text-anchor="middle" fill="#5c6c76">No matching entries</text>`;
        return;
      }
      const nounEntries = topCounts(filtered, row => row.nominal, Infinity);
      const nouns = nounEntries.slice(0, topN).map(([label, count]) => ({ id: `noun:${label}`, label, count }));
      const nounSet = new Set(nouns.map(node => node.label));
      const linkCounts = new Map();
      filtered.forEach(row => {
        if (!nounSet.has(row.nominal)) return;
        const key = `${row.nominal}\u0000${row.targetVerb}`;
        linkCounts.set(key, (linkCounts.get(key) || 0) + 1);
      });
      const verbCounts = new Map();
      [...linkCounts.entries()].forEach(([key, count]) => {
        const verb = key.split("\u0000")[1];
        verbCounts.set(verb, (verbCounts.get(verb) || 0) + count);
      });
      const verbs = [...verbCounts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, 18)
        .map(([label, count]) => ({ id: `verb:${label}`, label, count }));
      const verbSet = new Set(verbs.map(node => node.label));
      const relevant = [...linkCounts.entries()].filter(([key, count]) => {
        const verb = key.split("\u0000")[1];
        return count >= minimum && verbSet.has(verb);
      });
      if (!relevant.length) {
        svg.innerHTML = `<text x="380" y="210" text-anchor="middle" fill="#5c6c76">No links at this minimum weight · lower the threshold</text>`;
        return;
      }
      const nodes = initNetworkPositions(nouns, verbs);
      const nodeById = new Map(nodes.map(node => [node.id, node]));
      const links = relevant.map(([key, count]) => {
        const [noun, verb] = key.split("\u0000");
        return { source: nodeById.get(`noun:${noun}`), target: nodeById.get(`verb:${verb}`), count };
      }).filter(link => link.source && link.target);

      const lineMarkup = links.map(link => (
        `<line data-source="${escapeHtml(link.source.id)}" data-target="${escapeHtml(link.target.id)}" ` +
        `x1="${link.source.x.toFixed(2)}" y1="${link.source.y.toFixed(2)}" ` +
        `x2="${link.target.x.toFixed(2)}" y2="${link.target.y.toFixed(2)}" ` +
        `stroke="${link.source.label === "attention" ? "#137b78" : "#8ba3ad"}" ` +
        `stroke-opacity="${Math.min(.26 + link.count / 24, .78)}" stroke-width="${Math.min(1 + Math.sqrt(link.count), 6)}">` +
        `<title>${escapeHtml(link.source.label)} → ${escapeHtml(link.target.label)}: ${link.count}</title></line>`
      )).join("");

      const nodeMarkup = nodes.map(node => {
        const color = node.type === "noun" ? "#12344b" : "#137b78";
        const anchor = node.type === "noun" ? "end" : "start";
        const textX = node.type === "noun" ? -nodeRadius(node.count) - 5 : nodeRadius(node.count) + 5;
        return `<g class="graph-node" data-id="${escapeHtml(node.id)}" data-label="${escapeHtml(node.label)}" role="button" tabindex="0" transform="translate(${node.x.toFixed(2)},${node.y.toFixed(2)})">` +
          `<title>${escapeHtml(node.label)}: ${node.count} matching pair${node.count === 1 ? "" : "s"}</title>` +
          `<circle r="${nodeRadius(node.count).toFixed(1)}" fill="${color}"></circle>` +
          `<text x="${textX}" y="4" text-anchor="${anchor}">${escapeHtml(node.label)}</text></g>`;
      }).join("");

      svg.setAttribute("viewBox", "0 0 760 520");
      svg.innerHTML = `<defs><marker id="none"></marker></defs><g id="networkLayer">${lineMarkup}${nodeMarkup}</g>`;
      networkView.nodes = nodes;
      networkView.links = links;
      networkView.layer = $("#networkLayer", svg);
      networkView.svg = svg;
      applyNetworkTransform();
      bindNetworkInteractions();
    }

    function applyNetworkTransform() {
      if (!networkView.layer) return;
      networkView.layer.setAttribute(
        "transform",
        `translate(${networkView.panX} ${networkView.panY}) scale(${networkView.zoom})`
      );
    }

    function bindNetworkInteractions() {
      const svg = networkView.svg;
      if (!svg || svg.dataset.bound === "true") return;
      svg.dataset.bound = "true";
      let dragging = null;
      let dragMoved = false;
      let dragOrigin = null;
      let activePointerId = null;
      let panning = null;

      const toSvgPoint = event => {
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        return point.matrixTransform(networkView.layer.getScreenCTM().inverse());
      };

      svg.addEventListener("pointerdown", event => {
        const nodeElement = event.target.closest(".graph-node");
        if (nodeElement) {
          const id = nodeElement.dataset.id;
          dragging = networkView.nodes.find(node => node.id === id);
          dragMoved = false;
          dragOrigin = toSvgPoint(event);
          activePointerId = event.pointerId;
        } else {
          panning = {
            x: event.clientX,
            y: event.clientY,
            panX: networkView.panX,
            panY: networkView.panY
          };
          svg.setPointerCapture(event.pointerId);
        }
      });

      svg.addEventListener("pointermove", event => {
        if (dragging) {
          const point = toSvgPoint(event);
          if (dragOrigin && Math.hypot(point.x - dragOrigin.x, point.y - dragOrigin.y) > 4) {
            if (activePointerId !== null) svg.setPointerCapture(activePointerId);
            activePointerId = null;
            dragging.x = Math.max(25, Math.min(735, point.x));
            dragging.y = Math.max(20, Math.min(500, point.y));
            dragMoved = true;
            updateNetworkGeometry();
          }
        } else if (panning) {
          networkView.panX = panning.panX + event.clientX - panning.x;
          networkView.panY = panning.panY + event.clientY - panning.y;
          applyNetworkTransform();
        }
      });

      const finishDrag = () => {
        dragging = null;
        dragOrigin = null;
        activePointerId = null;
        panning = null;
      };
      svg.addEventListener("pointerup", finishDrag);
      svg.addEventListener("pointercancel", finishDrag);

      svg.addEventListener("click", event => {
        const node = event.target.closest(".graph-node");
        if (node && !dragMoved) selectTerm(node.dataset.label);
        dragMoved = false;
      });

      svg.addEventListener("keydown", event => {
        const node = event.target.closest(".graph-node");
        if (node && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          selectTerm(node.dataset.label);
        }
      });

      svg.addEventListener("wheel", event => {
        event.preventDefault();
        const previous = networkView.zoom;
        networkView.zoom = Math.max(.5, Math.min(3.2, previous * (event.deltaY < 0 ? 1.12 : .89)));
        if (networkView.zoom !== previous) applyNetworkTransform();
      }, { passive: false });
    }

    function updateNetworkGeometry() {
      if (!networkView.layer) return;
      const positions = new Map(networkView.nodes.map(node => [node.id, node]));
      $$("line", networkView.layer).forEach(line => {
        const source = positions.get(line.dataset.source);
        const target = positions.get(line.dataset.target);
        if (!source || !target) return;
        line.setAttribute("x1", source.x.toFixed(2));
        line.setAttribute("y1", source.y.toFixed(2));
        line.setAttribute("x2", target.x.toFixed(2));
        line.setAttribute("y2", target.y.toFixed(2));
      });
      $$(".graph-node", networkView.layer).forEach(element => {
        const node = positions.get(element.dataset.id);
        if (!node) return;
        element.setAttribute("transform", `translate(${node.x.toFixed(2)},${node.y.toFixed(2)})`);
      });
    }

    function splitTreemap(items, x, y, width, height, output) {
      if (!items.length) return;
      if (items.length === 1) {
        output.push({ ...items[0], x, y, width, height });
        return;
      }
      if (width >= height) {
        const first = [];
        let firstWeight = 0;
        const totalWeight = items.reduce((sum, item) => sum + item.value, 0);
        for (const item of items) {
          if (first.length && firstWeight + item.value / 2 >= totalWeight / 2) break;
          first.push(item);
          firstWeight += item.value;
        }
        if (!first.length) first.push(items[0]);
        const rest = items.slice(first.length);
        const firstWidth = width * (firstWeight / totalWeight);
        splitTreemap(first, x, y, firstWidth, height, output);
        splitTreemap(rest, x + firstWidth, y, width - firstWidth, height, output);
      } else {
        const first = [];
        let firstWeight = 0;
        const totalWeight = items.reduce((sum, item) => sum + item.value, 0);
        for (const item of items) {
          if (first.length && firstWeight + item.value / 2 >= totalWeight / 2) break;
          first.push(item);
          firstWeight += item.value;
        }
        if (!first.length) first.push(items[0]);
        const rest = items.slice(first.length);
        const firstHeight = height * (firstWeight / totalWeight);
        splitTreemap(first, x, y, width, firstHeight, output);
        splitTreemap(rest, x, y + firstHeight, width, height - firstHeight, output);
      }
    }

    function renderTreemap() {
      const svg = $("#treemap");
      if (!svg) return;
      if (!filtered.length) {
        svg.innerHTML = `<text x="380" y="210" text-anchor="middle" fill="#5c6c76">No matching entries</text>`;
        return;
      }
      const categoryGroups = topCounts(filtered, row => row.category, Infinity)
        .sort((a, b) => CATEGORY_ORDER.indexOf(a[0]) - CATEGORY_ORDER.indexOf(b[0]));
      const total = filtered.length;
      const width = 760;
      const height = 420;
      svg.setAttribute("viewBox", "0 0 760 420");
      const labelHeight = 26;
      let currentX = 0;
      const groups = [];
      categoryGroups.forEach(([category, count], index) => {
        const groupWidth = index === categoryGroups.length - 1
          ? width - currentX
          : width * (count / total);
        groups.push({ category, count, x: currentX, width: groupWidth });
        currentX += groupWidth;
      });
      let markup = "";
      groups.forEach(group => {
        const color = CATEGORIES[group.category].color;
        markup += `<g class="tree-group"><rect x="${group.x}" y="0" width="${group.width}" height="${height}" fill="${color}" fill-opacity=".10"></rect>`;
        if (group.width > 95) {
          markup += `<text class="tree-category" x="${group.x + 8}" y="18">${escapeHtml(categoryLabel(group.category))} · ${group.count}</text>`;
        }
        const rows = filtered.filter(row => row.category === group.category);
        const nominals = topCounts(rows, row => row.nominal, Infinity).map(([label, value]) => ({ label, value, category: group.category }));
        const cells = [];
        splitTreemap(nominals, group.x + 3, labelHeight + 3, Math.max(1, group.width - 6), height - labelHeight - 6, cells);
        cells.forEach((cell, index) => {
          const opacity = .72 + (index % 4) * .06;
          const label = cell.width > 72 && cell.height > 24
            ? `<text class="tree-label" x="${cell.x + 6}" y="${cell.y + 15}">${escapeHtml(cell.label.length > Math.max(6, Math.floor(cell.width / 8)) ? `${cell.label.slice(0, Math.max(6, Math.floor(cell.width / 8)))}…` : cell.label)}</text>` +
              (cell.height > 40 ? `<text class="tree-label" x="${cell.x + 6}" y="${cell.y + 29}" fill-opacity=".8">${cell.value}</text>` : "")
            : "";
          markup += `<rect class="tree-cell" data-category="${cell.category}" data-label="${escapeHtml(cell.label)}" ` +
            `x="${cell.x.toFixed(2)}" y="${cell.y.toFixed(2)}" width="${Math.max(1, cell.width).toFixed(2)}" height="${Math.max(1, cell.height).toFixed(2)}" ` +
            `fill="${color}" fill-opacity="${opacity.toFixed(2)}" role="button" tabindex="0">` +
            `<title>${escapeHtml(cell.label)} · ${escapeHtml(categoryLabel(cell.category))}: ${cell.value}</title></rect>${label}`;
        });
        markup += "</g>";
      });
      svg.innerHTML = markup;
      $$(".tree-cell", svg).forEach(cell => {
        cell.addEventListener("click", () => selectTerm(cell.dataset.label));
        cell.addEventListener("keydown", event => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            selectTerm(cell.dataset.label);
          }
        });
      });
    }

    function renderKwic() {
      if (!$("#termSuggestions") || !$("#kwic")) return;
      const suggestions = topCounts(filtered, row => row.nominal, 6);
      $("#termSuggestions").innerHTML = suggestions.map(([term, count]) =>
        `<button class="keyword-button" type="button" data-term="${escapeHtml(term)}">${escapeHtml(term)} · ${count}</button>`
      ).join("");
      $$("#termSuggestions [data-term]").forEach(button => {
        button.addEventListener("click", () => selectTerm(button.dataset.term));
      });
      if (!filtered.length) {
        $("#kwic").innerHTML = `<div class="empty-state">${state.lang === "zh" ? "沒有符合資料。" : "No matching entries."}</div>`;
        return;
      }
      const activeTerm = state.query.trim() || suggestions[0]?.[0] || filtered[0].nominal;
      const matches = filtered
        .filter(row => [row.source_text, row.target_text, row.nominal, row.targetVerb].some(value =>
          value.toLocaleLowerCase().includes(activeTerm.toLocaleLowerCase())
        ))
        .slice(0, 12);
      const entries = matches.length ? matches : filtered.slice(0, 8);
      $("#kwic").innerHTML = entries.map(row => (
        `<article class="kwic-item">` +
          `<div><p class="kwic-text">${highlightText(row.source_text, activeTerm)}</p>` +
          `<p class="kwic-text">${highlightText(row.target_text, activeTerm)}</p></div>` +
          `<button class="keyword-button" type="button" data-term="${escapeHtml(row.nominal)}">${escapeHtml(row.key_term)} → ${escapeHtml(row.target_key_term)}</button>` +
        `</article>`
      )).join("");
      $$("#kwic [data-term]").forEach(button => {
        button.addEventListener("click", () => selectTerm(button.dataset.term));
      });
    }

    function renderTable() {
      if (!$("#corpusRows")) return;
      const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
      const start = (state.page - 1) * PAGE_SIZE;
      const rows = filtered.slice(start, start + PAGE_SIZE);
      $("#corpusRows").innerHTML = rows.map(row => (
        `<tr>` +
          `<td class="id-cell">${escapeHtml(row.id)}</td>` +
          `<td>${escapeHtml(row.source_text)}</td>` +
          `<td>${escapeHtml(row.target_text)}</td>` +
          `<td><span class="badge ${row.category}">${escapeHtml(categoryLabel(row.category))}</span></td>` +
          `<td><button class="term-link" type="button" data-term="${escapeHtml(row.nominal)}">${escapeHtml(row.key_term)}</button> → ` +
          `<button class="term-link" type="button" data-term="${escapeHtml(row.target_key_term)}">${escapeHtml(row.target_key_term)}</button></td>` +
          `<td><span class="badge ${row.human_checked}">${escapeHtml(checkedLabel(row.human_checked))}</span></td>` +
        `</tr>`
      )).join("");
      $$("#corpusRows [data-term]").forEach(button => {
        button.addEventListener("click", () => selectTerm(button.dataset.term));
      });
      $("#pageSummary").textContent = filtered.length
        ? `${start + 1}–${Math.min(start + PAGE_SIZE, filtered.length)} / ${filtered.length}`
        : "0 / 0";
      $("#pageNumber").textContent = `${state.page} / ${totalPages}`;
      $("#prevPage").disabled = state.page <= 1;
      $("#nextPage").disabled = state.page >= totalPages;
      $$("th [data-sort]").forEach(button => {
        const active = button.dataset.sort === state.sort;
        button.textContent = button.dataset.sort === "id" ? "ID" :
          button.dataset.sort === "source_text" ? (state.lang === "zh" ? "英文原文" : "English source") :
          button.dataset.sort === "target_text" ? (state.lang === "zh" ? "中文譯文" : "Chinese target") :
          button.dataset.sort === "category" ? (state.lang === "zh" ? "類別" : "Category") :
          button.dataset.sort === "key_term" ? (state.lang === "zh" ? "名詞 → 動詞" : "Nominal → verb") :
          (state.lang === "zh" ? "人工核對" : "Checked");
        button.setAttribute("aria-sort", active ? (state.direction === "asc" ? "ascending" : "descending") : "none");
        if (active) button.textContent += state.direction === "asc" ? " ↑" : " ↓";
      });
    }

    function renderCategoryOverview() {
      if (!$("#categoryOverview")) return;
      const counts = new Map(topCounts(corpus, row => row.category, Infinity));
      $("#categoryOverview").innerHTML = CATEGORY_ORDER.map(category => {
        const meta = CATEGORIES[category];
        return `<article class="category-card" style="--category-color:${meta.color}">` +
          `<h3>${escapeHtml(meta[state.lang])}</h3>` +
          `<p>${escapeHtml(category === "state" ? (state.lang === "zh" ? meta.summaryZh : meta.summaryEn) :
            state.lang === "zh" ? meta.summaryZh : meta.summaryEn)}</p>` +
          `<div class="count">${counts.get(category) || 0} ${state.lang === "zh" ? "筆" : "entries"}</div></article>`;
      }).join("");
    }

    function findEntry(category, preferred = []) {
      for (const noun of preferred) {
        const record = corpus.find(row => row.category === category && row.nominal === noun);
        if (record) return record;
      }
      return corpus.find(row => row.category === category);
    }

    function exampleMarkup(row) {
      if (!row) return "";
      return `<div class="example-pair">` +
        `<strong>${escapeHtml(row.key_term)} → ${escapeHtml(row.target_key_term)}</strong>` +
        `<span>${escapeHtml(row.source_text)}</span><span>${escapeHtml(row.target_text)}</span>` +
        `<small>ID ${escapeHtml(row.id)}</small></div>`;
    }

    function renderCodebook() {
      if (!$("#codebookCards")) return;
      const preferences = {
        state: ["disappointment", "silence", "pleasure"],
        communicative: ["permission", "explanation", "confession"],
        direct: ["destruction", "discussion", "celebration"],
        recast: ["question", "attention", "permission"]
      };
      $("#codebookCards").innerHTML = CATEGORY_ORDER.map(category => {
        const meta = CATEGORIES[category];
        const example = findEntry(category, preferences[category]);
        return `<article class="panel codebook-card">` +
          `<h3><span style="color:${meta.color}">${escapeHtml(meta[state.lang])}</span></h3>` +
          `<dl>` +
          `<dt>${state.lang === "zh" ? "定義" : "Definition"}</dt><dd>${escapeHtml(state.lang === "zh" ? meta.definitionZh : meta.definitionEn)}</dd>` +
          `<dt>${state.lang === "zh" ? "理論來源" : "Theory source"}</dt><dd>${escapeHtml(state.lang === "zh" ? meta.theoryZh : meta.theoryEn)}</dd>` +
          `<dt>${state.lang === "zh" ? "判定規則" : "Decision rule"}</dt><dd>${escapeHtml(state.lang === "zh" ? meta.ruleZh : meta.ruleEn)}</dd>` +
          `<dt>${state.lang === "zh" ? "正例" : "Positive example"}</dt><dd>${exampleMarkup(example)}</dd>` +
          `<dt>${state.lang === "zh" ? "反例" : "Negative example"}</dt><dd>${escapeHtml(state.lang === "zh" ? meta.negativeZh : meta.negativeEn)}</dd>` +
          `<dt>${state.lang === "zh" ? "邊界個案" : "Boundary case"}</dt><dd>${escapeHtml(state.lang === "zh" ? meta.boundaryZh : meta.boundaryEn)}</dd>` +
          `</dl></article>`;
      }).join("");
    }

    function renderReportChart() {
      if (!$("#reportChart")) return;
      const counts = new Map(topCounts(filtered, row => row.category, Infinity));
      const total = Math.max(1, filtered.length);
      $("#reportChart").innerHTML =
        `<div style="display:flex;justify-content:space-between;gap:1rem;font-size:.8rem;color:var(--muted)"><strong>${state.lang === "zh" ? "目前篩選的類別分布" : "Category distribution in the current view"}</strong><span>${filtered.length} ${state.lang === "zh" ? "筆" : "rows"}</span></div>` +
        CATEGORY_ORDER.map(category => {
          const count = counts.get(category) || 0;
          return `<button class="report-bar" type="button" data-category="${category}">` +
            `<span>${escapeHtml(CATEGORIES[category][state.lang])}</span>` +
            `<span class="report-bar-track"><span class="report-bar-fill" style="display:block;width:${(count / total * 100).toFixed(2)}%;background:${CATEGORIES[category].color}"></span></span>` +
            `<strong>${count}</strong></button>`;
        }).join("");
      $$("#reportChart [data-category]").forEach(button => {
        button.addEventListener("click", () => {
          state.category = button.dataset.category;
          state.page = 1;
          location.hash = "explore";
          renderAll();
        });
      });
    }

    function renderAll() {
      if (!datasetReady) return;
      computeFiltered();
      updateCategoryOptions();
      renderSummary();
      renderNetwork();
      renderTreemap();
      renderKwic();
      renderTable();
      renderCategoryOverview();
      renderCodebook();
      renderReportChart();
      syncUrl();
    }

    function exportFilteredCsv() {
      const fields = [
        "id", "source_text", "target_text", "source", "category", "human_checked",
        "unit", "key_term", "target_key_term", "notes", "duplicate"
      ];
      const csvEscape = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [fields.map(csvEscape).join(",")]
        .concat(filtered.map(row => fields.map(field => csvEscape(row[field])).join(",")))
        .join("\r\n");
      const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "nvatlas-filtered-corpus.csv";
      link.click();
      URL.revokeObjectURL(url);
    }

    function stableHash(value) {
      let hash = 2166136261;
      for (let index = 0; index < value.length; index += 1) {
        hash ^= value.charCodeAt(index);
        hash = Math.imul(hash, 16777619);
      }
      return hash >>> 0;
    }

    function exportReviewQueue() {
      const sample = [...corpus]
        .sort((a, b) => stableHash(`2026:${a.id}`) - stableHash(`2026:${b.id}`))
        .slice(0, 50);
      const fields = [
        "review_rank", "id", "source_text", "target_text", "source",
        "category", "human_checked", "key_term", "target_key_term", "verification_note"
      ];
      const csvEscape = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
      const csv = [fields.map(csvEscape).join(",")]
        .concat(sample.map((row, index) => {
          const value = { ...row, review_rank: index + 1, verification_note: "" };
          return fields.map(field => csvEscape(value[field])).join(",");
        }))
        .join("\r\n");
      const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "nvatlas-review-sample-seed-2026.csv";
      link.click();
      URL.revokeObjectURL(url);
    }

    async function copyViewLink() {
      const button = $("#shareView");
      const original = button.innerHTML;
      try {
        await navigator.clipboard.writeText(location.href);
        button.textContent = state.lang === "zh" ? "已複製" : "Copied";
      } catch {
        button.textContent = state.lang === "zh" ? "複製網址列" : "Copy from address bar";
      }
      setTimeout(() => { button.innerHTML = original; }, 1800);
    }

    function bindUi() {
      const bind = (selector, eventName, handler) => {
        const element = $(selector);
        if (element) element.addEventListener(eventName, handler);
      };
      const activePage = location.pathname.split("/").pop() || "index.html";
      $$("nav a").forEach(link => {
        const targetPage = link.getAttribute("href").split("#")[0];
        if (activePage !== "index.html" && targetPage === activePage) link.classList.add("active");
        if (activePage === "index.html" && link.getAttribute("href") === `index.html${location.hash || "#explore"}`) {
          link.classList.add("active");
        }
      });
      bind("#langSwitch", "change", event => setLanguage(event.target.value));
      bind("#search", "input", event => {
        state.query = event.target.value;
        state.page = 1;
        renderAll();
      });
      bind("#categoryFilter", "change", event => {
        state.category = event.target.value;
        state.page = 1;
        renderAll();
      });
      bind("#checkedFilter", "change", event => {
        state.checked = event.target.value;
        state.page = 1;
        renderAll();
      });
      bind("#duplicateFilter", "change", event => {
        state.hideDuplicates = event.target.value === "hide";
        state.page = 1;
        renderAll();
      });
      bind("#clearFilters", "click", () => {
        state.query = "";
        state.category = "";
        state.checked = "";
        state.hideDuplicates = false;
        state.page = 1;
        if ($("#search")) $("#search").value = "";
        renderAll();
      });
      bind("#shareView", "click", copyViewLink);
      bind("#exportCsv", "click", exportFilteredCsv);
      bind("#reviewExport", "click", exportReviewQueue);
      bind("#topTerms", "input", renderNetwork);
      bind("#minWeight", "input", renderNetwork);
      bind("#resetNetwork", "click", () => {
        networkView.zoom = 1;
        networkView.panX = 0;
        networkView.panY = 0;
        applyNetworkTransform();
      });
      bind("#prevPage", "click", () => {
        state.page = Math.max(1, state.page - 1);
        renderAll();
        $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      bind("#nextPage", "click", () => {
        const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
        state.page = Math.min(totalPages, state.page + 1);
        renderAll();
        $("#results").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      $$("th [data-sort]").forEach(button => {
        button.addEventListener("click", () => {
          const field = button.dataset.sort;
          if (state.sort === field) state.direction = state.direction === "asc" ? "desc" : "asc";
          else {
            state.sort = field;
            state.direction = "asc";
          }
          state.page = 1;
          renderAll();
        });
      });
    }

    async function init() {
      state.lang = localStorage.getItem("nvatlas-language") === "zh" ? "zh" : "en";
      bindUi();
      try {
        await loadCorpus();
        readStateFromUrl();
        applyLanguage();
      } catch (error) {
        console.error(error);
        const message = `<div class="error"><strong>Could not load the corpus.</strong><br>${escapeHtml(error.message)}</div>`;
        $("#explore .wrap").insertAdjacentHTML("afterbegin", message);
      }
    }

    init();
