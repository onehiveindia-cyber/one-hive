// Supabase Configuration for OneHive
const SUPABASE_URL = "https://adtdjzohzcyrczpnsusc.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_uxkUIgza1mQIPrxNxkrv6Q_4DO6xpRm";

// Global Backend Configuration
// CHANGE THIS TO YOUR LIVE BACKEND URL WHEN DEPLOYING (e.g., "https://your-api.com")
window.BACKEND_URL = "http://localhost:3005";

// Initialize the Supabase client
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export for global use
window.supabaseClient = _supabase;

// ==========================================
// Modern Global Toast Notification System
// Overrides native browser alert()
// ==========================================
window.alert = function (message) {
    if (!document.getElementById('onehive-toast-styles')) {
        const style = document.createElement('style');
        style.id = 'onehive-toast-styles';
        style.innerHTML = `
            .onehive-toast-container {
                position: fixed;
                bottom: 24px;
                right: 24px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 999999;
                pointer-events: none;
            }
            .onehive-toast {
                background: rgba(15, 23, 42, 0.85);
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                color: #ffffff;
                padding: 16px 20px;
                border-radius: 12px;
                font-family: 'Plus Jakarta Sans', sans-serif;
                font-size: 14px;
                font-weight: 500;
                line-height: 1.5;
                min-width: 250px;
                max-width: 350px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                display: flex;
                align-items: flex-start;
                gap: 12px;
                pointer-events: auto;
                transform: translateX(120%);
                opacity: 0;
                transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
                white-space: pre-line;
            }
            .onehive-toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            .onehive-toast.hide {
                transform: translateX(120%);
                opacity: 0;
            }
        `;
        document.head.appendChild(style);
    }

    let container = document.getElementById('onehive-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'onehive-toast-container';
        container.className = 'onehive-toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'onehive-toast';

    const msgStr = typeof message === 'string' ? message : String(message);
    const msgLower = msgStr.toLowerCase();
    const isError = msgLower.includes('error') || msgLower.includes('failed') || msgLower.includes('wrong') || msgLower.includes('denied') || msgLower.includes('invalid');
    const iconColor = isError ? '#ef4444' : '#10b981';
    const iconClass = isError ? 'fa-circle-exclamation' : 'fa-circle-check';

    toast.innerHTML = `
        <i class="fa-solid ${iconClass}" style="color: ${iconColor}; font-size: 18px; margin-top:2px;"></i>
        <div style="flex-grow: 1;">${msgStr}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    setTimeout(() => {
        toast.classList.replace('show', 'hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }, 4500); // Hide after 4.5 seconds
};
