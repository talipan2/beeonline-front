<template>
	<nav
		aria-label="breadcrumb"
		class="breadcrumb-wrapper"
	>
		<ul class="breadcrumb">
			<template v-if="!props.loading">
				<li
					v-for="(crumb, index) in list"
					:key="index"
					class="breadcrumb-item"
					:class="{ active: index === list.length - 1 }"
				>
					<NuxtLink
						v-if="crumb.link && index !== list.length - 1"
						:to="crumb.link"
					>
						{{ crumb.label }}
					</NuxtLink>
					<span v-else>{{ crumb.label }}</span>
				</li>
			</template>
			<template v-else>
				<li
					v-for="n in 3"
					:key="n"
					class="breadcrumb-item skeleton-crumb"
				>
					<span class="skeleton-block"></span>
				</li>
			</template>
		</ul>
	</nav>
</template>

<script setup>
	const props = defineProps({
		list: {
			type: Array,
			default: () => [],
		},
		loading: {
			type: Boolean,
			default: false,
		},
	});
</script>

<style lang="scss" scoped>
	.breadcrumb {
		display: flex;
		flex-wrap: wrap;
		gap: 1em;
		font-size: 1.6em;
		padding: 0;
		margin-block: 2em 0;
		li {
			display: flex;
			align-items: center;
			column-gap: 1em;
		}
		li:not(:last-child)::after {
			content: '-';
		}
		.active {
			padding: 0 0.31em;
			border-radius: 0.125em;
			background-color: var(--bg-secondary-color);
			box-shadow: 0 0 0 1px var(--text-color-ternary);
		}
		.skeleton-crumb {
			.skeleton-block {
				display: inline-block;
				width: 6em;
				height: 1.2em;
				border-radius: 0.25em;
				background: linear-gradient(
					90deg,
					#ececec 25%,
					#f5f5f5 50%,
					#ececec 75%
				);
				background-size: 200% 100%;
				animation: skeleton-loading 1.2s infinite linear;
			}
		}
	}

	@keyframes skeleton-loading {
		0% {
			background-position: 200% 0;
		}
		100% {
			background-position: -200% 0;
		}
	}
</style>
