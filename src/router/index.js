import { createRouter, createWebHistory } from 'vue-router';
import License from "@/pages/license";
import billingHistory from "@/pages/billing-history";

const routes = [
    {
        path: '/',
        component: License,
        name: 'LicensePage'
    },
    {
        path: '/history',
        component: billingHistory,
        name: 'historyPage'
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router