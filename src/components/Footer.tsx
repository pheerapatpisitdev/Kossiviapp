import { Heart } from 'lucide-react';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.column}>
          <h3>Download</h3>
          <p>
            Enjoy the complete experience: get Kossivi on{' '}
            <a href="#" className={styles.link}>iOS</a> and{' '}
            <a href="#" className={styles.link}>Android</a>!
          </p>
        </div>

        <div className={styles.column}>
          <h3>Community</h3>
          <p>
            Join cocktail lovers from across the globe on{' '}
            <a href="#" className={styles.link}>Facebook</a> and{' '}
            <a href="#" className={styles.link}>Instagram</a>.
          </p>
        </div>

        <div className={styles.column}>
          <h3>About us</h3>
          <p>
            Made with <Heart size={14} className={styles.heart} /> in Bangkok.
            Connect with us on{' '}
            <a href="#" className={styles.link}>Twitter</a>.
          </p>
        </div>

        <div className={styles.column}>
          <h3>Contact</h3>
          <p>
            Say hi anytime at{' '}
            <a href="mailto:hello@kossivi.com" className={styles.link}>hello@kossivi.com</a>
          </p>
        </div>

        <div className={styles.column}>
          <h3>Language</h3>
          <select className={styles.select}>
            <option value="en">English</option>
            <option value="th">ไทย</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
            <option value="zh">中文</option>
          </select>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Kossivi. All rights reserved.</p>
      </div>
    </footer>
  );
}
