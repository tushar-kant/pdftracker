import React from 'react';
import { MagnifyingGlass } from "react-loader-spinner";


function Loader() {
    return (
        <div style={styles.container}>
            <MagnifyingGlass
                visible={true}
                height="80"
                width="80"
                ariaLabel="magnifying-glass-loading"
                wrapperStyle={{}}
                wrapperClass="magnifying-glass-wrapper"
                glassColor="#c0efff"
                color="#e15b64"
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
export default Loader