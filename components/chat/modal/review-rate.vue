<template>
    <div class="d-flex align-items-center">
        <div class="rate rate_choice"
			:class="rateClass"
			ref="rate"
			@mousemove="mousemove"
			@click="click"
			@mouseout="mouseout"
		></div>
        <div class="ml-15">{{ count }}</div>
        <input
            style="display: none;"
            type="text"
            name="rate"
            required
            :value="rate ? rate : null"
        />
        <div class="invalid-feedback">Поставьте оценку</div>
    </div>
</template>

<script>
export default {
	emits: ['change'],

	props: {

	},

	data: () => ({
		rate: 0,
		hoverRate: 0,
	}),

	mounted() {
	},

	methods: {
		calcRate(offsetX) {
            return (parseInt(offsetX / this.$refs.rate.offsetWidth * 5) + 1);
        },
		reset() {
			this.rate = 0;
			this.hoverRate = 0;
		},
		mousemove(e) {
			this.hoverRate = this.calcRate(e.offsetX);
		},
		click(e) {
			this.rate = this.calcRate(e.offsetX);
			this.$emit('change', this.rate);
		},
		mouseout(e) {
            this.hoverRate = 0;
		}
	},

	computed: {
		rateClass() {
			if (this.hoverRate) {
				return 'rate-' + this.hoverRate * 20;
			} else {
				return 'rate-' + this.rate * 20;
			}
		},
		count() {
			if (!this.rate) return '';
			return this.rate + '/5';
		}
	},
};
</script>

<style lang="scss"></style>
