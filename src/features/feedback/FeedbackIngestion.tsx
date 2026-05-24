"use client";

import React, { useState, useRef } from "react";
import { Upload, X, ArrowUp, Tag as TagIcon, Sparkles, Target, Activity, BrainCircuit, CheckSquare, Paperclip, AlertCircle } from "lucide-react";
import styles from "./FeedbackIngestion.module.css";

const PREDEFINED_TAGS = ["Slack", "Interview", "Support", "Feature Idea", "Note"];

interface AnalysisData {
  problems: string[];
  themes: string[];
  pain_points: string[];
  quotes: string[];
}

interface StrategyData {
  top_problem: string;
  priority: string;
  reasoning: string;
  ranked_problems: string[];
}

interface ThinkingData {
  why_this_matters: string;
  risk_of_inaction: string;
  tradeoffs: string[];
  alternatives: string[];
}

interface EvaluateData {
  clarity_score: number;
  issues: string[];
  suggestions: string[];
}

export function FeedbackIngestion() {
  const [text, setText] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isStrategizing, setIsStrategizing] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const [analysisResult, setAnalysisResult] = useState<AnalysisData | null>(null);
  const [strategyResult, setStrategyResult] = useState<StrategyData | null>(null);
  const [thinkingResult, setThinkingResult] = useState<ThinkingData | null>(null);
  const [evaluateResult, setEvaluateResult] = useState<EvaluateData | null>(null);

  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTagToggle = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() && files.length === 0) return;
    setIsSubmitting(true);
    setError(null);
    setAnalysisResult(null);
    setStrategyResult(null);
    setThinkingResult(null);
    setEvaluateResult(null);
    try {
      const res = await fetch("/api/v1/feedback/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: text, tags: selectedTags }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setAnalysisResult(json.data);
        setText("");
        setSelectedTags([]);
        setFiles([]);
      } else {
        console.error("Analysis Failed:", json.error);
        setError(json.error || "Failed to analyze feedback. Please try again.");
      }
    } catch (err) {
      console.error("Failed to submit feedback", err);
      setError("Failed to submit feedback. Check your network connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStrategize = async () => {
    if (!analysisResult) return;
    setIsStrategizing(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/strategy/prioritize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ insights: analysisResult }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setStrategyResult(json.data);
      } else {
        console.error("Strategize Failed:", json.error);
        setError(json.error || "Failed to prioritize feedback. Please try again.");
      }
    } catch (err) {
      console.error("Failed to generate strategy", err);
      setError("Failed to prioritize feedback. Check your network connection.");
    } finally {
      setIsStrategizing(false);
    }
  };

  const handleDeepThinking = async () => {
    if (!strategyResult) return;
    setIsThinking(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/strategy/deep-thinking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy: strategyResult, insights: analysisResult }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setThinkingResult(json.data);
      } else {
        console.error("Deep Thinking Failed:", json.error);
        setError(json.error || "Deep product thinking generation failed. Please try again.");
      }
    } catch (err) {
      console.error("Failed to generate deep thinking", err);
      setError("Failed to generate deep product thinking. Check your network connection.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleEvaluate = async () => {
    if (!strategyResult || !thinkingResult) return;
    setIsEvaluating(true);
    setError(null);
    try {
      const res = await fetch("/api/v1/strategy/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ strategy: strategyResult, thinking: thinkingResult }),
      });
      const json = await res.json();
      if (res.ok && json.data) {
        setEvaluateResult(json.data);
      } else {
        console.error("Evaluate Failed:", json.error);
        setError(json.error || "Friction/Clarity evaluation failed. Please try again.");
      }
    } catch (err) {
      console.error("Failed to evaluate clarity", err);
      setError("Failed to evaluate clarity. Check your network connection.");
    } finally {
      setIsEvaluating(false);
    }
  };

  const isLoading = isSubmitting || isStrategizing || isThinking || isEvaluating;

  const getPriorityClass = (p: string) => {
    const lp = p.toLowerCase();
    if (lp.includes("high")) return styles.priorityHigh;
    if (lp.includes("medium")) return styles.priorityMedium;
    return styles.priorityLow;
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>
          <Sparkles size={11} />
          Feedback Ingestion
        </p>
        <h2 className={styles.title}>Drop product signals</h2>
        <p className={styles.subtitle}>
          Paste raw customer feedback, interview notes, Slack messages — anything. No structure needed.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className={styles.errorBanner} role="alert">
          <AlertCircle size={16} style={{ flexShrink: 0 }} />
          <span>{error}</span>
          <button
            type="button"
            className={styles.errorBannerClose}
            onClick={() => setError(null)}
            aria-label="Close error message"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        {/* Mimir-style glow input card */}
        <div className={styles.inputCard}>
          <div className={styles.inputInner}>
            <textarea
              className={styles.textarea}
              placeholder="Paste a transcript, slack message, or random idea..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              disabled={isLoading}
              rows={6}
            />
            <div className={styles.toolbar}>
              <div className={styles.toolbarLeft}>
                <button
                  type="button"
                  className={styles.toolbarBtn}
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading}
                >
                  <Paperclip size={13} />
                  Attach file
                </button>
                <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className={styles.hiddenInput}
                />
              </div>

              <button
                type="submit"
                aria-label="Analyze feedback"
                disabled={isLoading || (!text.trim() && files.length === 0)}
                className={`${styles.submitBtn} ${(text.trim() || files.length > 0) && !isLoading ? styles.submitBtnActive : ""}`}
              >
                {isSubmitting
                  ? <span style={{ fontSize: 10, fontWeight: 700 }}>…</span>
                  : <ArrowUp size={15} />}
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className={styles.tagsSection}>
          <p className={styles.tagsLabel}>
            <TagIcon size={11} />
            Context tags (optional)
          </p>
          <div className={styles.tagsRow}>
            {PREDEFINED_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`${styles.tag} ${selectedTags.includes(tag) ? styles.tagActive : ""}`}
                disabled={isLoading}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Attached files */}
        {files.length > 0 && (
          <div className={styles.fileList}>
            {files.map((file, idx) => (
              <div key={`${file.name}-${idx}`} className={styles.fileItem}>
                <span>{file.name}</span>
                <button
                  type="button"
                  className={styles.removeFile}
                  onClick={() => removeFile(idx)}
                  disabled={isLoading}
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </form>

      {/* ── Results pipeline ── */}
      {analysisResult && (
        <>
          <div className={styles.divider} />

          {/* Step 1: Extraction */}
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>
              <Sparkles size={15} style={{ color: "#6366f1" }} />
              AI Extraction
            </div>
            {!strategyResult && (
              <button
                onClick={handleStrategize}
                disabled={isStrategizing}
                className={`${styles.pipelineBtn} ${styles.pipelineBtnIndigo}`}
              >
                {isStrategizing ? "Prioritizing…" : "Prioritize & Strategize"}
                {!isStrategizing && <Target size={12} />}
              </button>
            )}
          </div>

          <div className={styles.resultsGrid}>
            <div className={styles.resultCard}>
              <p className={styles.resultCardLabel}>Key Problems</p>
              <ul className={styles.resultList}>
                {analysisResult.problems.map((p, i) => <li key={i}>{p}</li>)}
                {!analysisResult.problems.length && <li style={{ opacity: 0.5 }}>None extracted</li>}
              </ul>
            </div>
            <div className={styles.resultCard}>
              <p className={styles.resultCardLabel}>Repeated Themes</p>
              <ul className={styles.resultList}>
                {analysisResult.themes.map((t, i) => <li key={i}>{t}</li>)}
                {!analysisResult.themes.length && <li style={{ opacity: 0.5 }}>None extracted</li>}
              </ul>
            </div>
            <div className={styles.resultCard}>
              <p className={styles.resultCardLabel}>User Pain Points</p>
              <ul className={styles.resultList}>
                {analysisResult.pain_points.map((p, i) => <li key={i}>{p}</li>)}
                {!analysisResult.pain_points.length && <li style={{ opacity: 0.5 }}>None extracted</li>}
              </ul>
            </div>
            <div className={styles.resultCard}>
              <p className={styles.resultCardLabel}>Notable Quotes</p>
              {analysisResult.quotes.map((q, i) => (
                <div key={i} className={styles.quoteItem}>"{q}"</div>
              ))}
              {!analysisResult.quotes.length && <span style={{ opacity: 0.5, fontSize: 13 }}>None extracted</span>}
            </div>
          </div>

          {/* Step 2: Strategy */}
          {strategyResult && (
            <div className={styles.strategyBlock}>
              <div className={styles.sectionHeader} style={{ marginBottom: 14 }}>
                <div className={styles.sectionTitle} style={{ color: "#6366f1" }}>
                  <Target size={15} />
                  Strategic Priorities
                </div>
                {!thinkingResult && (
                  <button
                    onClick={handleDeepThinking}
                    disabled={isThinking}
                    className={`${styles.pipelineBtn} ${styles.pipelineBtnGreen}`}
                  >
                    {isThinking ? "Thinking…" : "Deep Product Thinking"}
                    {!isThinking && <BrainCircuit size={12} />}
                  </button>
                )}
              </div>

              <div className={styles.strategyTopRow}>
                <div>
                  <p className={styles.strategyLabel}>
                    <Activity size={11} style={{ display: "inline", marginRight: 4, verticalAlign: "middle" }} />
                    Top Ranked Problem
                  </p>
                  <h3 className={styles.strategyProblem}>{strategyResult.top_problem}</h3>
                </div>
                <div className={`${styles.priorityBadge} ${getPriorityClass(strategyResult.priority)}`}>
                  {strategyResult.priority}
                </div>
              </div>

              <p className={styles.reasoningBox}>
                <strong>Reasoning:</strong> {strategyResult.reasoning}
              </p>

              {strategyResult.ranked_problems?.length > 1 && (
                <>
                  <p className={styles.resultCardLabel} style={{ marginBottom: 8 }}>Full Ranked List</p>
                  <ol className={styles.resultList} style={{ listStyleType: "decimal", paddingLeft: 20 }}>
                    {strategyResult.ranked_problems.map((p, i) => <li key={i}>{p}</li>)}
                  </ol>
                </>
              )}
            </div>
          )}

          {/* Step 3: Deep Thinking */}
          {thinkingResult && (
            <div className={styles.thinkingBlock}>
              <div className={styles.sectionHeader} style={{ marginBottom: 14 }}>
                <div className={styles.sectionTitle} style={{ color: "#059669" }}>
                  <BrainCircuit size={15} />
                  Deep Product Thinking
                </div>
                {!evaluateResult && (
                  <button
                    onClick={handleEvaluate}
                    disabled={isEvaluating}
                    className={`${styles.pipelineBtn} ${styles.pipelineBtnAmber}`}
                  >
                    {isEvaluating ? "Evaluating…" : "Evaluate Clarity"}
                    {!isEvaluating && <CheckSquare size={12} />}
                  </button>
                )}
              </div>

              <div className={styles.thinkingGrid}>
                <div className={styles.thinkingCard}>
                  <p className={styles.thinkingCardLabel}>Why This Matters</p>
                  <p className={styles.thinkingCardText}>{thinkingResult.why_this_matters}</p>
                </div>
                <div className={styles.thinkingCard}>
                  <p className={styles.thinkingCardLabel}>Risk of Inaction</p>
                  <p className={styles.thinkingCardText}>{thinkingResult.risk_of_inaction}</p>
                </div>
                <div className={styles.thinkingCard}>
                  <p className={styles.thinkingCardLabel}>Trade-offs</p>
                  <ul className={styles.resultList}>
                    {thinkingResult.tradeoffs.map((t, i) => <li key={i}>{t}</li>)}
                    {!thinkingResult.tradeoffs.length && <li style={{ opacity: 0.5 }}>None identified</li>}
                  </ul>
                </div>
                <div className={styles.thinkingCard}>
                  <p className={styles.thinkingCardLabel}>Alternative Solutions</p>
                  <ul className={styles.resultList}>
                    {thinkingResult.alternatives.map((a, i) => <li key={i}>{a}</li>)}
                    {!thinkingResult.alternatives.length && <li style={{ opacity: 0.5 }}>None identified</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Clarity Evaluation */}
          {evaluateResult && (
            <div className={styles.evaluateBlock}>
              <div className={styles.sectionHeader} style={{ marginBottom: 14 }}>
                <div className={styles.sectionTitle} style={{ color: "#d97706" }}>
                  <CheckSquare size={15} />
                  Problem Definition Clarity
                </div>
              </div>

              <div className={styles.scoreRow}>
                <div className={styles.scoreCircle}>{evaluateResult.clarity_score}</div>
                <div className={styles.scoreText}>
                  <span className={styles.scoreTextLabel}>Overall Score / 10</span>
                  <span className={styles.scoreTextDesc}>
                    {evaluateResult.clarity_score >= 8
                      ? "✓ Ready for PRD Generation"
                      : "Needs refinement before PRD"}
                  </span>
                </div>
              </div>

              <div className={styles.evaluateGrid}>
                <div className={styles.evaluateCard}>
                  <p className={styles.evaluateCardLabel}>Identified Issues</p>
                  <ul className={styles.resultList}>
                    {evaluateResult.issues.map((issue, i) => <li key={i}>{issue}</li>)}
                    {!evaluateResult.issues.length && <li style={{ opacity: 0.5 }}>No issues found</li>}
                  </ul>
                </div>
                <div className={styles.evaluateCard}>
                  <p className={styles.evaluateCardLabel}>Suggestions</p>
                  <ul className={styles.resultList}>
                    {evaluateResult.suggestions.map((s, i) => <li key={i}>{s}</li>)}
                    {!evaluateResult.suggestions.length && <li style={{ opacity: 0.5 }}>None needed</li>}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
