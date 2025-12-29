import { ApiError } from "@/api/http";
import { postLogin } from "@/api/auth";
import { decodeJwtPayload, setAuthToken } from "@/lib/authToken";
import { setStoredLanguageCode } from "@/lib/language";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

import styles from "./login.module.scss";

export default function LoginPage() {
  const router = useRouter();
  const isTr = router.locale === "tr";

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const target = e.currentTarget;

    if (target.validity.valueMissing) {
      setErrors(prev => ({ ...prev, [target.name]: "Bu alan boş bırakılamaz." }));
    } else if (target.type === "email" && target.validity.typeMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Geçersiz e-posta." }));
    } else if (target.name === "password" && target.validity.patternMismatch) {
      setErrors(prev => ({ ...prev, [target.name]: "Zayıf parola. En az 8 karakter, büyük harf ve rakam gerekli." }));
    } else {
      setErrors(prev => ({ ...prev, [target.name]: target.validationMessage }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const title = isTr ? "Oturum Aç" : "Sign in";
  const googleLabel = isTr ? "Google ile oturum aç" : "Sign in with Google";
  const orLabel = isTr ? "veya" : "or";
  const noAccountLabel = isTr ? "Hesabınız yok mu?" : "Don't have an account?";
  const signupLabel = isTr ? "Kayıt Ol" : "Sign up";
  const forgotPasswordLabel = isTr ? "Şifremi unuttum" : "Forgot password?";

  const emailLabel = isTr ? "E-posta" : "Email";
  const passwordLabel = isTr ? "Şifre" : "Password";
  const loginBtnLabel = isTr ? "Giriş Yap" : "Sign in";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    try {
      setSubmitting(true);
      const result = await postLogin({ email, password });

      if (result?.token) {
        setAuthToken(result.token);
        const payload = decodeJwtPayload(result.token);
        const code = String(payload?.languageCode ?? "").toUpperCase();
        if (code === "TR" || code === "EN") {
          setStoredLanguageCode(code);
        }
      }

      await router.push("/dashboard");
    } catch (err) {
      if (err instanceof ApiError) {
        setSubmitError(err.message);
      } else {
        setSubmitError(isTr ? "Giriş başarısız. Lütfen tekrar deneyin." : "Login failed. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={styles.page} aria-label={title}>
      <div className={styles.center}>
        <div className={styles.card} role="group" aria-label={title}>
          <div className={styles.cardGlow} aria-hidden="true" />
          <div className={styles.cardInner}>
            <div className={styles.topLink}>
              {noAccountLabel}{" "}
              <Link href="/signup" aria-label={signupLabel} className={styles.inlineLink}>
                {signupLabel}
              </Link>
            </div>

            <button type="button" className={styles.googleBtn} aria-label={googleLabel}>
              {/* ... (google icon aynı) ... */}
              <svg
                className={styles.googleIcon}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>{googleLabel}</span>
            </button>

            <div className={styles.formDivider}>
              <span>{orLabel}</span>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} aria-busy={submitting}>
              {submitError && <div className={styles.errorMsg}>{submitError}</div>}
              <div className={styles.fieldGrid}>
                <label className={styles.field}>
                  <span className={styles.label}>{emailLabel}</span>
                  <input
                    className={styles.input}
                    name="email"
                    type="email"
                    placeholder="e.g. name@company.com"
                    required
                    maxLength={100}
                    onInvalid={handleInvalid}
                    onChange={handleChange}
                  />
                  {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                </label>

                  <label className={styles.field}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className={styles.label}>{passwordLabel}</span>
                      <Link href="/forgot-password" className={styles.forgotLink}>
                        {forgotPasswordLabel}
                      </Link>
                    </div>
                    <div className={styles.inputWrapper}>
                      <input
                        className={styles.input}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        maxLength={64}
                        placeholder=" "
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$"
                        onInvalid={handleInvalid}
                        onChange={handleChange}
                      />
                      <button
                        type="button"
                        className={styles.eyeBtn}
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="20"
                            height="20"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.45 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="20"
                            height="20"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}
                  </label>
              </div>

              <div className={styles.formAction}>
                <button type="submit" className={styles.submitBtn} disabled={submitting}>
                  {submitting && <span className={styles.spinner} aria-hidden="true" />}
                  <span>{loginBtnLabel}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
