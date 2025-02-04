<template>
	<nav aria-label="Page navigation">
	  <ul class="pagination">
			<li :class="[
				'btn btn-senary', {
					disabled: isFirstPage || loading
				}]" @click="selectPage(current_page - 1)">
				<span aria-hidden="true">&laquo;</span>
			</li>
			<li
				v-for="page in pages"
				:key="page"
				:class="page === '...' ? '' : ['btn btn-senary', { active: page === current_page, disabled: loading }]"
				@click="selectPage(page)"
			>
				<span>{{ page }}</span>
			</li>
			<li :class="['btn btn-senary', { disabled: isLastPage || loading }]" @click="selectPage(current_page + 1)">
				<span aria-hidden="true">&raquo;</span>
			</li>
	  </ul>
	</nav>
</template>

<script>
  export default {
	props: {
	  current_page: {
		type: Number,
		required: true,
	  },
	  last_page: {
		type: Number,
		required: true,
	  },
	  loading: {
		type: Boolean,
		required: true,
	  }
	},
	computed: {
	  pages() {
		const { current_page, last_page } = this;
		const range = [];
		const maxPages = 5;
		const half = Math.floor(maxPages / 2);

		let start = Math.max(1, current_page - half);
		let end = Math.min(last_page, current_page + half);

		if (current_page <= half) {
		  end = Math.min(last_page, maxPages);
		} else if (last_page - current_page < half) {
		  start = Math.max(1, last_page - maxPages + 1);
		}

		for (let i = start; i <= end; i++) {
		  range.push(i);
		}

		if (start > 2) {
		  range.unshift('...');
		}

		if (start > 1) {
		  range.unshift(1);
		}

		if (end < last_page - 1) {
		  range.push('...');
		}

		if (end < last_page) {
		  range.push(last_page);
		}

		return range;
	  },
	  isFirstPage() {
		return this.current_page === 1;
	  },
	  isLastPage() {
		return this.current_page === this.last_page;
	  }
	},
	methods: {
	  selectPage(page) {
		if (!this.loading && page !== '...' && page >= 1 && page <= this.last_page && page !== this.current_page) {
		  this.$emit('page-changed', page);
		}
	  }
	}
  };
</script>

<style lang="scss" scoped>
  .pagination {
		font-family: 'fira-sans', sans-serif;
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  .pagination li {
		box-sizing: border-box;
    cursor: pointer;
    border-radius: 10rem;
    border:none;
		transition: all .2s ease-in-out;

		&.btn {
			width: 4rem;
			height: 4rem;
			padding: 1rem;
			font-size: 1.6rem;
		}

		&:not(.btn) {
			display: flex;
			align-items: center;
			justify-content: center;
		}

		&.disabled {
			cursor: default;
			opacity: .5;

			&:hover {
				background-color: #fff;
				box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
			}
		}

		&.active {
			background-color: var(--primary-color);
			color: #fff;
		}
  }
  .pagination li.disabled {
	  color: #ccc;
  }
</style>