import { useNasaSearch } from "hooks/useNasaSearch";
import React, { useState, useRef } from "react";
import styles from "../styles/DateForm.module.css";

function DateForm({ handleDate }: any) {
  const dateRef = useRef<HTMLInputElement>(null!);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleDate(dateRef.current.value);
  }

  return (
    <>
      <div className={styles.date}>
        <p className={styles.date__text}>Try another date!</p>
        <form className={styles.date__form} onSubmit={handleSubmit}>
          <div className={styles.date__inputWrapper}>
            <input
              data-testid="date-input"
              type="date"
              className={styles.date__input}
              ref={dateRef}
              required
            />
            <button className={styles.date__button} type="submit">
              Show Picture
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default DateForm;
