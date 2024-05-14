import React from 'react';
import { Hourglass } from "react-loader-spinner";

function Loader2() {
    return (
        <div style={styles.container}>
            <Hourglass
                visible={true}
                height="80"
                width="80"
                ariaLabel="hourglass-loading"
                wrapperStyle={{}}
                wrapperClass=""
                colors={['#306cce', '#72a1ed']}
            />
        </div>

    )
}
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // 100% of the viewport height
        width: '100vw', // 100% of the viewport width
        position: 'fixed', // Fix the loader position
        top: 0,
        left: 0,
        zIndex: 9999, // Ensure loader appears on top of other content
    },
};

export default Loader2