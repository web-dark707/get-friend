import { defineConfig } from 'windicss/helpers';

export default defineConfig({
    extract: {
        include: ['**/*.{jsx,js,ts,tsx,css,html}'],
        exclude: ['node_modules', '.git', 'dist/**/*'],
    },
    theme: {
        extend: {
            zIndex: {
                '[-1]': '-1',
                '9999': '9999',
            },
            backgroundColor: {
                baseColor: '#FFFFFF',
                primaryColor: '#C95793',
                success: '#4CAF50',
                error: '#FF5A5A',
            },
            fontSize: {
                baseSize: '12px',
                lgSize: '14px',
            },
            textColor: {
                baseColor: '#000',
                primaryColor: '#E5A6AF',
                success: '#4CAF50',
                error: '#FF5A5A',
            },
            borderColor: {
                baseColor: '#FFFFFF',
                primaryColor: '#C95793',
                success: '#4CAF50',
                error: '#FF5A5A',
            },
            placeholderColor: {
                baseColor: '#E3E3E3',
            },
        },
    },
});
