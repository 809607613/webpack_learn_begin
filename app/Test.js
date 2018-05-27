import React, {Component} from 'react';
import config from './config'
import styles from './test.css'

class Test extends Component {
    render() {
        return (
            <div className={styles.root}>
                {config.text}
            </div>
        )
    }
}
export default Test