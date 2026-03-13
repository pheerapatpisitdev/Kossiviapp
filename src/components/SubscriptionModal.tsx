import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SubscriptionModal.module.css';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OMISE_PUBLIC_KEY = import.meta.env.VITE_OMISE_PUBLIC_KEY as string | undefined;

declare global {
  interface Window {
    Omise?: any;
  }
}

export function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [loadingPlan, setLoadingPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cardCvv, setCardCvv] = useState('');

  const handleSubscribe = async (planCode: 'monthly' | 'yearly') => {
    try {
      setLoadingPlan(planCode);
      setMessage(null);

       if (!window.Omise || !OMISE_PUBLIC_KEY) {
        setMessage('ระบบชำระเงินยังไม่พร้อมใช้งาน (Omise ไม่ถูกโหลดหรือไม่มี public key)');
        return;
      }

      if (!email || !cardName || !cardNumber || !expMonth || !expYear || !cardCvv) {
        setMessage('กรุณากรอกข้อมูลบัตรและอีเมลให้ครบ');
        return;
      }

      const omise = window.Omise;
      omise.setPublicKey(OMISE_PUBLIC_KEY);

      const cardToken: string = await new Promise((resolve, reject) => {
        omise.createToken(
          'card',
          {
            name: cardName,
            number: cardNumber,
            expiration_month: Number(expMonth),
            expiration_year: Number(expYear),
            security_code: cardCvv,
          },
          (statusCode: number, response: any) => {
            if (statusCode === 200) {
              resolve(response.id);
            } else {
              reject(new Error(response.message || 'สร้าง token บัตรไม่สำเร็จ'));
            }
          },
        );
      });

      const res = await fetch('http://localhost:4000/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planCode, cardToken, email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'สมัครสมาชิกไม่สำเร็จ');
      }

      setMessage('ชำระเงินสำเร็จ (โหมดทดสอบ Omise)');
    } catch (err) {
      setMessage((err as Error).message);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.modal}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <div className={styles.header}>
              <h2>สมัครสมาชิก</h2>
              <p>ปลดล็อกคอนเทนต์พิเศษและฟีเจอร์ใหม่ ๆ สำหรับคนรักค็อกเทล</p>
            </div>

            <div className={styles.plans}>
              <div className={styles.planCard}>
                <div className={styles.planLabel}>รายเดือน</div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>฿199</span>
                  <span className={styles.priceUnit}>/ เดือน</span>
                </div>
                <ul className={styles.benefits}>
                  <li>เข้าถึงสูตรพิเศษทั้งหมด</li>
                  <li>อัปเดตเมนูใหม่ทุกสัปดาห์</li>
                  <li>ยกเลิกได้ทุกเมื่อ</li>
                </ul>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  disabled={loadingPlan === 'monthly'}
                  onClick={() => handleSubscribe('monthly')}
                >
                  {loadingPlan === 'monthly' ? 'กำลังสมัคร...' : 'สมัครรายเดือน'}
                </button>
              </div>

              <div className={`${styles.planCard} ${styles.highlight}`}>
                <div className={styles.badge}>แนะนำ</div>
                <div className={styles.planLabel}>รายปี</div>
                <div className={styles.priceRow}>
                  <span className={styles.price}>฿1,990</span>
                  <span className={styles.priceUnit}>/ ปี</span>
                </div>
                <div className={styles.saving}>ประหยัดกว่า ~2 เดือน</div>
                <ul className={styles.benefits}>
                  <li>สิทธิพิเศษเหมือนแพ็กเกจรายเดือน</li>
                  <li>ราคาต่อเดือนถูกลง</li>
                  <li>แผนสำหรับแฟนคลับตัวจริง</li>
                </ul>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  disabled={loadingPlan === 'yearly'}
                  onClick={() => handleSubscribe('yearly')}
                >
                  {loadingPlan === 'yearly' ? 'กำลังสมัคร...' : 'สมัครรายปี'}
                </button>
              </div>
            </div>

            <div className={styles.formSection}>
              <h3>ข้อมูลสำหรับตัดบัตร</h3>
              <div className={styles.fieldRow}>
                <label>
                  อีเมลสำหรับติดต่อ
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className={styles.fieldRow}>
                <label>
                  ชื่อบนบัตร
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Card Holder Name"
                  />
                </label>
              </div>
              <div className={styles.fieldRow}>
                <label>
                  หมายเลขบัตร
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                  />
                </label>
              </div>
              <div className={styles.fieldRowInline}>
                <label>
                  เดือนหมดอายุ
                  <input
                    type="text"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value)}
                    placeholder="MM"
                  />
                </label>
                <label>
                  ปีหมดอายุ
                  <input
                    type="text"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value)}
                    placeholder="YYYY"
                  />
                </label>
                <label>
                  CVV
                  <input
                    type="password"
                    value={cardCvv}
                    onChange={(e) => setCardCvv(e.target.value)}
                    placeholder="123"
                  />
                </label>
              </div>
            </div>

            {message && <div className={styles.message}>{message}</div>}

            <button type="button" className={styles.closeBtn} onClick={onClose}>
              ปิด
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

