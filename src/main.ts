/*
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-09 11:24:24
 * @Description: 入口文件
 */

import 'virtual:windi.css';
import './styles/index.less';

import App from '@/App.vue';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router/index.js';

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';

createApp(App)
	.use(ArcoVue, {
		// 用于改变使用组件时的前缀名称
		// componentPrefix: 'arco',
	})
	.use(createPinia)
	.use(router)
	.use(ArcoVueIcon)
	.mount('#app');
