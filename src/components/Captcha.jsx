/*
 * Form to ask for captcha.
 * Offers input for captchas, parent needs to provide a form and
 * get "captcha" and "captchaid" values
 */

/* eslint-disable jsx-a11y/no-autofocus */

import React, { useState, useEffect } from 'react';
import { t } from 'ttag';

import { IoReloadCircleSharp } from 'react-icons/io5';

async function getUrlAndId() {
  const url = window.ssv.captchaurl;
  const resp = await fetch(url, {
    cache: 'no-cache',
  });
  if (resp.ok) {
    const captchaid = resp.headers.get('captcha-id');
    const svgBlob = await resp.blob();
    return [URL.createObjectURL(svgBlob), captchaid];
  }
  return null;
}

/*
 * autoload: Load captcha immediately and autofocus input textbox
 * width: width of the captcha image
 */
const Captcha = ({ autoload, width }) => {
  const [captchaData, setCaptchaData] = useState({});
  const [errors, setErrors] = useState([]);
  const [imgLoaded, setImgLoaded] = useState(false);

  const reloadCaptcha = async () => {
    if (imgLoaded) {
      setImgLoaded(false);
    }
    const captchaResponse = await getUrlAndId();
    if (!captchaResponse) {
      setErrors([t`Could not load captcha`]);
      return;
    }
    const [svgUrl, captchaid] = captchaResponse;
    setCaptchaData({ url: svgUrl, id: captchaid });
  };

  useEffect(async () => {
    if (autoload) {
      reloadCaptcha();
    }
  }, []);

  const contWidth = width || 100;

  return (
    <>
      <p className="modaltext">
        {t`Type the characters from the following image:`}
        &nbsp;
        <span style={{ fontSize: 11 }}>
          ({t`Tip: Not case-sensitive; I and l are the same`})
        </span>
      </p>
      <br />
      {errors.map((error) => (
        <p key={error} className="errormessage">
          <span>{t`Error`}</span>:&nbsp;{error}
        </p>
      ))}
      <div
        style={{
          width: `${contWidth}%`,
          paddingTop: `${Math.floor(contWidth * 0.6)}%`,
          position: 'relative',
          display: 'inline-block',
          backgroundColor: '#e0e0e0',
        }}
      >
        <div
          style={{
            width: '100%',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        >
          {(captchaData.url)
            ? (
              <img
                style={{
                  width: '100%',
                  opacity: (imgLoaded) ? 1 : 0,
                  transition: '100ms',
                }}
                src={captchaData.url}
                alt="CAPTCHA"
                onLoad={() => {
                  setErrors([]);
                  setImgLoaded(true);
                }}
                onError={() => {
                  setErrors([t`Could not load captcha`]);
                }}
              />
            )
            : (
              <span
                role="button"
                tabIndex={0}
                title={t`Load Captcha`}
                className="modallink"
                onClick={reloadCaptcha}
                onKeyPress={reloadCaptcha}
              >
                {t`Click to Load Captcha`}
              </span>
            )}
        </div>
      </div>
      <p className="modaltext">
        {t`Can't read? Reload:`}&nbsp;
        <span
          role="button"
          tabIndex={-1}
          title={t`Reload`}
          className="modallink"
          style={{ fontSize: 28 }}
          onClick={reloadCaptcha}
        >
          <IoReloadCircleSharp />
        </span>
      </p>
      <input
        name="captcha"
        placeholder={t`Enter Characters`}
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        autoFocus={autoload}
        style={{
          width: '6em',
          fontSize: 21,
          margin: 5,
        }}
      />
      <input type="hidden" name="captchaid" value={captchaData.id || '0'} />
      <br />
    </>
  );
};

export default React.memo(Captcha);
