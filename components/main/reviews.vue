<template>
	<div
		class="reviews-company container"
		ref="reviewsContainer"
	>
		<div class="reviews-company__container">
			<div class="reviews-company__title-container">
				<div class="reviews-company__title-container-content">
					<h2 class="reviews-company__title">Отзывы клиентов</h2>
					<p class="reviews-company__description">
						Наши клиенты — дизайнеры, бренды, торговые сети, швейные фабрики.
						Благодаря платформе они находят подрядчиков для пошива одежды,
						закупают ткани и фурнитуру, арендуют оборудование и находят новых
						заказчиков
					</p>
				</div>
				<UiImage
					src="/assets/images/main/review/pattern.png"
					alt="Изображение звёзд"
				/>
			</div>
			<div
				class="reviews-company__slider-container"
				ref="sliderContainer"
			>
				<Swiper
					:slidesPerView="2.2"
					:spaceBetween="24"
					:breakpoints="{
						1524: {
							slidesPerView: 2.2,
						},
						1024: {
							slidesPerView: 1.5,
						},
						320: {
							slidesPerView: 1.2,
						},
					}"
					class="reviews-company__slider"
					:modules="modules"
					@swiper="setSwiperInstance"
					@slideChange="onSlideChange"
				>
					<SwiperSlide
						v-for="(review, index) in data"
						:key="index"
						class="reviews-company__slide"
					>
						<div class="reviews-company__slide-container">
							<div class="reviews-company__slide-header">
								<div class="reviews-company__slide-image">
									<UiImage
										:src="review.image"
										:alt="review.name"
										external="true"
									/>
								</div>
								<div class="reviews-company__slide-name">
									<p class="reviews-company__slide-name-role">
										{{ review.role }}
									</p>
									<h3 class="reviews-company__slide-name-title">
										{{ review.name }}
									</h3>
									<p class="reviews-company__slide-name-organization">
										{{ review.organization_name }}
									</p>
								</div>
							</div>
							<p
								:ref="(el) => setTextRef(el, review.id)"
								class="reviews-company__slide-text"
								:class="{
									'reviews-company__slide-text_expanded': expandedReviews.has(
										review.id
									),
								}"
							>
								{{ review.text }}
							</p>
							<UiButton
								type="button"
								v-if="reviewsWithOverflow.has(review.id)"
								@click="handleShowMore(review.id)"
								class="reviews-company__show-more-btn"
							>
								{{ expandedReviews.has(review.id) ? 'Скрыть' : 'Показать еще' }}
							</UiButton>
						</div>
					</SwiperSlide>
				</Swiper>
				<div
					class="reviews-company__slider-navigation"
					v-if="data.length > 1"
				>
					<UiButton
						type="button"
						class="reviews-company__slider-btn reviews-company__slider-btn_type_prev"
						variant="secondary"
						@click="slidePrev"
						:disabled="isBeginning"
					>
						<SvgoArrow class="svg-l" />
					</UiButton>
					<UiButton
						type="button"
						class="reviews-company__slider-btn reviews-company__slider-btn_type_next"
						variant="secondary"
						@click="slideNext"
						:disabled="isEnd"
					>
						<SvgoArrow class="svg-l" />
					</UiButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
	import { Navigation } from 'swiper/modules';
	import defaultImage from '@/assets/images/user-plug.png';

	const reviewsContainer = ref(null);
	const sliderContainer = ref(null);

	const swiperInstance = ref(null);
	const modules = [Navigation];

	const isBeginning = ref(true);
	const isEnd = ref(false);

	const expandedReviews = ref(new Set());
	const reviewsWithOverflow = ref(new Set());
	const textRefs = ref(new Map());

	const setTextRef = (el, id) => {
		if (el) {
			textRefs.value.set(id, el);
		}
	};

	const checkTextOverflow = () => {
		textRefs.value.forEach((el, id) => {
			if (el) {
				// Проверяем, обрезан ли текст
				const isOverflowing = el.scrollHeight > el.clientHeight;
				if (isOverflowing) {
					reviewsWithOverflow.value.add(id);
				} else {
					reviewsWithOverflow.value.delete(id);
				}
			}
		});
	};

	const handleShowMore = (id) => {
		if (expandedReviews.value.has(id)) {
			expandedReviews.value.delete(id);
		} else {
			expandedReviews.value.add(id);
		}
	};

	const data = ref([
		{
			id: 5,
			image: defaultImage,
			name: 'Жидков Вадим Юрьевич',
			role: 'Заказчик',
			organization_name: 'TERRY DREAMS',
			text: `Хочу сказать огромное спасибо от всей нашей компании. Благодаря вашему сайту с базой поставщиков и производителей в 2025 году мы нашли действительно большое количество швейных цехов и производств. Все они оказались очень живыми, открытыми к сотрудничеству и продуктивными. Мы сэкономили массу времени, избежав долгих поисков через разные источники — на наше объявление откликнулось множество фабрик, в том числе и из стран СНГ. Именно благодаря вашему ресурсу мы смогли успешно выполнить задачи, которые перед нами стояли.
						
			Отдельная благодарность Гульнаре за её помощь во внешнеэкономической деятельности. Она подсказала нам нужные фабрики, познакомила с людьми, принимающими решения, и дала ту основу, с которой мы начали нашу работу за пределами страны. Для нас это стало настоящим стартом, мы сразу получили первые результаты и поняли, что движемся в правильном направлении.
						
			Спасибо за вашу работу и за ту возможность, которую вы создаёте для бизнеса!`,
		},
		{
			id: 1,
			image: defaultImage,
			name: 'Александр Сергеевич',
			role: 'Заказчик',
			organization_name: 'ООО «БАНГЛИ» (Bungly Boo!)',
			text: `Мы уже давно работаем на BEE-online.ru и остаёмся довольны. Каждый заказ на платформе получает от 5 до 15 откликов. 
			Это хорошая выборка, которая обеспечивает гибкость в работе. А за счет доступной логистики находить подрядчиков можно в любой точке РФ. `,
		},
		{
			id: 2,
			image: defaultImage,
			name: 'Ольга Александровна',
			role: 'Заказчик',
			organization_name: 'ООО «Чайковская швейная фабрика»',
			text: `В течение полутора или двух недель после размещения заказа мы получаем до 30 откликов. Не менее 80% из них полностью соответствуют нашим ожиданиям. 
			Это высокий показатель. Выбираем только тех, у кого есть реальные производственные мощности. Конечно, по критериям цены/качества тоже оцениваем. `,
		},
		{
			id: 3,
			image: defaultImage,
			name: 'Марина Владимировна',
			role: 'Исполнитель',
			organization_name: 'ИП Чистова Марина Владимировна',
			text: `Мы получаем заказы со всех уголков страны — от Калининграда до Владивостока, это важное конкурентное преимущество платформы. Она значительно расширяет наши возможности для бизнеса.`,
		},
		{
			id: 4,
			image: defaultImage,
			name: 'Наталья Валерьевна',
			role: 'Исполнитель',
			organization_name: 'MMAMA Production',
			text: `Это 100% отраслевая платформа — давно уже на ней работаем. Понравились шаблоны договоров, в разделе «Сделка».`,
		},
	]);

	const setSwiperInstance = (swiper) => {
		swiperInstance.value = swiper;
	};

	const slidePrev = () => {
		if (swiperInstance.value) {
			swiperInstance.value.slidePrev();
		}
	};

	const slideNext = () => {
		if (swiperInstance.value) {
			swiperInstance.value.slideNext();
		}
	};

	const onSlideChange = (swiper) => {
		updateNavigationState(swiper);
	};

	const updateNavigationState = (swiper) => {
		isBeginning.value = swiper.isBeginning;
		isEnd.value = swiper.isEnd;
	};

	const handleResize = () => {
		if (!reviewsContainer.value || !sliderContainer.value) return;

		if (window.innerWidth < 768) {
			sliderContainer.value.style.width = `100%`;
			sliderContainer.value.style.marginRight = `0px`;
		} else {
			// Получаем вычисленные стили
			const computedStyle = window.getComputedStyle(reviewsContainer.value);
			const marginRight = parseFloat(computedStyle.marginRight) || 0;
			const paddingRight = parseFloat(computedStyle.paddingRight) || 0;

			// Устанавливаем новые значения
			sliderContainer.value.style.width = `calc(100% + ${marginRight + paddingRight}px)`;
			sliderContainer.value.style.marginRight = `-${marginRight + paddingRight}px`;
		}
	};

	// Добавляем обработчик с debounce
	let resizeTimeout;

	const debouncedResize = () => {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(handleResize, 100);
	};

	onMounted(() => {
		window.addEventListener('resize', debouncedResize);
		handleResize(); // Инициализация при монтировании
		nextTick(() => {
			checkTextOverflow();
		});
	});

	onUnmounted(() => {
		window.removeEventListener('resize', debouncedResize);
	});
