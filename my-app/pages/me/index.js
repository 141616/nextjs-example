import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function index() {
  const { t, lang } = useTranslation();
  return (
    <div>
      <div>{t("common:me")}</div>
      <div>{lang}</div>
    </div>
  );
}
