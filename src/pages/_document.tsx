import Document, { Head, Html, Main, NextScript, type DocumentContext } from "next/document";

const HTML_LANG_BY_LOCALE: Record<string, string> = {
  en: "en-US",
  tr: "tr-TR",
};

export default class MyDocument extends Document<{ locale?: string }> {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, locale: ctx.locale };
  }

  render() {
    const locale = this.props.locale ?? "en";
    const htmlLang = HTML_LANG_BY_LOCALE[locale] ?? locale;

    return (
      <Html lang={htmlLang}>
        <Head />
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