</script>

<style lang="scss">
	.reviews-company {
		font-size: 1rem;

		overflow: visible;
		position: relative;
		padding-block: 10em;
		margin-bottom: 10em;

		&__container {
			display: flex;
			gap: 2.4em;
			overflow: visible;
		}

		&__title-container {
			padding: 4.8em 3.8em;
			aspect-ratio: 1/1.35;
			border-radius: 24px;
			background: linear-gradient(to bottom, #2d007b 10%, #964ca8 90%);
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			gap: 1em;
			align-items: center;
			flex: 0 1 42em;
		}

		&__title {
			font-family: 'fira-sans', sans-serif;
			font-size: 4em;
			font-weight: 700;
			color: #ffffff;
			text-align: center;
			margin-bottom: 0.5em;
		}

		&__description {
			font-size: 2em;
			line-height: 1.3em;
			opacity: 0.8;
			color: #ffffff;
			text-align: center;
		}

		&__image {
			width: 100%;
			height: auto;
		}

		&__slider {
			height: 100%;
		}

		&__slider-container {
			flex: 1 1 0;
			min-width: 0;
			overflow: visible;
		}

		&__slide-container {
			display: flex;
			flex-direction: column;
			row-gap: 4em;
			background: #f6f4ff;
			border-radius: 24px;
			padding: 4.8em;
			height: 100%;
		}

		&__slide-header {
			display: flex;
			gap: 2.4em;
			align-items: center;
		}

		&__slide-name {
			display: flex;
			flex-direction: column;
			gap: 0.5em;
			flex: 0 1 100%;
		}

		&__slide-image {
			flex: 1 0 21%;
			max-width: 21%;
			border-radius: 50%;
			background-color: #fff;
			overflow: hidden;
			aspect-ratio: 1/1;
			display: flex;
			justify-content: center;
			align-items: center;

			img {
				width: 100%;
				height: auto;
				object-fit: cover;
			}
		}

		&__slide-name-role {
			font-size: 2em;
			font-weight: 500;
			line-height: 1.6em;
			color: #2a1947;
		}

		&__slide-name-title {
			font-family: 'Coolvetica', sans-serif;
			font-weight: 400;
			font-size: 2.4em;
			line-height: 1.33em;
			color: #2a1947;
		}

		&__slide-name-organization {
			font-weight: 500;
			font-size: 2em;
			line-height: 1.6em;
			color: #2a1947;
		}

		&__slide-text {
			font-weight: 500;
			font-size: 2em;
			line-height: 1.6em;
			color: #2a1947;

			white-space: pre-line;
			display: -webkit-box;
			-webkit-line-clamp: 8;
			-webkit-box-orient: vertical;
			overflow: hidden;

			&_expanded {
				-webkit-line-clamp: unset;
				overflow: visible;
			}
		}

		&__slider-navigation {
			display: flex;
			gap: 1em;
			position: absolute;
			top: 0;
			right: 0;
			z-index: 3;
		}

		&__slider-btn {
			width: 5.6em;
			height: 5.6em;
			border-radius: 50%;
			background: #fff;

			svg {
				path {
					stroke: #000;
				}
			}

			&_type_next {
				transform: rotate(180deg);
				box-shadow: 0 -12px 22px 0 rgba(0, 0, 0, 0.1);
			}

			&_type_prev {
				box-shadow: 0 12px 22px 0 rgba(0, 0, 0, 0.1);
			}
		}

		@include mobile {
			padding-bottom: 8em;
			margin-bottom: 5em;

			&__container {
				flex-direction: column;
			}

			&__title-container {
				aspect-ratio: initial;
				// flex-direction: row;
				padding: 2em;
				row-gap: 5em;
				flex: auto;

				img {
					flex: 0 0 30%;
					max-width: 30%;
				}
			}

			&__title {
				flex: 0 1 100%;
				// text-align: justify;
			}

			&__description {
				text-align: justify;
			}

			&__slide-image {
				aspect-ratio: 1;
				flex: 0 1 24%;
				max-width: 24%;
			}

			&__slider-container {
				flex: auto;
				overflow: hidden;
			}

			&__slide {
				height: auto;

				.swiper-slide {
					height: auto;
				}
			}

			&__slide-container {
				padding: 2.4em;
				row-gap: 3.2em;
			}

			&__slider-navigation {
				bottom: 0;
				left: 1.3em;
				right: auto;
				top: auto;
			}

			&__slider-btn {
				width: 4em;
				height: 4em;
			}
		}

		@include small-mobile {
			&__title {
				font-size: 2.2em;
			}

			&__description {
				font-size: 1.8em;
			}

			&__title-container {
				img {
					flex: 0 0 40%;
					max-width: 40%;
				}
			}

			&__slide-header {
				column-gap: 1.2em;
			}

			&__slide-name-role {
				font-size: 1.4em;
			}

			&__slide-name-title {
				font-size: 1.6em;
			}

			&__slide-name-organization {
				font-size: 1.4em;
			}

			&__slide-text {
				font-size: 1.4em;
			}
		}

		@media screen and (max-width: 1640px) {
			&__slider-navigation {
				right: 2.6em;
			}
		}
	}
</style>
