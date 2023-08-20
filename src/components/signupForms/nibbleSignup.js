import React from 'react';
import * as styles from './signupForms.module.css';

const NibbleSubstackSignupForm = () => (
  <div className={styles.nibbleSubstackForm}>
    <iframe
      src="https://thenibble.substack.com/embed"
      width="100%"
      height="320"
      styles="border:1px solid #EEE; background:white;"
      frameBorder="0"
      scrolling="no"
      title="Nibble"
    ></iframe>
  </div>
);

export default NibbleSubstackSignupForm;
