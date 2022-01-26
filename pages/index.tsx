import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { FiAlertCircle } from "react-icons/fi";

import InfoSection from "../components/InfoSection";
import DatePicker from "../components/DatePicker";
import { useNasaSearch } from "hooks/useNasaSearch";
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
          <span className={styles.home__error}> {error}</span>
        </div>
        <DatePicker handleDate={handleDate} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={styles.home__loader}>
        <FaSpinner size={60} className={styles.home__spinner} />
      </div>
    );
  }

  return (
    <>
      <InfoSection {...data} />
      <DatePicker handleDate={handleDate} />
    </>
  );
}
