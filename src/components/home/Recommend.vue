<template>
  <div class="recommend">
    <title-view
      :label="$t('home.recommend')"
      :btn="$t('home.privateBook')"
    ></title-view>
    <div class="recommend-list">
      <div
        class="recommend-item"
        v-for="(item, index) in data"
        :key="index"
        @click="showBookDetail(item)"
      >
        <div class="img-wrapper">
          <img
            class="img"
            :src="item.cover"
          >
        </div>
        <div class="content-wrapper">
          <div
            class="title title-medium"
            ref="title"
          >{{item.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import TitleView from './Title'
import { storeHomeMixin } from '../../utils/mixin'

export default {
  mixins: [storeHomeMixin],
  components: {
    TitleView
  },
  props: {
    data: Array
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/styles/global';

.recommend {
  .recommend-list {
    padding-left: 13%;
    width: 100%;
    @include top;
   // padding: 0 px2rem(5);
    box-sizing: border-box;
    overflow-x: scroll; // 添加这行
    white-space: nowrap; // 添加这行
    .recommend-item {
      flex: 0 0 25%; // 更改宽度
      width: 25%; // 更改宽度
      padding: 0 px2rem(5);
      box-sizing: border-box;
      display: inline-block; // 更改display属性
      .img-wrapper {
        @include center;
        .img {
          width: 80%;
        }
      }
      .content-wrapper {
        width: 100%;
        margin-top: px2rem(10);
        @include columnCenter;
        .title {
          text-align: center;
        }
        .num {
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
