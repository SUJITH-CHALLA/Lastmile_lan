import { useState, useEffect, useRef, useCallback } from "react";

const Y = "#FACC15";
const BK = "#0a0a0a";
const mono = "'IBM Plex Mono', 'Courier New', monospace";

// ── Change model name here if needed (e.g. "qwen-3-32b")
const CEREBRAS_MODEL = "qwen-3-235b";
const CEREBRAS_URL = "https://api.cerebras.ai/v1/chat/completions";

const SYSTEM_PROMPT = `You are LASTMILE AI — an expert resume analyst and professional resume writer.

Analyze the resume text provided and return ONLY a valid JSON object (no markdown, no backticks, no preamble) with this exact structure:

{
  "meta": {
    "name": "full name",
    "title": "job title",
    "email": "email or null",
    "phone": "phone or null",
    "location": "location or null",
    "linkedin": "linkedin or null",
    "original_score": <integer 0-100 honest score>,
    "optimized_score": <integer 0-100 post-fix score>
  },
  "logs": [
    { "id": 1, "type": "info|ok|warn|err", "msg": "specific log message", "section": "section_key or null" }
  ],
  "sections": [
    {
      "key": "summary|skills|exp_0|exp_1|education|certifications|additional",
      "label": "SECTION DISPLAY NAME",
      "status": "optimized|valid|flagged",
      "original_lines": ["original text lines exactly as in resume"],
      "removed_lines": ["bad lines that should be removed"],
      "added_lines": ["new improved lines to add"],
      "fixed_lines": ["final optimized lines for this section"],
      "issues": [
        { "severity": "critical|high|medium|low", "problem": "exact problem found", "fix": "what was done to fix it" }
      ]
    }
  ],
  "final_resume": {
    "header": { "name": "", "title": "", "contact": "" },
    "sections": [
      { "label": "SECTION NAME", "content_lines": ["line1", "line2"] }
    ]
  }
}

RULES:
1. Generate 25-40 specific log entries walking through each section
2. Flag ALL issues: duplicates, role mismatches, weak verbs, missing metrics, broken grammar, generic content
3. Work experience: ALL bullets must use strong action verbs + quantified metrics. Add bullets if fewer than 4 per role
4. Replace any bullets misaligned with the job title
5. Deduplicate and group skills into Technical / Tools / Soft Skills
6. Rewrite summary: 3-4 lines, punchy, role-aligned
7. original_score must honestly reflect issues found
8. section keys for experience must be exp_0, exp_1, exp_2 etc.
9. Return ONLY the JSON. Absolutely nothing else.`;

