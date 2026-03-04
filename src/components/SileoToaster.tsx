import React from 'react';
import { Toaster } from 'sileo';
import 'sileo/styles.css';

export default function SileoToaster() {
    return (
        <Toaster
            position="bottom-center"
            theme="light"
        />
    );
}
