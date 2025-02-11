<template>
	<slot v-if="$slots.default"
		:files="files"
	/>
	<template v-else>
		<div class="row mx-n10" v-if="files.length">
			<div class="col-4 col-md-3 product__gallery-item p-5 p-sm-10" v-for="(file, index) in files" :key="file">
				<div class="product__gallery-link">
					<a :href="file.url" target="_blank">
						<img :src="file.thumb">
					</a>
					<div class="product__gallery-load progress link" v-if="file.loading">
						<div class="progress-bar progress-bar-striped progress-bar-animated link">Загрузка</div>
					</div>
					<div class="product__gallery-del close" @click="deleteFile(file)" v-if="!readonly"></div>
				</div>
			</div>
		</div>
	</template>
</template>

<script>
export default {
    props: {
        filesValue: Array,
		readonly: {
			type: Boolean,
			default: false,
		}
    },

    emits: [
		'update:filesValue',
	],

    data() {
        return {
            loading: false,
			test: "qwerty",
        };
    },

    mounted() {

    },

    methods: {
		deleteFile(file) {
			let self = this;
			let index = self.files.indexOf(file);
			if (index !== -1) {
				self.files.splice(index, 1);
				self.files = [...self.files];
			}
		}
    },

	computed: {
		files: {
			get() {
				return this.filesValue ? this.filesValue : [];
			},
			set(value) {
				this.$emit('update:filesValue', value);
			},
		},
	},
}
</script>
