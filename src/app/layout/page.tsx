"use client";

import { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import { Card, Col, ConfigProvider, Row, Select } from "antd";
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

function ShapeGraphic({ id, fillGrid }: { id: ShapeId; fillGrid?: boolean }) {
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

const triangleDirClass: Record<
  "left" | "right" | "up" | "down",
  string
> = {
  left: styles.triangleDirLeft,
  up: styles.triangleDirUp,
  right: styles.triangleDirRight,
  down: styles.triangleDirDown,
};

function Triangle({
  dir,
  inline,
}: {
  dir: "left" | "right" | "up" | "down";
  inline?: boolean;
}) {
  const core = (
    <div
      className={`${styles.triangleRotate} ${triangleDirClass[dir]} ${styles.shapeFill}`}
    >
      <div className={styles.triangle} />
    </div>
  );
  if (inline) return core;
  return <div className={styles.shapeCardInner}>{core}</div>;
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

export default function LayoutPage() {
  const t = useI18nRerender();
  const [order, setOrder] = useState<ShapeId[]>(DEFAULT_ORDER);
  const [lang, setLang] = useState(() => i18n.language);
  /** กดปุ่มขึ้น–ลง: สลับว่าแถวแรก/แถวสองของกริดล่างจะชิดขวาหรือชิดซ้าย */
  const [bottomRowsStaggerSwapped, setBottomRowsStaggerSwapped] =
    useState(false);

  const row1 = order.slice(0, 3);
  const row2 = order.slice(3, 6);

  const firstShapeRowJustify = bottomRowsStaggerSwapped ? "start" : "end";
  const secondShapeRowJustify = bottomRowsStaggerSwapped ? "end" : "start";

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#ffffff",
          borderRadiusLG: 14,
        },
      }}
    >
      <div className={styles.page}>
        <header className={styles.header}>
          <h1 className={styles.title}>{t("title")}</h1>
          <Select
            className={styles.langSelect}
            value={lang}
            popupMatchSelectWidth={false}
            options={[
              { value: "en", label: t("langEn") },
              { value: "th", label: t("langTh") },
            ]}
            onChange={(v) => {
              void i18n.changeLanguage(v);
              setLang(v);
            }}
          />
        </header>

        <div className={styles.mainBox}>
        <section className={styles.controlsSection} aria-label="Controls">
          <div className={styles.controlsGrid}>
            <Card
              className={`${styles.shapeCard} ${styles.controlCard1}`}
              variant="borderless"
              onClick={() => setOrder((o) => rotateLeft(o))}
            >
              <Triangle dir="left" />
            </Card>
            <Card
              className={`${styles.shapeCard} ${styles.controlCardUD}`}
              variant="borderless"
              onClick={() =>
                setBottomRowsStaggerSwapped((prev) => !prev)
              }
            >
              <div className={styles.dualTriangles}>
                <Triangle dir="up" inline />
                <Triangle dir="down" inline />
              </div>
            </Card>
            <Card
              className={`${styles.shapeCard} ${styles.controlCard4}`}
              variant="borderless"
              onClick={() => setOrder((o) => rotateRight(o))}
            >
              <Triangle dir="right" />
            </Card>

            <div className={styles.pillCell1}>
              <button
                type="button"
                className={styles.pill}
                onClick={() => setOrder((o) => rotateLeft(o))}
              >
                {t("moveShape")}
              </button>
            </div>
            <div className={styles.pillCellMid}>
              <button
                type="button"
                className={styles.pill}
                onClick={() =>
                  setBottomRowsStaggerSwapped((prev) => !prev)
                }
              >
                {t("movePosition")}
              </button>
            </div>
            <div className={styles.pillCell4}>
              <button
                type="button"
                className={styles.pill}
                onClick={() => setOrder((o) => rotateLeft(o))}
              >
                {t("moveShape")}
              </button>
            </div>
          </div>
        </section>

        <div className={styles.sectionDivider} />

        <div className={styles.gridWrap}>
          <Row
            gutter={[20, 20]}
            justify={firstShapeRowJustify}
            wrap={false}
            className={styles.gridRowTop}
          >
            {row1.map((id, index) => (
              <Col xs={8} md={6} key={`${id}-r1-${index}`}>
                <Card
                  className={styles.gridCard}
                  variant="borderless"
                  onClick={() => setOrder((o) => shuffleOrder(o))}
                >
                  <ShapeGraphic id={id} fillGrid />
                </Card>
              </Col>
            ))}
          </Row>
          <Row
            gutter={[20, 20]}
            justify={secondShapeRowJustify}
            wrap={false}
            className={styles.gridRowBottom}
          >
            {row2.map((id, index) => (
              <Col xs={8} md={6} key={`${id}-r2-${index}`}>
                <Card
                  className={styles.gridCard}
                  variant="borderless"
                  onClick={() => setOrder((o) => shuffleOrder(o))}
                >
                  <ShapeGraphic id={id} fillGrid />
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
