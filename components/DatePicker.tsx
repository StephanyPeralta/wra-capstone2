import { useNasaSearch } from "hooks/useNasaSearch";
import React, { useState, useRef } from "react";
import styles from "../styles/DatePicker.module.css";

function DatePicker({ handleDate }: any) {
  const dateRef = useRef<HTMLInputElement>(null!);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      // console.log(dateRef.current.value);

      await handleDate(dateRef.current.value);
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  }

  return (
    <>
      <div className={styles.date}>
        <p className={styles.date__text}>Try another date!</p>
        {error && <div>{error}</div>}
        <form className={styles.date__form} onSubmit={handleSubmit}>
          <div className={styles.date__inputWrapper}>
            <input type="date" className={styles.date__input} ref={dateRef} />
            <button
              className={styles.date__button}
              type="submit"
              disabled={loading}
            >
              Show Picture
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DatePicker;
