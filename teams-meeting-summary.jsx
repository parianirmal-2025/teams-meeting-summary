import { useState, useRef } from "react";

const COLORS = {
  ink: "#1a1a2e",
  navy: "#16213e",
  teal: "#0f3460",
  accent: "#e94560",
  gold: "#f5a623",
  sage: "#52b788",
  sky: "#4cc9f0",
  chalk: "#f8f9fa",
  mist: "#e8edf2",
  slate: "#6c757d",
};

const fonts = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
`;

const styles = `
  ${fonts}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body { background: #f0f4f8; font-family: 'DM Sans', sans-serif; }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%);
    padding: 2rem 1rem;
    position: relative;
    overflow: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    top: -40%;
    right: -20%;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(76,201,240,0.08) 0%, transparent 70%);
    pointer-events: none;
  }

  .app::after {
    content: '';
    position: fixed;
    bottom: -30%;
    left: -15%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(233,69,96,0.06) 0%, transparent 70%);
    pointer-events: none;
  }

  .container {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 2.5rem;
    animation: fadeDown 0.7s ease both;
  }

  .header-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(76,201,240,0.12);
    border: 1px solid rgba(76,201,240,0.25);
    color: #4cc9f0;
    padding: 0.35rem 1rem;
    border-radius: 50px;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }

  .header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 900;
    color: #f8f9fa;
    line-height: 1.1;
    margin-bottom: 0.5rem;
  }

  .header h1 span {
    color: #e94560;
  }

  .header p {
    color: rgba(248,249,250,0.55);
    font-size: 0.95rem;
    font-weight: 300;
  }

  /* Input Card */
  .input-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    padding: 2rem;
    margin-bottom: 1.5rem;
    backdrop-filter: blur(10px);
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .field-label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: rgba(248,249,250,0.5);
    margin-bottom: 0.6rem;
  }

  .field-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }

  @media (max-width: 600px) {
    .field-row { grid-template-columns: 1fr; }
  }

  .field-group { margin-bottom: 1.2rem; }

  input[type="text"], input[type="date"], select {
    width: 100%;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 10px;
    color: #f8f9fa;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    padding: 0.75rem 1rem;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  input[type="text"]::placeholder { color: rgba(248,249,250,0.25); }

  input[type="text"]:focus, input[type="date"]:focus, select:focus {
    border-color: #4cc9f0;
    background: rgba(76,201,240,0.08);
  }

  select option { background: #16213e; color: #f8f9fa; }

  textarea {
    width: 100%;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 12px;
    color: #f8f9fa;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.93rem;
    line-height: 1.6;
    padding: 1rem;
    resize: vertical;
    min-height: 180px;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }

  textarea::placeholder { color: rgba(248,249,250,0.22); }

  textarea:focus {
    border-color: #4cc9f0;
    background: rgba(76,201,240,0.06);
  }

  .char-hint {
    text-align: right;
    font-size: 0.72rem;
    color: rgba(248,249,250,0.3);
    margin-top: 0.3rem;
    font-family: 'DM Mono', monospace;
  }

  /* Participants */
  .participants-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    margin-bottom: 0.8rem;
  }

  .participant-chip {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    background: rgba(82,183,136,0.15);
    border: 1px solid rgba(82,183,136,0.3);
    color: #52b788;
    border-radius: 50px;
    padding: 0.3rem 0.8rem;
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s;
  }

  .participant-chip:hover { background: rgba(82,183,136,0.25); }

  .participant-chip .remove { color: rgba(82,183,136,0.6); font-size: 1rem; line-height: 1; }

  .add-participant {
    display: flex;
    gap: 0.6rem;
  }

  .add-participant input { flex: 1; }

  .btn-add {
    background: rgba(82,183,136,0.2);
    border: 1px solid rgba(82,183,136,0.35);
    color: #52b788;
    border-radius: 10px;
    padding: 0.75rem 1.2rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.88rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }

  .btn-add:hover { background: rgba(82,183,136,0.32); }

  /* Generate Button */
  .btn-generate {
    width: 100%;
    background: linear-gradient(135deg, #e94560, #c1121f);
    border: none;
    border-radius: 14px;
    color: #fff;
    font-family: 'DM Sans', sans-serif;
    font-size: 1rem;
    font-weight: 600;
    padding: 1rem 2rem;
    cursor: pointer;
    letter-spacing: 0.03em;
    transition: transform 0.15s, box-shadow 0.15s, opacity 0.2s;
    box-shadow: 0 4px 24px rgba(233,69,96,0.35);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .btn-generate:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(233,69,96,0.45);
  }

  .btn-generate:disabled { opacity: 0.6; cursor: not-allowed; }

  /* Loading */
  .loading-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 2.5rem;
  }

  .spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(76,201,240,0.15);
    border-top-color: #4cc9f0;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  .loading-wrap p { color: rgba(248,249,250,0.5); font-size: 0.9rem; }

  /* Summary Output */
  .summary-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 20px;
    overflow: hidden;
    animation: fadeUp 0.5s ease both;
    margin-top: 1.5rem;
  }

  .summary-header {
    background: linear-gradient(135deg, rgba(233,69,96,0.18), rgba(76,201,240,0.1));
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding: 1.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: gap;
  }

  .summary-header-left { display: flex; flex-direction: column; gap: 0.25rem; }

  .summary-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.35rem;
    font-weight: 700;
    color: #f8f9fa;
  }

  .summary-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .meta-tag {
    font-size: 0.75rem;
    color: rgba(248,249,250,0.45);
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .meta-tag strong { color: rgba(248,249,250,0.7); }

  .btn-copy {
    background: rgba(76,201,240,0.12);
    border: 1px solid rgba(76,201,240,0.25);
    color: #4cc9f0;
    border-radius: 10px;
    padding: 0.55rem 1.1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .btn-copy:hover { background: rgba(76,201,240,0.22); }

  .summary-body {
    padding: 1.5rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  /* Sections */
  .section {
    border-radius: 12px;
    overflow: hidden;
  }

  .section-title {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    padding: 0.6rem 1rem;
    border-radius: 8px 8px 0 0;
  }

  .section-content {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.07);
    border-top: none;
    border-radius: 0 0 12px 12px;
    padding: 1rem 1.2rem;
    color: rgba(248,249,250,0.82);
    font-size: 0.93rem;
    line-height: 1.75;
    white-space: pre-wrap;
  }

  .section-content ul { padding-left: 1.2rem; }
  .section-content li { margin-bottom: 0.4rem; }

  .section-overview .section-title { background: rgba(76,201,240,0.13); color: #4cc9f0; }
  .section-topics .section-title { background: rgba(82,183,136,0.13); color: #52b788; }
  .section-homework .section-title { background: rgba(245,166,35,0.13); color: #f5a623; }
  .section-actions .section-title { background: rgba(233,69,96,0.13); color: #e94560; }
  .section-notes .section-title { background: rgba(167,139,250,0.13); color: #a78bfa; }

  .icon { font-size: 1rem; }

  /* Animations */
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .divider {
    height: 1px;
    background: rgba(255,255,255,0.07);
    margin: 0.5rem 0;
  }
`;

const SUBJECTS = ["Mathematics", "Science", "English", "History", "Geography", "Art", "Music", "Physical Education", "Computer Science", "Other"];
const LEVELS = ["Primary School", "Middle School", "High School", "University / College"];

function parseSummary(text) {
  const sections = {};
  const patterns = {
    overview: /(?:##?\s*)?(?:session overview|overview|summary)[:\s]*([\s\S]*?)(?=##?\s*(?:topics|key topics|homework|action|teacher|$))/i,
    topics: /(?:##?\s*)?(?:topics covered|key topics|learning objectives?)[:\s]*([\s\S]*?)(?=##?\s*(?:homework|assignment|action|teacher|notes|$))/i,
    homework: /(?:##?\s*)?(?:homework|assignments?|tasks?)[:\s]*([\s\S]*?)(?=##?\s*(?:action|teacher|notes|next|$))/i,
    actions: /(?:##?\s*)?(?:action items?|next steps?|follow-up)[:\s]*([\s\S]*?)(?=##?\s*(?:teacher|notes|additional|$))/i,
    notes: /(?:##?\s*)?(?:teacher notes?|additional notes?|notes?)[:\s]*([\s\S]*?)$/i,
  };

  for (const [key, pattern] of Object.entries(patterns)) {
    const match = text.match(pattern);
    if (match) sections[key] = match[1].trim();
  }

  if (!Object.keys(sections).length) {
    sections.overview = text;
  }

  return sections;
}

export default function App() {
  const [subject, setSubject] = useState("");
  const [level, setLevel] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [teacher, setTeacher] = useState("");
  const [participantInput, setParticipantInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [meta, setMeta] = useState(null);
  const [copied, setCopied] = useState(false);
  const participantRef = useRef();

  const addParticipant = () => {
    const val = participantInput.trim();
    if (val && !participants.includes(val)) {
      setParticipants(p => [...p, val]);
      setParticipantInput("");
    }
  };

  const removeParticipant = (p) => setParticipants(prev => prev.filter(x => x !== p));

  const handleGenerate = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    setSummary(null);

    const context = [
      subject && `Subject: ${subject}`,
      level && `Level: ${level}`,
      date && `Date: ${date}`,
      duration && `Duration: ${duration} minutes`,
      teacher && `Teacher: ${teacher}`,
      participants.length && `Students/Attendees: ${participants.join(", ")}`,
    ].filter(Boolean).join("\n");

    const prompt = `You are an expert educational assistant. Analyze the following Microsoft Teams meeting transcript from a classroom/educational session and produce a structured summary.

${context ? `Meeting Context:\n${context}\n` : ""}
Transcript:
${transcript}

Generate a well-structured summary using EXACTLY these section headings (include them verbatim):

## Session Overview
Write 2-3 sentences summarising the overall session purpose and outcome.

## Topics Covered
List all key topics, concepts, or lessons discussed. Use bullet points.

## Homework & Assignments
List all homework, assignments, or tasks given to students. If none mentioned, write "No homework assigned."

## Action Items
List follow-up tasks for teacher and students separately. Use bullet points.

## Teacher Notes
Include any important observations, student engagement notes, or recommendations for future sessions.

Keep the tone professional, concise, and educational. Be specific and practical.`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setSummary(parseSummary(text));
      setMeta({ subject, level, date, duration, teacher, students: participants.length });
    } catch (e) {
      setSummary({ overview: "Error generating summary. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    const text = Object.entries(summary)
      .map(([k, v]) => `${k.toUpperCase()}\n${v}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="container">
          {/* Header */}
          <div className="header">
            <div className="header-badge">
              <span>🎓</span> Educational Summary Tool
            </div>
            <h1>Teams Meeting <span>Summary</span></h1>
            <p>Paste your transcript · Get a structured classroom report instantly</p>
          </div>

          {/* Input Card */}
          <div className="input-card">
            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Subject</label>
                <select value={subject} onChange={e => setSubject(e.target.value)}>
                  <option value="">Select subject…</option>
                  {SUBJECTS.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="field-group">
                <label className="field-label">Level</label>
                <select value={level} onChange={e => setLevel(e.target.value)}>
                  <option value="">Select level…</option>
                  {LEVELS.map(l => <option key={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label">Session Date</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="field-group">
                <label className="field-label">Duration (minutes)</label>
                <input type="text" placeholder="e.g. 60" value={duration} onChange={e => setDuration(e.target.value)} />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Teacher / Host Name</label>
              <input type="text" placeholder="e.g. Ms. Johnson" value={teacher} onChange={e => setTeacher(e.target.value)} />
            </div>

            <div className="field-group">
              <label className="field-label">Participants</label>
              {participants.length > 0 && (
                <div className="participants-row">
                  {participants.map(p => (
                    <span key={p} className="participant-chip" onClick={() => removeParticipant(p)}>
                      {p} <span className="remove">×</span>
                    </span>
                  ))}
                </div>
              )}
              <div className="add-participant">
                <input
                  ref={participantRef}
                  type="text"
                  placeholder="Add student name…"
                  value={participantInput}
                  onChange={e => setParticipantInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addParticipant()}
                />
                <button className="btn-add" onClick={addParticipant}>+ Add</button>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Meeting Transcript</label>
              <textarea
                placeholder="Paste your Microsoft Teams meeting transcript here…&#10;&#10;Example:&#10;Teacher: Good morning everyone! Today we'll be covering the water cycle…&#10;Student: Can you explain evaporation again?&#10;Teacher: Of course! Evaporation is when liquid water turns into water vapor…"
                value={transcript}
                onChange={e => setTranscript(e.target.value)}
              />
              <div className="char-hint">{transcript.length} characters</div>
            </div>
          </div>

          {/* Generate Button */}
          <button
            className="btn-generate"
            onClick={handleGenerate}
            disabled={loading || !transcript.trim()}
          >
            {loading ? (
              <>✦ Generating Summary…</>
            ) : (
              <>✦ Generate Classroom Summary</>
            )}
          </button>

          {/* Loading */}
          {loading && (
            <div className="input-card" style={{ marginTop: "1.5rem" }}>
              <div className="loading-wrap">
                <div className="spinner" />
                <p>Analysing your session transcript…</p>
              </div>
            </div>
          )}

          {/* Summary Output */}
          {summary && !loading && (
            <div className="summary-card">
              <div className="summary-header">
                <div className="summary-header-left">
                  <h2>📋 Session Summary</h2>
                  <div className="summary-meta">
                    {meta?.subject && <span className="meta-tag">📚 <strong>{meta.subject}</strong></span>}
                    {meta?.level && <span className="meta-tag">🎓 <strong>{meta.level}</strong></span>}
                    {meta?.date && <span className="meta-tag">📅 <strong>{meta.date}</strong></span>}
                    {meta?.duration && <span className="meta-tag">⏱ <strong>{meta.duration} min</strong></span>}
                    {meta?.teacher && <span className="meta-tag">👩‍🏫 <strong>{meta.teacher}</strong></span>}
                    {meta?.students > 0 && <span className="meta-tag">👥 <strong>{meta.students} students</strong></span>}
                  </div>
                </div>
                <button className="btn-copy" onClick={handleCopy}>
                  {copied ? "✓ Copied!" : "⎘ Copy"}
                </button>
              </div>

              <div className="summary-body">
                {summary.overview && (
                  <div className="section section-overview">
                    <div className="section-title"><span className="icon">🔵</span> Session Overview</div>
                    <div className="section-content">{summary.overview}</div>
                  </div>
                )}
                {summary.topics && (
                  <div className="section section-topics">
                    <div className="section-title"><span className="icon">📗</span> Topics Covered</div>
                    <div className="section-content">{summary.topics}</div>
                  </div>
                )}
                {summary.homework && (
                  <div className="section section-homework">
                    <div className="section-title"><span className="icon">📝</span> Homework & Assignments</div>
                    <div className="section-content">{summary.homework}</div>
                  </div>
                )}
                {summary.actions && (
                  <div className="section section-actions">
                    <div className="section-title"><span className="icon">✅</span> Action Items</div>
                    <div className="section-content">{summary.actions}</div>
                  </div>
                )}
                {summary.notes && (
                  <div className="section section-notes">
                    <div className="section-title"><span className="icon">🔖</span> Teacher Notes</div>
                    <div className="section-content">{summary.notes}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
