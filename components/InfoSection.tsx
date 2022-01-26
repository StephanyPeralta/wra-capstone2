import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/InfoSection.module.css";

interface DataApi {
  date: string;
  title: string;
  explanation: string;
  media_type: string;
  url: string;
}

function InfoSection({ date, title, explanation, media_type, url }: DataApi) {
  return (
    <>
      <div className={styles.info}>
        <div className={styles.info__imgWrapper}>
          {media_type === "image" ? (
            <Image
              src={url}
              alt={title}
              className={styles.info__image}
              width={620}
              height={550}
              priority
            />
          ) : (
            <iframe
              title="Space Video"
              src={url}
              frameBorder="0"
              allow="encrypted-media"
              allowFullScreen
              className={styles.info__image}
              width={620}
              height={550}
            />
          )}
        </div>
        <div className={styles.info__details}>
          <h1 className={styles.info__title}>{title}</h1>
          <p className={styles.info__date}>{date}</p>
          <p className={styles.info__description}>{explanation}</p>
        </div>
      </div>
    </>
  );
}

export default InfoSection;
