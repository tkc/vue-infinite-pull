<template>
  <div>
    <div>
      <div class="wrap">
        <div class="target">
          <p class="example-list-item" v-for="item in list" v-text="item"></p>
        </div>
      </div>
    </div>

    <InfiniteLoading @infinite="infiniteHandler" target_class="target" wrap_class="wrap" spinner="false" ref="infiniteLoading">
      <span slot="no-results"></span>
      <span slot="no-more"></span>
    </InfiniteLoading>
  </div>
</template>

<script>
	import InfiniteLoading from './components/InfinitePull.vue';
	export default {
		name: 'App',
		components: {
			InfiniteLoading
		},
		data() {
			return {
				distance:100,
				list: []
			}
		},
		methods: {
			infiniteHandler($state) {
				setTimeout(() => {
					let temp = [];
					for (let i = this.list.length; i <= this.list.length + 2; i++) {
						temp.push(i);
					}
					this.list = this.list.concat(temp);
					$state.loaded();
				}, 1000);
			}
		}
	}
</script>

<style scoped>
  .wrap{
    border: solid 1px;
  }
  p{
    border: solid 1px #505050;
    margin: 2px;
    padding: 10px;
  }
  .wrap{
    max-height: 200px;
    overflow: auto;

  }
</style>
