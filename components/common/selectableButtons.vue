<template>
	<div
		ref="container"
		class="selectable-buttons"
	>
		<div
			class="selectable-buttons__list"
			ref="listRef"
		>
			<template
				v-for="(item, index) in options"
				:key="index"
			>
				<UiButton
					ref="buttons"
					type="button"
					class="selectable-buttons__btn"
					:class="{
						'is-hidden': !isExpanded && index >= visibleCount,
						'is-active': modelValue.includes(item.id),
					}"
					variant="secondary"
					size="small"
					@click="toggleSelection(item)"
				>
					{{ item.name }}
				</UiButton>
			</template>
			<UiButton
				v-if="showMoreButton"
				type="button"
				class="selectable-buttons__more"
				variant="quinary"
				size="small"
				@click="toggleExpand"
				ref="moreButton"
			>
				{{ isExpanded ? 'Свернуть' : 'Еще' }}
			</UiButton>
			<UiButton
				type="button"
				class="new-service__btn"
				variant="tertiary"
				size="large"
				@click="handleResetFilter"
				ref="resetButton"
			>
				Сбросить фильтры
			</UiButton>
		</div>
		<UiButton
			type="button"
			class="selectable-buttons__btn selectable-buttons__open-btn"
			variant="secondary"
			size="small"
			@click="mobileModal = true"
		>
			<component
				:is="iconButton"
				class="svg-m"
			/>
			{{ mobileButtonText }}
		</UiButton>
		<slot />
		<div class="selectable-buttons__select-list">
			<template
				v-for="(item, index) in selectedList"
				:key="index"
			>
				<UiButton
					type="button"
					class="selectable-buttons__btn selectable-buttons__btn-delete"
					variant="quinary"
					size="small"
					@click="deleteItem(item)"
				>
					{{ item.name }}
					<SvgoCancel class="svg-m selectable-buttons__btn-delete" />
				</UiButton>
			</template>
		</div>
		<ModalsRoundBorder
			v-model="mobileModal"
			fixed-header
			title="Выбрать категорию"
		>
			<div class="selectable-buttons__mobile-list">
				<template
					v-for="(item, index) in options"
					:key="index"
				>
					<UiButton
						ref="buttons"
						type="button"
						class="selectable-buttons__btn"
						:class="{ 'is-active': modelValue.includes(item.id) }"
						variant="secondary"
						size="small"
						@click="toggleSelection(item)"
					>
						{{ item.name }}
					</UiButton>
				</template>
			</div>
			<template #footer>
				<UiButton
					type="button"
					variant="default"
					@click="mobileModal = false"
				>
					Сбросить
				</UiButton>
				<UiButton
					type="button"
					variant="quinary"
					@click="emit('updateFilter')"
				>
					Применить
				</UiButton>
			</template>
		</ModalsRoundBorder>
	</div>
</template>

