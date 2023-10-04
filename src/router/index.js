import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue'
import CreateView from '../views/CreateView.vue'
import ChatView from '../views/ChatView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },

        {
            path: '/create',
            name: 'create',
            component: CreateView
        },

        {
            path: '/edit/:id',
            name: 'edit',
            component: CreateView
        },

        {
            path: '/chat',
            name: 'chat',
            component: ChatView
        },
    ]
})

export default router