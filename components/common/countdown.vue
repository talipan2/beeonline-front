<template>
    <template v-if="end">
        <template v-if="$slots.expired && timeExpired">
            <slot name="expired"></slot>
        </template>
        <div class="countdown" v-else>
            <div class="countdown__body" v-if="timeExpired">{{ expiredText }}</div>
            <div class="countdown__body" v-else v-html="timeCalculated"></div>
        </div>
    </template>
</template>

<script>
export default {
    props: {
		end: String,
        expiredText: {
            type: String,
            default: 'Время истекло',
        },
	},

    data() {
		return {
			now: Date.now(),
			timer: null,
		};
    },

    mounted() {

    },

	methods: {
		declOfNum(number, titles) {
			let cases = [2, 0, 1, 1, 1, 2];
			return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
		},
	},

	computed: {
		endTime() {
			return Date.parse(this.end);
		},
        diff () {
            return this.endTime - this.now;
        },
        timeExpired () {
            return this.diff < 1;
        },
		timeCalculated () {
			let diff = this.diff;

			let theDiff = {
				diff : diff,
				// ms : Math.floor( diff            % 1000 ),
				s  : Math.floor( diff /     1000 %   60 ),
				m  : Math.floor( diff /    60000 %   60 ),
				h  : Math.floor( diff /  3600000 %   24 ),
				d  : Math.floor( diff / 86400000        )
			};

			let time = '';
			if (theDiff.d) {
				time += `<b>${theDiff.d}</b> ${this.declOfNum(theDiff.d, ['день', 'дня', 'дней'])} `;
			}
			if (theDiff.d || theDiff.h) {
				time += `<b>${theDiff.h}</b> ${this.declOfNum(theDiff.h, ['час', 'часа', 'часов'])} `;
			}
			if (!theDiff.d && (theDiff.h || theDiff.m)) {
				time += `<b>${theDiff.m}</b> ${this.declOfNum(theDiff.m, ['минута', 'минуты', 'минут'])}`;
			}
			if (!theDiff.d && !theDiff.h && (theDiff.m || theDiff.s)) {
				time += ` <b>${Math.round(theDiff.s)}</b> ${this.declOfNum(theDiff.s, ['секунда', 'секунды', 'секунд'])}`;
			}

			return time;
		}
	},

	watch: {
		end: {
			immediate: true,

			handler (prop_ends) {
				const end_obj = Date.parse(prop_ends);

				if (this.timer) {
					clearInterval(this.timer)
				}

				this.timer = setInterval(() => {
					this.now = Date.now();

					if (this.now > end_obj) {
						this.now = end_obj;
						clearInterval(this.timer);
					}
				}, 1000);
			},
    	},
	},
}
</script>

<style lang="scss">
.countdown {
	position: relative;
	font-size: 1rem;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: #F0F4FB;
	color: #000;
	border: 1px solid #A29699;
	padding: 2em;
	line-height: 1.5;
	text-align: center;
	margin: 1em 0;
	min-height: 15em;

	&__body {
		font-size: 1.6em;

		b {
			font-size: 4em;
			font-weight: 900;

			@media (max-width: 575px) {
				font-size: 2em;
			}
		}
	}
}
</style>