<script setup>
	const props = defineProps({
		modelValue: {
			type: Array,
			default: () => [],
		},
		options: {
			type: Array,
			default: () => [],
		},
		mobileButtonText: {
			type: String,
			default: '',
		},
		iconButton: {
			type: [Object, Function],
			default: null,
		},
	});

	const container = ref(null);
	const listRef = ref(null);
	const buttons = ref([]);
	const isExpanded = ref(false);
	const visibleCount = ref(0);
	const resizeObserver = ref(null);
	const selectedList = ref([]);
	const mobileModal = ref(false);
	const moreButton = ref(null);
	const router = useRouter();
	const resetButton = ref(null);

	const showMoreButton = computed(() => {
		return buttons.value.length > visibleCount.value;
	});

	const emit = defineEmits(['update:modelValue', 'updateFilter', 'resetFilter']);

	function toggleSelection(button) {
		const buttonId = button.id; // Получаем id из объекта кнопки

		if (props.modelValue.includes(buttonId)) {
			// Удаляем id из modelValue
			const newIds = props.modelValue.filter((id) => id !== buttonId);
			emit('update:modelValue', newIds);
		} else {
			// Добавляем id в modelValue
			emit('update:modelValue', [...props.modelValue, buttonId]);
		}
	}

	function deleteItem(item) {
		const buttonId = item.id; // Получаем id из объекта кнопки
		if (props.modelValue.includes(buttonId)) {
			// Удаляем id из modelValue
			const newIds = props.modelValue.filter((id) => id !== buttonId);
			emit('update:modelValue', newIds);
			emit('updateFilter');
		} else {
			return;
		}
	}

	function handleResetFilter() {
		emit('resetFilter');
	}

	function toggleExpand() {
		isExpanded.value = !isExpanded.value;
	}

	function hideExpand() {
		if (isExpanded.value) {
			isExpanded.value = false;
		}
	}

	defineExpose({
		hideExpand,
	});

	function getComputedGap(element) {
		const styles = window.getComputedStyle(element);

		const gap =
			styles.gap ||
			styles.columnGap ||
			styles.rowGap ||
			styles['-webkit-gap'] ||
			styles['-moz-gap'] ||
			'0 0';

		const gaps = gap.split(/\s+/).map((g) => {
			if (g.endsWith('rem')) return parseFloat(g) * 10;
			if (g.endsWith('em')) return parseFloat(g) * parseFloat(styles.fontSize);
			return parseFloat(g);
		});

		// Возвращаем среднее значение gap
		return gaps.reduce((sum, val) => sum + val, 0) / gaps.length;
	}

	async function calculateVisible() {
		await new Promise((resolve) => requestAnimationFrame(resolve));
		if (!container.value || buttons.value.length === 0) return;

		const gap = getComputedGap(listRef.value);
		const containerWidth = container.value.offsetWidth;
		let totalWidth = 0;
		let count = 0;

		// Получаем ширину кнопки "Ещё"
		let moreBtnWidth = 140; // Значение по умолчанию
		if (moreButton.value?.$el) {
			moreBtnWidth = moreButton.value.$el.offsetWidth;
		}
		let resetBtnWidth = 170; // Значение по умолчанию
		if (resetButton.value?.$el) {
			resetBtnWidth = resetButton.value.$el.offsetWidth;
		}


		for (const [index, btn] of buttons.value.entries()) {
			if (!btn?.$el) continue;

			const btnWidth = btn.$el.offsetWidth;
			const currentGap = index > 0 ? gap : 0;
			const newTotalWidth = totalWidth + currentGap + btnWidth;

			// Проверяем, нужна ли кнопка "Ещё" (если есть ещё кнопки после текущей)
			const needsMoreButton = index < buttons.value.length - 1;
			const spaceWithMoreButton = needsMoreButton
				? newTotalWidth + gap + moreBtnWidth + resetBtnWidth
				: newTotalWidth;

			if (spaceWithMoreButton > containerWidth && count > 0) {
				break;
			}

			totalWidth = newTotalWidth;
			count++;
		}

		if (visibleCount.value !== count) {
			visibleCount.value = count;
		}
	}

	// Отслеживаем появление кнопок
	watch(
		() => [...buttons.value],
		async () => {
			await nextTick(calculateVisible);
		}
	);

	// Также отслеживаем изменения options
	watch(
		() => props.options,
		async () => {
			await nextTick(() => {
				calculateVisible();
			});
		}
	);

	watch(
		() => [...props.modelValue, ...props.options],
		() => {
			selectedList.value = props.options.filter((item) =>
				props.modelValue.includes(item.id)
			);
		},
		{ immediate: true }
	);

	onMounted(() => {
		// Инициализация при монтировании, если кнопки уже есть
		nextTick(() => {
			calculateVisible();
		});
	});
</script>

<style lang="scss">
	.selectable-buttons {
		width: 100%;
		font-size: 1rem;
		margin-bottom: 2em;

		&__list {
			display: flex;
			flex-wrap: wrap;
			gap: 1em;
			margin-bottom: 4em;
		}

		&__btn {
			font-size: 1.6em;
			line-height: 1.5em;
			font-weight: 500;
			background-color: #f0eff4;
			&.is-hidden {
				display: none;
			}
			&.is-active {
				border: 2px solid #6937a5;
			}

			&-delete {
				background-color: var(--button-background-primary);
				column-gap: 0.5em;

				@include hover {
					background-color: var(--button-background-primary);
					color: var(--text-color-octonary);

					svg {
						path {
							fill: var(--text-color-octonary);
						}
					}
				}
			}

			@include mobile {
				text-wrap: auto;
				text-align: left;
			}
		}

		&__more {
			font-size: 1.6em;
			line-height: 1.5em;
			font-weight: 500;
			width: 8.43em;
		}

		&__select-list {
			display: flex;
			flex-wrap: wrap;
			gap: 1em;
		}

		&__open-btn {
			display: none;
			font-size: 1.4em;
			column-gap: 0.5em;

			svg {
				width: 1.4em;
				height: 1.4em;
			}
		}

		@include mobile {
			&__list {
				display: none;
			}

			&__open-btn {
				display: flex;
			}

			&__mobile-list {
				display: flex;
				flex-wrap: wrap;
				gap: 1em;
			}
		}
	}
</style>
