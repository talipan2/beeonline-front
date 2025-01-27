<template>
  <div class="bonus">
    <div class="bonus__left-side">
      <BonusBanner class="bonus__banner_desktop" />
      <BonusRules />
      <BonusAchievements :organizationId="organizationId"/>
      <BonusTransactions v-if="isTest" />
    </div>

    <div class="bonus__right-side">
      <BonusBanner class="bonus__banner_mobile" />
      <BonusScore :loading="loading" :bonuses="bonuses" />
      <BonusProgress
        :loading="loading"
        :level-groups="levelGroups"
        :level="level"
        :level-number="levelNumber"
        :level-progress="levelProgress"
        :achievements-org-count="achievementsOrgCount"
        :achievements-all-count="achievementsAllCount"
      />
      <BonusRating :loading="loading" :rating="rating" />
    </div>
  </div>
</template>

<script setup>
import { useBonusStore } from '~/store/bonusStore';
import { useUserStore } from '~/store/userStore';

const props = defineProps({});

const userStore = useUserStore();
const bonusStore = useBonusStore();

const organizationId = computed(() => userStore.userData?.organization_id);

const loading = ref(false);
const bonuses = ref(0);
const level = ref(null);
const levels = ref(null);
const levelGroups = ref([]);
const levelNumber = ref(0);
const levelProgress = ref(0);
const achievementsOrgCount = ref(0);
const achievementsAllCount = ref(0);
const rating = ref([]);
const isTest = ref(true);

const data = computed(() => bonusStore.data)

onMounted(() => {
  loading.value = true;
	if(organizationId.value) {
		bonusStore.getBonusesData(organizationId.value)
		.then(res => {
			if(res) {
				console.log(res)
				bonuses.value = res.bonuses;
				levelNumber.value = res.level_number;
				levelProgress.value = res.level_progress;
				achievementsOrgCount.value = res.achievements_org_count;
				achievementsAllCount.value = res.achievements_all_count;
			}
		})
		.finally(() => loading.value = false);

		bonusStore.getAchievements(organizationId.value)
	}
})

</script>

<style lang="scss">

.bonus {
  font-size: 1rem;
  display: flex;
  gap: 3em;

  &__left-side {
    flex: 1 1 auto;
  }

  &__right-side {
    flex: 0 0 33%;
  }

  &__banner_mobile {
    display: none;
  }
}

.bonus-card {
  font-size: 1rem;
  word-wrap: break-word;
  background-color: #fff;
  border-radius: 2.4em;
  margin-bottom: 3em;
  padding: 2.4em;
}

.card {
	font-size: 1rem;
	// position: relative;
	display: flex;
	gap: 3.2em;
	flex-direction: column;
	word-wrap: break-word;
	background-color: #FFF;
	border-radius: 2.4em;
	padding: 2.4em;
	margin-bottom: 3em;
	opacity: 1;
	transition: opacity .3s ease-in-out;

	@include mobile {
		font-size: .9rem;

	}

	&__content_scroll {
		overflow-y: auto; /* Вертикальная прокрутка */
		overflow-x: hidden; /* Отключить горизонтальную прокрутку */
		max-height: 50em;
	}
	
	&_loading {
		pointer-events: none;
		opacity: .6;
	}

	&_bordered {
		border: 1px solid #F3F4F9;
	}

	&_sm {
		border-radius: 1.2em;
	}

	&_modal {
		width: 100%;
		position: relative;
		pointer-events: auto;

		.close {
			font-size: 1em;
			position: absolute;
			top: 2em; right: 2.4em;
			width: 4em;
			height: 4em;
			min-width: 4em;
			min-height: 4em;
			border-radius: 4em;
			padding: 0;
			z-index: 1;

			&::before,
			&::after {
				width: 50%;
			}


		}
	}

	&__title {
		font-size: 2.8em;
		line-height: 1.07;
		font-weight: 500;
		margin-top: 0;
		margin-bottom: 0;
		color: #2A1947;

		@include mobile {
			font-size: 2rem;
		}
	}

	&__subtitle {
		font-size: 1.6em;
		line-height: 1.5;
		margin: .5em 0;
		color: #747087;
	}

	&__list {
		margin: 0;
		padding: 0;
		list-style: none;

		> li {
			display: flex;
			align-items: center;
			margin-bottom: 2em;

			p {
				font-size: 1.8em;
				line-height: 1.3;
				margin-bottom: 0;
			}

			p + p {
				margin-bottom: .5em;
			}

			&::before {
				content: "";
				background-color: #6937A5;
				font-size: 1.6em;
				width: 1em;
				height: 1em;
				border-radius: 1em;
				flex: 0 0 1em;
				min-width: 1em;
				margin-right: .625em;
			}
		}
	}
}

.bonus-btn {
  font-size: 1.4em;
  color: var(--text-color-primary);
  padding: .57em .71em .35em;
  font-weight: 400;
}

@include mobile {
	.bonus {
		flex-direction: column;

		&__right-side {
			order: 1;
			display: flex;
			flex-direction: column;
			row-gap: 2em;
		}

		&__left-side {
			order: 2;
		}

		&__banner_mobile {
			display: block;
		}

		&__banner_desktop {
			display: none;
		}
	}
}

</style>
