import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <title>BooduckSound</title>
          <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="keywords" content="온라인,음악게임,노래맞추기,부덕사운드,booducksound,네이버,부스트캠프" />
          <meta name="description" content="🐥온라인 노래 맞히기 게임 플랫폼 부덕사운드 입니다.🐥" />
          <meta name="naver-site-verification" content="bf0aa56a1eb42c038834ca4aafb118b5d8bf15af" />
          <meta name="google-site-verification" content="QL6xJnBIBwJARnRjGuBW1uDQS98EJZFiFUkfUAxJm54" />
          <link rel="short icon" href="images/favicon.ico" />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
