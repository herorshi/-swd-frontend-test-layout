import i18n from "i18next";

const resources = {
  en: {
    translation: {
      title: "Layout & Style",
      moveShape: "Move shape",
      movePosition: "Move position",
      langEn: "EN",
      langTh: "TH",
      shapeTrapezoid: "Trapezoid",
      shapeParallelogram: "Parallelogram",
      shapeRectangle: "Rectangle",
      shapeOval: "Oval",
      shapeSquare: "Square",
      shapeCircle: "Circle",
    },
  },
  th: {
    translation: {
      title: "จัดการหน้าเว็บ",
      moveShape: "เลื่อนรูปทรง",
      movePosition: "เลื่อนตำแหน่ง",
      langEn: "EN",
      langTh: "TH",
      shapeTrapezoid: "สี่เหลี่ยมคางหมู",
      shapeParallelogram: "สี่เหลี่ยมด้านขนาน",
      shapeRectangle: "สี่เหลี่ยมผืนผ้า",
      shapeOval: "วงรี",
      shapeSquare: "สี่เหลี่ยมจัตุรัส",
      shapeCircle: "วงกลม",
    },
  },
} as const;

if (!i18n.isInitialized) {
  void i18n.init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
