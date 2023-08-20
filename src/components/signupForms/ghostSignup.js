import React from 'react';
import * as styles from './signupForms.module.css';

const GhostSignupForm = () => (
  <div className={styles.ghostSignupForm}>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/ghost/signup-form@~0.1/umd/signup-form.min.js"
      data-background-color="#F1F3F4"
      data-text-color="#000000"
      data-button-color="#ff1a75"
      data-button-text-color="#FFFFFF"
      data-title="Pushkar&#039;s Blog"
      data-description="A recollection of everything I think about, just a little louder"
      data-icon="https://blog.thepushkarp.com/content/images/size/w192h192/size/w256h256/2023/07/A679AE12-2369-4871-BA2E-7ED6D27DA304-1.JPEG"
      data-site="https://blog.thepushkarp.com"
      data-locale="en"
      async
    ></script>
  </div>
);

export default GhostSignupForm;