export default function ResumeAnalyzer() {
  const [phase, setPhase] = useState("setup"); // setup | upload | processing | animating | complete
  const [apiKey, setApiKey] = useState("");
  const [apiKeySet, setApiKeySet] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [revealedSections, setRevealedSections] = useState(new Set());
  const [tab, setTab] = useState("live");
  const [error, setError] = useState(null);
  const logsRef = useRef(null);
  const logIndexRef = useRef(0);

  useEffect(() => {
    if (logsRef.current) logsRef.current.scrollTop = logsRef.current.scrollHeight;
  }, [logs]);

  const ts = () => new Date().toLocaleTimeString("en", { hour12: false });

  const handleTextFile = useCallback((file) => {
    if (!file) return;
    setError(null);
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => setResumeText(e.target.result);
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "text/plain" || file.name.endsWith(".txt"))) {
      handleTextFile(file);
    } else {
      setError("For Cerebras/Qwen3 (text model), please upload a .txt file or paste your resume text below.");
    }
  }, [handleTextFile]);

  const runAnalysis = async () => {
    if (!resumeText.trim()) return;
    setPhase("processing");
    setError(null);
    setLogs([{ id: 0, type: "info", msg: "Connecting to Cerebras API...", ts: ts() }]);
    setProgress(5);

    try {
      setLogs(p => [...p, { id: 1, type: "info", msg: `Sending to ${CEREBRAS_MODEL}...`, ts: ts() }]);
      setProgress(15);

      const response = await fetch(CEREBRAS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: CEREBRAS_MODEL,
          max_tokens: 8000,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: `Analyze this resume and return the JSON:\n\n${resumeText}` }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error?.message || `HTTP ${response.status}`);
      }

      setProgress(65);
      setLogs(p => [...p, { id: 2, type: "info", msg: "Response received — parsing output...", ts: ts() }]);

      const data = await response.json();
      const raw = data.choices?.[0]?.message?.content?.trim() || "";
      const clean = raw.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);

      setAiData(parsed);
      setProgress(70);
      startLogAnimation(parsed);
    } catch (err) {
      setError("Analysis failed: " + err.message);
      setPhase("upload");
      setProgress(0);
    }
  };

  const startLogAnimation = (data) => {
    setPhase("animating");
    const allLogs = data.logs || [];
    logIndexRef.current = 0;
    setLogs([{ id: -1, type: "ok", msg: "Cerebras inference complete — replaying audit log...", ts: ts() }]);

    const interval = setInterval(() => {
      const i = logIndexRef.current;
      if (i >= allLogs.length) {
        clearInterval(interval);
        setProgress(100);
        setPhase("complete");
        setActiveSection(null);
        return;
      }
      const log = allLogs[i];
      setLogs(p => [...p, { ...log, ts: ts() }]);
      if (log.section) setActiveSection(log.section);
      if (log.type === "ok" && log.section) setRevealedSections(p => new Set([...p, log.section]));
      setProgress(70 + Math.round((i / allLogs.length) * 30));
      logIndexRef.current++;
    }, 360);
  };

  const reset = () => {
    setPhase("upload"); setResumeText(""); setFileName(null); setAiData(null);
    setLogs([]); setProgress(0); setActiveSection(null);
    setRevealedSections(new Set()); setTab("live"); setError(null);
  };

  // ── DIFF LINE ─────────────────────────────────────────────────────────────
  const DLine = ({ type, text }) => {
    const s = {
      removed: { bg: "#fee2e2", col: "#991b1b", border: "#ef4444", tag: "−", dec: "line-through" },
      added: { bg: "#dcfce7", col: "#14532d", border: "#22c55e", tag: "+", dec: "none" },
      keep: { bg: "transparent", col: "#374151", border: "transparent", tag: null, dec: "none" },
    }[type];
    return (
      <div style={{ display: "flex", gap: 6, alignItems: "flex-start", background: s.bg, borderLeft: `3px solid ${s.border}`, padding: "3px 8px", marginBottom: 3 }}>
        {s.tag && <span style={{ background: s.border, color: "#fff", fontSize: "9px", fontWeight: 700, padding: "0 4px", flexShrink: 0 }}>{s.tag}</span>}
        <span style={{ fontSize: "10px", color: s.col, textDecoration: s.dec, lineHeight: 1.5 }}>{text}</span>
      </div>
    );
  };

  const SectionBox = ({ secKey, label, status, children }) => {
    const scanning = activeSection === secKey;
    return (
      <div style={{
        padding: "14px 18px", borderBottom: "1px solid #e5e7eb",
        background: scanning ? "#fffbeb" : "#fff",
        boxShadow: scanning ? `inset 3px 0 0 ${Y}` : "none",
        outline: scanning ? `2px solid ${Y}` : "none",
        outlineOffset: "-2px", position: "relative", transition: "all 0.25s"
      }}>
        {scanning && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${Y},transparent)`, animation: "beam 1.2s infinite" }} />}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: BK }}>{label}</span>
          {scanning && <span style={{ background: Y, color: BK, fontSize: "7px", fontWeight: 700, padding: "1px 6px", letterSpacing: "1px" }}>◉ SCANNING</span>}
          {!scanning && revealedSections.has(secKey) && status === "valid" && <span style={{ background: "#22c55e", color: "#fff", fontSize: "7px", fontWeight: 700, padding: "1px 5px" }}>✓ VALID</span>}
          {!scanning && revealedSections.has(secKey) && status === "optimized" && <span style={{ background: "#22c55e", color: "#fff", fontSize: "7px", fontWeight: 700, padding: "1px 5px" }}>✓ OPTIMIZED</span>}
          {!scanning && revealedSections.has(secKey) && status === "flagged" && <span style={{ background: "#ef4444", color: "#fff", fontSize: "7px", fontWeight: 700, padding: "1px 5px" }}>⚠ FIXED</span>}
        </div>
        {children}
      </div>
    );
  };

  // ── LIVE DIFF VIEW ────────────────────────────────────────────────────────
  const liveView = () => {
    if (!aiData) return <div style={{ textAlign: "center", padding: 60, color: "#9ca3af", fontSize: "11px" }}>Paste your resume and start analysis.</div>;
    const { meta, sections } = aiData;
    return (
      <div style={{ border: `3px solid ${BK}`, background: "#fff" }}>
        <div style={{ background: BK, padding: "18px 22px", textAlign: "center" }}>
          <div style={{ color: Y, fontSize: "20px", fontWeight: 700, letterSpacing: "4px" }}>{meta.name}</div>
          <div style={{ color: "#fff", fontSize: "10px", letterSpacing: "4px", marginTop: 3 }}>{meta.title}</div>
          <div style={{ color: "#9ca3af", fontSize: "9px", marginTop: 5 }}>
            {[meta.email, meta.phone, meta.location, meta.linkedin].filter(Boolean).join(" | ")}
          </div>
        </div>
        {(sections || []).map(sec => (
          <SectionBox key={sec.key} secKey={sec.key} label={sec.label} status={sec.status}>
            {revealedSections.has(sec.key) ? (
              <>
                {(sec.removed_lines || []).map((l, i) => <DLine key={`r${i}`} type="removed" text={l} />)}
                {(sec.added_lines || []).map((l, i) => <DLine key={`a${i}`} type="added" text={l} />)}
                {(sec.fixed_lines || [])
                  .filter(l => !(sec.removed_lines || []).includes(l) && !(sec.added_lines || []).includes(l))
                  .map((l, i) => <DLine key={`k${i}`} type="keep" text={l} />)}
              </>
            ) : (
              (sec.original_lines || []).map((l, i) => (
                <div key={i} style={{ fontSize: "10px", color: "#374151", marginBottom: 4, lineHeight: 1.6 }}>{l}</div>
              ))
            )}
          </SectionBox>
        ))}
      </div>
    );
  };

  // ── FLAW REPORT ───────────────────────────────────────────────────────────
  const reportView = () => {
    if (!aiData) return <div style={{ textAlign: "center", padding: 60, color: "#9ca3af", fontSize: "11px" }}>Run analysis to see flaw report.</div>;
    const { meta, sections } = aiData;
    const allIssues = sections.flatMap(s => (s.issues || []).map(iss => ({ ...iss, section: s.label })));
    const sevCols = { critical: "#ef4444", high: "#f97316", medium: "#fbbf24", low: "#94a3b8" };
    return (
      <div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
          {[
            { label: "ORIGINAL SCORE", val: meta.original_score, col: meta.original_score < 60 ? "#ef4444" : "#f97316" },
            { label: "OPTIMIZED SCORE", val: meta.optimized_score, col: "#22c55e" },
            { label: "ISSUES FOUND", val: allIssues.length, col: "#f97316" },
            { label: "SECTIONS FIXED", val: sections.filter(s => s.status !== "valid").length, col: "#22c55e" },
          ].map(c => (
            <div key={c.label} style={{ flex: "1 1 120px", background: "#fff", border: `3px solid ${BK}`, padding: "12px 14px" }}>
              <div style={{ fontSize: "7px", color: "#9ca3af", letterSpacing: "2px", marginBottom: 4 }}>{c.label}</div>
              <div style={{ fontSize: "30px", fontWeight: 700, color: c.col, lineHeight: 1 }}>{c.val}</div>
            </div>
          ))}
        </div>
        <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: BK, marginBottom: 10 }}>DETECTED ISSUES & CORRECTIONS</div>
        {allIssues.length === 0 && <div style={{ fontSize: "10px", color: "#6b7280", padding: 16 }}>No major issues detected.</div>}
        {allIssues.map((f, i) => (
          <div key={i} style={{ border: `2px solid ${sevCols[f.severity] || "#94a3b8"}`, padding: "10px 14px", marginBottom: 8, background: "#fff" }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <span style={{ background: sevCols[f.severity] || "#94a3b8", color: "#fff", fontSize: "8px", fontWeight: 700, padding: "1px 6px", letterSpacing: "1px" }}>{(f.severity || "low").toUpperCase()}</span>
              <span style={{ fontSize: "9px", color: "#6b7280", letterSpacing: "1px" }}>{f.section}</span>
            </div>
            <div style={{ fontSize: "10px", color: "#991b1b", marginBottom: 4 }}>⚠ {f.problem}</div>
            <div style={{ fontSize: "10px", color: "#14532d" }}>✓ {f.fix}</div>
          </div>
        ))}
      </div>
    );
  };

  // ── FINAL RESUME ──────────────────────────────────────────────────────────
  const finalView = () => {
    if (phase !== "complete") return <div style={{ textAlign: "center", padding: 60, color: "#9ca3af", fontSize: "11px" }}>Run analysis first to generate the optimized resume.</div>;
    const { final_resume, meta } = aiData;
    return (
      <div style={{ border: `3px solid ${BK}`, background: "#fff", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ background: BK, padding: "18px 22px", textAlign: "center" }}>
          <div style={{ color: Y, fontSize: "20px", fontWeight: 700, letterSpacing: "4px" }}>{final_resume?.header?.name || meta.name}</div>
          <div style={{ color: "#fff", fontSize: "10px", letterSpacing: "4px", marginTop: 3 }}>{final_resume?.header?.title || meta.title}</div>
          <div style={{ color: "#9ca3af", fontSize: "9px", marginTop: 5 }}>{final_resume?.header?.contact || [meta.email, meta.phone, meta.location].filter(Boolean).join(" | ")}</div>
        </div>
        {(final_resume?.sections || []).map((sec, idx) => (
          <div key={idx} style={{ padding: "14px 18px", borderBottom: "1px solid #f0ede8" }}>
            <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: BK, marginBottom: 8, borderBottom: `1px solid ${BK}`, paddingBottom: 4 }}>{sec.label}</div>
            {(sec.content_lines || []).map((line, i) => (
              <div key={i} style={{ fontSize: "10px", color: "#374151", lineHeight: 1.7, marginBottom: 3 }}>{line}</div>
            ))}
          </div>
        ))}
        <div style={{ padding: "12px 18px", background: "#f9fafb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "8px", color: "#9ca3af", letterSpacing: "2px" }}>GENERATED BY LASTMILE AI ENGINE V2  ·  {CEREBRAS_MODEL.toUpperCase()}</span>
          <button onClick={() => window.print()} style={{ background: Y, color: BK, border: `2px solid ${BK}`, padding: "8px 18px", fontSize: "9px", fontWeight: 700, letterSpacing: "2px", cursor: "pointer" }}>
            ↓ DOWNLOAD PDF
          </button>
        </div>
      </div>
    );
  };

  // ── API KEY SETUP SCREEN ──────────────────────────────────────────────────
  if (phase === "setup") return (
    <div style={{ fontFamily: mono, background: "#f0ede8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap'); ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#444}`}</style>
      <div style={{ background: BK, borderBottom: `3px solid ${Y}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: Y, fontWeight: 700, fontSize: "14px", letterSpacing: "3px" }}>LASTMILE</span>
        <span style={{ background: Y, color: BK, fontSize: "8px", fontWeight: 700, padding: "2px 8px", letterSpacing: "2px" }}>EVOLUTION 2.1</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "#6b7280", fontSize: "8px", letterSpacing: "2px" }}>POWERED BY CEREBRAS · {CEREBRAS_MODEL}</span>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
        <div style={{ maxWidth: 420, width: "100%" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ fontSize: "11px", color: "#9ca3af", letterSpacing: "3px", marginBottom: 8 }}>CEREBRAS API SETUP</div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "3px", color: BK }}>ENTER API KEY</div>
          </div>
          <div style={{ background: "#111", border: `3px solid ${Y}`, padding: "20px", marginBottom: 16 }}>
            <div style={{ fontSize: "8px", color: "#6b7280", letterSpacing: "2px", marginBottom: 8 }}>CEREBRAS API KEY</div>
            <input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="csk-..."
              style={{ width: "100%", background: "#1f1f1f", border: `2px solid ${apiKey ? Y : "#374151"}`, color: "#fff", padding: "10px 12px", fontSize: "11px", fontFamily: mono, boxSizing: "border-box", outline: "none" }}
            />
            <div style={{ fontSize: "8px", color: "#374151", marginTop: 8 }}>Get your key at cloud.cerebras.ai → API Keys</div>
          </div>
          {error && <div style={{ background: "#fee2e2", border: "2px solid #ef4444", padding: "10px", fontSize: "9px", color: "#991b1b", marginBottom: 12 }}>{error}</div>}
          <button
            onClick={() => { if (apiKey.trim()) { setApiKeySet(true); setPhase("upload"); } else setError("Please enter a valid API key."); }}
            style={{ width: "100%", background: apiKey ? Y : "#e5e7eb", color: apiKey ? BK : "#9ca3af", border: `3px solid ${apiKey ? BK : "#e5e7eb"}`, padding: "14px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", cursor: apiKey ? "pointer" : "not-allowed" }}
          >
            ▶ INITIALIZE ENGINE
          </button>
        </div>
      </div>
    </div>
  );

  // ── UPLOAD / PASTE SCREEN ─────────────────────────────────────────────────
  if (phase === "upload") return (
    <div style={{ fontFamily: mono, background: "#f0ede8", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap'); @keyframes beam{0%,100%{opacity:0;left:-100%}50%{opacity:1;left:0}} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#444}`}</style>
      <div style={{ background: BK, borderBottom: `3px solid ${Y}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: Y, fontWeight: 700, fontSize: "14px", letterSpacing: "3px" }}>LASTMILE</span>
        <span style={{ background: Y, color: BK, fontSize: "8px", fontWeight: 700, padding: "2px 8px", letterSpacing: "2px" }}>EVOLUTION 2.1</span>
        <span style={{ flex: 1 }} />
        <span style={{ color: "#4ade80", fontSize: "8px", letterSpacing: "2px" }}>● KEY LOADED · {CEREBRAS_MODEL}</span>
        <button onClick={() => setPhase("setup")} style={{ background: "transparent", color: "#6b7280", border: "1px solid #374151", padding: "3px 8px", fontSize: "8px", cursor: "pointer", marginLeft: 10 }}>CHANGE KEY</button>
      </div>
      <div style={{ flex: 1, display: "flex", gap: 0, overflow: "hidden" }}>
        {/* Left — drop zone */}
        <div style={{ width: 280, borderRight: `3px solid ${BK}`, padding: 24, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: BK }}>UPLOAD .TXT FILE</div>
          <div
            onDrop={onDrop} onDragOver={e => e.preventDefault()}
            onClick={() => document.getElementById("fi").click()}
            style={{ border: `3px dashed ${fileName ? Y : BK}`, background: fileName ? "#fffbeb" : "#fff", padding: "24px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.2s" }}
          >
            <input id="fi" type="file" accept=".txt,text/plain" style={{ display: "none" }} onChange={e => handleTextFile(e.target.files[0])} />
            {fileName ? (
              <>
                <div style={{ fontSize: "20px", marginBottom: 6 }}>✓</div>
                <div style={{ fontSize: "9px", fontWeight: 700, color: Y }}>{fileName}</div>
              </>
            ) : (
              <>
                <div style={{ fontSize: "24px", marginBottom: 6 }}>⬆</div>
                <div style={{ fontSize: "9px", color: "#9ca3af" }}>Drop .txt resume<br />or click to browse</div>
              </>
            )}
          </div>
          <div style={{ fontSize: "8px", color: "#9ca3af", textAlign: "center", letterSpacing: "1px" }}>— OR PASTE BELOW —</div>
        </div>

        {/* Right — paste area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, gap: 16 }}>
          <div style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "3px", color: BK }}>PASTE RESUME TEXT</div>
          <textarea
            value={resumeText}
            onChange={e => setResumeText(e.target.value)}
            placeholder={"Paste your resume here — any format, any role...\n\nJohn Doe\nSoftware Engineer\njohn@email.com | +1 555 0000 | New York\n\nPROFESSIONAL SUMMARY\n..."}
            style={{ flex: 1, background: "#fff", border: `3px solid ${resumeText ? Y : BK}`, padding: "14px 16px", fontSize: "10px", fontFamily: mono, color: "#374151", resize: "none", outline: "none", lineHeight: 1.7, transition: "border-color 0.2s" }}
          />
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ fontSize: "9px", color: "#9ca3af" }}>{resumeText.length > 0 ? `${resumeText.split(/\s+/).filter(Boolean).length} words` : "No text yet"}</div>
            <span style={{ flex: 1 }} />
            {error && <div style={{ background: "#fee2e2", border: "2px solid #ef4444", padding: "8px 12px", fontSize: "9px", color: "#991b1b" }}>{error}</div>}
            <button
              onClick={runAnalysis}
              disabled={!resumeText.trim()}
              style={{ background: resumeText.trim() ? Y : "#e5e7eb", color: resumeText.trim() ? BK : "#9ca3af", border: `3px solid ${resumeText.trim() ? BK : "#e5e7eb"}`, padding: "14px 32px", fontSize: "11px", fontWeight: 700, letterSpacing: "3px", cursor: resumeText.trim() ? "pointer" : "not-allowed" }}
            >
              ▶ INITIATE NEURAL ANALYSIS
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── MAIN ANALYZER VIEW ────────────────────────────────────────────────────
  const flawCount = aiData ? aiData.sections.flatMap(s => s.issues || []).length : 0;

  return (
    <div style={{ fontFamily: mono, background: "#f0ede8", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap'); @keyframes beam{0%,100%{opacity:0;left:-100%}50%{opacity:1;left:0}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}} ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#444}`}</style>

      <div style={{ background: BK, borderBottom: `3px solid ${Y}`, padding: "9px 18px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <span style={{ color: Y, fontWeight: 700, fontSize: "14px", letterSpacing: "3px" }}>LASTMILE</span>
        <span style={{ background: Y, color: BK, fontSize: "8px", fontWeight: 700, padding: "2px 8px", letterSpacing: "2px" }}>EVOLUTION 2.1</span>
        <span style={{ background: "#1f1f1f", color: "#4ade80", fontSize: "8px", fontWeight: 700, padding: "2px 8px", letterSpacing: "1px" }}>{CEREBRAS_MODEL}</span>
        <span style={{ flex: 1 }} />
        {aiData && <span style={{ color: Y, fontSize: "10px", fontWeight: 700 }}>{aiData.meta.name}</span>}
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: (phase === "animating" || phase === "processing") ? "#22c55e" : "#374151", display: "inline-block", boxShadow: (phase === "animating" || phase === "processing") ? "0 0 8px #22c55e" : "none", animation: (phase === "animating" || phase === "processing") ? "pulse 1s infinite" : "none" }} />
        <span style={{ color: "#6b7280", fontSize: "9px", letterSpacing: "1px" }}>
          {phase === "processing" ? "CALLING CEREBRAS API..." : phase === "animating" ? "ANALYZING NEURAL PATHWAYS..." : "ANALYSIS COMPLETE"}
        </span>
        {phase === "complete" && aiData && <span style={{ background: "#22c55e", color: "#fff", fontSize: "9px", fontWeight: 700, padding: "2px 10px" }}>SCORE: {aiData.meta.optimized_score}/100</span>}
        <button onClick={reset} style={{ background: "transparent", color: "#6b7280", border: "1px solid #374151", padding: "4px 10px", fontSize: "8px", cursor: "pointer" }}>✕ NEW</button>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <div style={{ width: 300, flexShrink: 0, background: BK, borderRight: `3px solid ${Y}`, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ background: "#111", borderBottom: "2px solid #1f1f1f", padding: "9px 14px", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: Y }} />
            <span style={{ color: Y, fontSize: "9px", fontWeight: 700, letterSpacing: "3px" }}>AI NEURAL LOGS</span>
          </div>
          <div ref={logsRef} style={{ flex: 1, overflowY: "auto", padding: "6px 0" }}>
            {logs.map((l, idx) => {
              const col = l.type === "err" ? "#f87171" : l.type === "warn" ? "#fbbf24" : l.type === "ok" ? "#4ade80" : "#6b7280";
              return (
                <div key={idx} style={{ padding: "3px 12px", fontSize: "9px", color: col, borderLeft: `2px solid ${l.type === "err" ? "#ef4444" : l.type === "warn" ? "#fbbf24" : l.type === "ok" ? "#22c55e" : "transparent"}`, display: "flex", gap: 6, lineHeight: 1.5 }}>
                  <span style={{ color: "#374151", fontSize: "7px", flexShrink: 0, marginTop: 2 }}>{l.ts}</span>
                  <span>▶ {l.msg}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ display: "flex", borderBottom: `3px solid ${BK}`, background: "#e8e4de", flexShrink: 0 }}>
            {[["live", "LIVE DIFF VIEW"], ["report", "FLAW REPORT"], ["final", "FINAL RESUME"]].map(([id, label]) => (
              <button key={id} onClick={() => setTab(id)} style={{ padding: "10px 16px", fontSize: "8px", fontWeight: 700, letterSpacing: "2px", cursor: "pointer", background: tab === id ? Y : "transparent", color: tab === id ? BK : "#6b7280", border: "none", borderRight: `2px solid ${BK}` }}>
                {label}
                {id === "report" && flawCount > 0 && <span style={{ background: "#ef4444", color: "#fff", fontSize: "7px", fontWeight: 700, padding: "0 4px", marginLeft: 5 }}>{flawCount}</span>}
              </button>
            ))}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
            {tab === "live" && liveView()}
            {tab === "report" && reportView()}
            {tab === "final" && finalView()}
          </div>
        </div>
      </div>

      <div style={{ background: BK, borderTop: `3px solid ${Y}`, padding: "9px 18px", display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
        <span style={{ color: "#6b7280", fontSize: "8px", letterSpacing: "2px", minWidth: 120 }}>
          {phase === "processing" ? "UPLOADING..." : phase === "animating" ? "ANALYZING..." : phase === "complete" ? "COMPLETE" : "STANDBY"}
        </span>
        <div style={{ flex: 1, height: 5, background: "#222" }}>
          <div style={{ height: "100%", width: `${progress}%`, background: Y, transition: "width 0.35s" }} />
        </div>
        <span style={{ color: Y, fontWeight: 700, fontSize: "12px", minWidth: 38, textAlign: "right" }}>{progress}%</span>
      </div>
    </div>
  );
}