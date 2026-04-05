"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import i18n from "@/i18n/instance";
import styles from "../page.module.css";

type ShapeId =
  | "trapezoid"
  | "parallelogram"
  | "rectangle"
  | "oval"
  | "square"
  | "circle";

const DEFAULT_ORDER: ShapeId[] = [
  "square",
  "circle",
  "oval",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

function rotateLeft(ids: ShapeId[]): ShapeId[] {
  if (ids.length === 0) return ids;
  return [...ids.slice(1), ids[0]];
}

function rotateRight(ids: ShapeId[]): ShapeId[] {
  if (ids.length === 0) return ids;
  return [ids[ids.length - 1], ...ids.slice(0, -1)];
}

function shuffleOrder(ids: ShapeId[]): ShapeId[] {
  const copy = [...ids];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function ShapeGraphic({
  id,
}: {
  id: ShapeId;
}) {
  const inner = useMemo(() => {
    switch (id) {
      case "trapezoid":
        return <div className={`${styles.trapezoid} ${styles.shapeFill}`} />;
      case "parallelogram":
        return (
          <div className={`${styles.parallelogram} ${styles.shapeFill}`} />
        );
      case "rectangle":
        return <div className={`${styles.rectangle} ${styles.shapeFill}`} />;
      case "oval":
        return <div className={`${styles.oval} ${styles.shapeFill}`} />;
      case "square":
        return <div className={`${styles.square} ${styles.shapeFill}`} />;
      case "circle":
        return <div className={`${styles.circle} ${styles.shapeFill}`} />;
      default:
        return null;
    }
  }, [id]);

  return (
    <div className={`${styles.shapeCardInner} ${styles.shapeFill}`}>
      {inner}
    </div>
  );
}

function useI18nRerender() {
  const [, tick] = useReducer((n: number) => n + 1, 0);
  useEffect(() => {
    const handler = () => tick();
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);
  return useCallback((key: string) => String(i18n.t(key)), []);
}

function Triangle({
  dir,
  inline,
}: {
  dir: "left" | "right" | "up" | "down";
  inline?: boolean;
}) {
  const triangleDirClass =
    dir === "left"
      ? styles.triangleDirLeft
      : dir === "up"
        ? styles.triangleDirUp
        : dir === "right"
          ? styles.triangleDirRight
          : styles.triangleDirDown;

  const core = (
    <div
      className={`${styles.triangleRotate} ${triangleDirClass} ${styles.shapeFill}`}
    >
      <div className={styles.triangle} />
    </div>
  );

  if (inline) return core;
  return <div className={styles.shapeCardInner}>{core}</div>;
}

export default function LayoutClient() {
  const t = useI18nRerender();
  const [order, setOrder] = useState<ShapeId[]>(DEFAULT_ORDER);
  const [lang, setLang] = useState(() => i18n.language);
  const [bottomRowsStaggerSwapped, setBottomRowsStaggerSwapped] =
    useState(false);

  const row1 = order.slice(0, 3);
  const row2 = order.slice(3, 6);

  const firstShapeRowClass = bottomRowsStaggerSwapped
    ? styles.gridRowStart
    : styles.gridRowEnd;
  const secondShapeRowClass = bottomRowsStaggerSwapped
    ? styles.gridRowEnd
    : styles.gridRowStart;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{t("title")}</h1>
        <select
          className={styles.langSelect}
          value={lang}
          onChange={(e) => {
            const nextLang = e.target.value;
            void i18n.changeLanguage(nextLang);
            setLang(nextLang);
          }}
        >
          <option value="en">{t("langEn")}</option>
          <option value="th">{t("langTh")}</option>
        </select>
      </header>

      <div className={styles.mainBox}>
        <section className={styles.controlsSection} aria-label="Controls">
          <div className={styles.controlsGrid}>
            <button
              type="button"
              className={`${styles.shapeCard} ${styles.controlCard1}`}
              onClick={() => setOrder((o) => rotateLeft(o))}
            >
              <div className={styles.shapeCardBody}>
                <Triangle dir="left" />
              </div>
            </button>
            <button
              type="button"
              className={`${styles.shapeCard} ${styles.controlCardUD}`}
              onClick={() => setBottomRowsStaggerSwapped((prev) => !prev)}
            >
              <div className={styles.shapeCardBody}>
                <div className={styles.dualTriangles}>
                  <Triangle dir="up" inline />
                  <Triangle dir="down" inline />
                </div>
              </div>
            </button>
            <button
              type="button"
              className={`${styles.shapeCard} ${styles.controlCard4}`}
              onClick={() => setOrder((o) => rotateRight(o))}
            >
              <div className={styles.shapeCardBody}>
                <Triangle dir="right" />
              </div>
            </button>

            <div className={styles.pillCell1}>
              <button
                type="button"
                className={styles.pill}
                onClick={() => setOrder((o) => rotateLeft(o))}
              >
                {t("moveShapeLeft")}
              </button>
            </div>
            <div className={styles.pillCellMid}>
              <button
                type="button"
                className={styles.pill}
                onClick={() => setBottomRowsStaggerSwapped((prev) => !prev)}
              >
                {t("movePosition")}
              </button>
            </div>
            <div className={styles.pillCell4}>
              <button
                type="button"
                className={styles.pill}
                onClick={() => setOrder((o) => rotateRight(o))}
              >
                {t("moveShapeRight")}
              </button>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        <div className={styles.gridWrap}>
          <div className={`${styles.gridRow} ${styles.gridRowTop} ${firstShapeRowClass}`}>
            {row1.map((id, index) => (
              <button
                type="button"
                className={styles.gridCell}
                key={`${id}-r1-${index}`}
                onClick={() => setOrder((o) => shuffleOrder(o))}
              >
                <div className={styles.gridCard}>
                  <div className={styles.gridCardBody}>
                    <ShapeGraphic id={id} />
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div
            className={`${styles.gridRow} ${styles.gridRowBottom} ${secondShapeRowClass}`}
          >
            {row2.map((id, index) => (
              <button
                type="button"
                className={styles.gridCell}
                key={`${id}-r2-${index}`}
                onClick={() => setOrder((o) => shuffleOrder(o))}
              >
                <div className={styles.gridCard}>
                  <div className={styles.gridCardBody}>
                    <ShapeGraphic id={id} />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
