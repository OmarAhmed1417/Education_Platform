import { useState } from "react";
import TFQ from "../Add Exam/True&False Question/True_False";
import icon1 from '../../imges/writing.png';
import icon2 from '../../imges/answer (1).png';
import icon3 from '../../imges/decision-making.png';
import Image from "next/image";
import styles from './QA.module.css'; // Import the CSS module
// import WritingA from "../Answer/Writing Answer/Writing_answer";
import Writing from "../Add Exam/Writingquestion/Writing";
import Choose from "../Add Exam/Choose Question/Choose";

export default function QA() {
    const [type, setType] = useState("");

    const choose = () => {
        if (type === "Choose") {
            return <Choose />;
        }
        if (type === "rewriting") {
            return <Writing />;
        }
        if (type === "true&false") {
            return <TFQ />;
        }
    };

    return (
        <div className={styles.container}>
           

            <div className={styles.buttonContainer}>
                <button 
                    onClick={() => setType("Choose")} 
                    title="Choose Question" 
                    className={styles.button}
                >
                    <Image src={icon2} alt="Choose Question icon" className={styles.img} />
                    <span className={styles.title}>Choose Question</span>
                </button>

                <button 
                    onClick={() => setType("rewriting")} 
                    title="Rewriting Question" 
                    className={styles.button}
                >
                    <Image src={icon1} alt="Rewriting Question icon" className={styles.img} />
                    <span className={styles.title}>Rewriting Question</span>
                </button>

                <button 
                    onClick={() => setType("true&false")} 
                    title="True or False Question" 
                    className={styles.button}
                >
                    <Image src={icon3} alt="True or False Question icon" className={styles.img} />
                    <span className={styles.title}>True or False Question</span>
                </button>
            </div>

            <div>
                {choose()}
            </div>
        </div>
    );
}
