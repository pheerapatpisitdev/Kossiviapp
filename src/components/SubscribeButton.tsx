import styles from './Header.module.css';

interface SubscribeButtonProps {
  onClick?: () => void;
}

export function SubscribeButton({ onClick }: SubscribeButtonProps) {
  return (
    <button type="button" className={styles.subscribeBtn} onClick={onClick}>
      สมัครสมาชิก
    </button>
  );
}

