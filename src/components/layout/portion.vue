<!--
 * @Date: 2022-12-09 10:57:45
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-12-09 11:02:34
 * @Description: 分块布局
-->
<script lang="ts" setup>
	const { title } = defineProps<{
		title: string;
	}>();
</script>

<template>
	<header>
		<span>{{ title }}</span>
	</header>
	<main>
		<slot></slot>
	</main>
</template>

<style lang="less" scoped></style>
