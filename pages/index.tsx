import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

import InfoSection from "../components/InfoSection";
import DateForm from "../components/DateForm";
import { useNasaSearch } from "../hooks/useNasaSearch";
import styles from "../styles/index.module.css";

export default function Home() {
  const [searchDate, setSearchDate] = useState("");
  const { data, isLoading, error } = useNasaSearch(searchDate);

  const handleDate = (date: string) => {
    setSearchDate(date);
  };

  if (error) {
    return (
      <div>
        <div className={styles.home__alert}>
          <FiAlertCircle />
          <span className={styles.home__error}>{error}</span>
        </div>
        <DateForm handleDate={handleDate} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.home__loader} data-testid="loader-icon">
        <FaSpinner size={60} className={styles.home__spinner} />
      </div>
    );
  }

  return (
    <>
      <InfoSection {...data} />
      <DateForm handleDate={handleDate} />
    </>
  );
}
