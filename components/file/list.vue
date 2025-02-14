<template>
	<div v-if="prop_files && user">
		<div v-for="(file, index) in prop_files" :key="file"
			:class="{
				'doc-attach-right': (user.org_id === file.org_id) || (user.is_manager === file.org_id),
				'doc-attach-left': (user.org_id !== file.org_id) && (user.is_manager !== file.org_id),
			}"
		>
			<div class="doc-attach-title"
				v-if="showTitle(index, file)">{{ orgs[file.org_id].name }}</div>
			<div class="doc-attach border-top-0"
			>
				<a :href="file.url_path || 'javascript:;'" :download="file.url_path ? file.name : null" class="doc">
					<svg class="doc__icon"
						:class="[
							file.ext ? ('doc__icon_' + file.ext) : '',
							file.type ? ('doc__icon_' + file.type) : '',
						]"
						viewbox="0 0 50 50"
						width="50" height="50">
						<use xlink:href=""/>
						<text x="13" y="33">{{ file.ext }}</text>
					</svg>
					<div class="doc__body">
						<div class="doc__title">{{ file.name }}</div>
						<a :href="file.url_path" class="doc__download" :download="file.url_path ? file.name : null" v-if="file.url_path">Скачать</a>
					</div>
				</a>
				<a href="javascript:;"
					v-if="(user.org_id === file.org_id) && (file.loading || del_route)"
				class="close" @click="remove(file)"></a>
				<div class="progress doc-attach__progress" v-if="file.loading">
					<div class="progress-bar progress-bar-striped progress-bar-animated"
						:style="{ width: file.progress+'%' }"
					></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    props: {
		prop_files: Array,
		user: Object,
		del_route: String,
	},

	emits: [],

    data() {
		return {
			loading: false,
			orgs: window.orgs || {},
		};
    },

    mounted() {

    },

	methods: {
		showTitle: function(index, file) {
			if (!this.orgs[file.org_id]) return false;

			if (!this.prop_files[index - 1]) return true;

			if (this.prop_files[index - 1].org_id != file.org_id) return true;

			return false;
		},

		remove: function(file){
			if (file.loading) {
				this.$emit('cancel', this.prop_files, file);
			}
			if (file.id) {
				makeRequest(this, this.del_route, {
					id: file.id,
				});
			}
		},
	},

	watch: {

	},
}
</script>
