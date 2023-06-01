<template>
  <transition name="hot-search-move">
    <scroll
      class="hot-search-wrapper"
      :top="52"
      @onScroll="onScroll"
      ref="scroll"
    >
      <hot-search
        :label="$t('home.hotSearch')"
        :btn="$t('home.change')"
        :hotSearch="searchList.hotSearch"
      ></hot-search>
      <div class="line"></div>
      <hot-search
        :label="$t('home.historySearch')"
        :btn="$t('home.clear')"
        :hotSearch="searchList.historySearch"
      ></hot-search>
    </scroll>
  </transition>
</template>

<script>
import Scroll from '../common/Scroll'
import HotSearch from './HotSearch'
import { storeHomeMixin } from '../../utils/mixin'
import { SearchList } from '@/api/store'

export default {
  mixins: [storeHomeMixin],
  components: {
    Scroll,
    HotSearch
  },
  data () {
    return {
      searchList: {
        hotSearch: null,
        //   {
        //     type: 1,
        //     keyword: 'Self-Reported Population Health',
        //     num: '1.8万'
        //   },
        //   {
        //     type: 1,
        //     keyword: 'Library and Information Sciences',
        //     num: '1.1万'
        //   },
        //   {
        //     type: 1,
        //     keyword: 'Global Business Strategy',
        //     num: '1.3万'
        //   },
        //   {
        //     type: 1,
        //     keyword: 'Corporate Data Quality',
        //     num: '1.0万'
        //   },
        //   {
        //     type: 1,
        //     keyword: 'Verrechnungspreise',
        //     num: '3.9万'
        //   }
        // ],
        historySearch: null
        //   {
        //     type: 2,
        //     keyword: 'Computer Science'
        //   },
        //   {
        //     type: 1,
        //     bookName: 'Building the Infrastructure for Cloud Security'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'ePub'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'api'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Vue.js'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Nginx'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Java'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'hdfs'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'vuejs'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'es6'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Intel'
        //   },
        //   {
        //     type: 1,
        //     keyword: 'Pro Git'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'imooc'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Education'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Springer'
        //   },
        //   {
        //     type: 2,
        //     keyword: 'Environment'
        //   }
        // ]
      }
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setHotSearchOffsetY(offsetY)
    },
    reset () {
      this.$refs.scroll.scrollTo(0, 0)
      // 跳转到起始位置，不起作用，Scroll组件里面没定义这个方法好像
    },
    getList () {
      SearchList().then(response => {
        if (response.status === 200 && response.data.result) {
          this.searchList.hotSearch = response.data.result.hotSearch
          this.searchList.historySearch = response.data.result.historySearch
        }
      }
      )
    }
  },
  created () {
    this.getList()
    console.log('this.searchList.historySearch', this.searchList.historySearch)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.hot-search-wrapper {
  width: 100%;
  height: 100%;
  background: white;
  .line {
    width: 100%;
    height: 0;
    border-top: px2rem(1) solid #eee;
    margin: px2rem(10) 0;
  }
}
</style>
