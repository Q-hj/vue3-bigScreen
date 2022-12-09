<!--
 * @Date: 2022-09-30 09:35:09
 * @LastEditors: Mr.qin
 * @LastEditTime: 2022-11-30 13:51:20
 * @Description: 主视图
-->

<script setup lang="ts">
import { Message } from "@arco-design/web-vue";

const videoUrl = new URL(`@/assets/video/demo.mp4`, import.meta.url).href;

const vaildImage = (url: string) =>
  ["jpg", "jpeg", "png", "svg"].includes(url.split(".").at(-1).toLowerCase());

const resources = reactive<ResourcesMap>({
  main: {},
  others: [],
});
const playBtnEl = ref();
const videoEl = ref<HTMLVideoElement>();
watchEffect(async () => {
  const id = location.search.split("id=")[1];
  if (!id) Message.error("无此热点！");
  const data = await get("/mini/getHotInfo", { id });

  if (!data.length) Message.error("无此热点！");
  console.log(data);
  resources.main = data.filter((e) => e.id == id)[0];
  //   resources.main = {
  //     ...resources.main,
  //     //   url: "https://placekitten.com/500/200",
  //     url: videoUrl,
  //   };
  if (!vaildImage(resources.main.url)) {
    // 当前为视频资源
    videoEl.value.play();
    return;
  }
  resources.others = data.filter((e) => e.id != id);
  //   resources.others = ["300/300", "500/300", "200/500"].map((e) => ({
  //     name: "测试21313",
  //     url: "https://placekitten.com/" + e,
  //   }));
});

const jump = ({ id }) =>
  window.location.replace(
    "https://zjzlxs.zjds.org.cn/exhibition-hotSpot/?id=" + id
  );
const isMobile: boolean = document.body.clientWidth < 1000;
console.log(isMobile);
// console.log(window.screen.width);
// console.log(document.body.clientWidth);
</script>
<template>
  <div class="full-screen flex-center">
    <div class="video full flex-center" v-if="!resources.others.length">
      <video
        ref="videoEl"
        class="w-full"
        :src="resources.main.url"
        autoplay
        controls
      ></video>
      <div ref="playBtnEl" @click="videoEl.play()"></div>
    </div>
    <div
      v-else
      class="picture full between-center p-20px flex-col lg:(p-50px flex-row)"
    >
      <a-image
        class="h-[calc(100%-100px)] lg:h-auto"
        fit="contain"
        :width="isMobile ? '100%' : '80%'"
        height="100%"
        :preview="false"
        :src="resources.main.url"
        :title="resources.main.name"
      />
      <div class="other flex-1 h-full">
        <p class="text-20px leading-60px text-center">相关推荐</p>
        <!-- <div
          class="w-full h-30%"
          v-for="item in resources.others"
          :key="item.id"
        >
          <img class="full" :src="item.url" alt="" />
        </div> -->
        <!--  -->
        <div class="h-200px isscroll lg:h-[calc(100%-60px)]">
          <a-space
            :direction="isMobile ? 'horizontal' : 'vertical'"
            :size="isMobile ? 'mini' : 'large'"
            align="center"
            fill
          >
            <div v-for="item in resources.others" :key="item.id">
              <a-image
                class="cursor-pointer"
                @click="jump(item)"
                fit="contain"
                :width="isMobile ? '80%' : '100%'"
                :preview="false"
                :src="item.url"
                :title="isMobile ? '' : ''"
              />
              <footer class="text-right text-18 py-5px">
                <p>{{ item.name }}</p>
                <p>{{ item.pavilionDto?.name }}</p>
              </footer>
            </div>
          </a-space>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.full-screen {
  background-color: rgba(32, 29, 30, 0.8);
  min-height: 100%;
}

footer {
  margin-top: -5px;
  background: rgba(255, 255, 255, 0.3);
  display: none;
}
span,
p {
  color: rgba(255, 255, 255, 0.87);
}
#app {
  position: relative;
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.picture {
}

@media (min-width: 1024px) {
  .isscroll {
    overflow: scroll;
  }
  :deep(.arco-image-footer-caption-title) {
    font-size: 24px;
    font-weight: bold;
  }
  footer {
    display: block;
  }
}
</style>
