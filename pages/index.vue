<template>
  <div id="page-index">
    <LogoNuxt />
    <h1 class="font-medium text-6xl text-gray-800">
      {{ title }}
    </h1>
    <h2 class="font-light text-4xl text-gray-700">
      {{ description }}
    </h2>
    <div class="m-4">
      <LinkCornerRounded
        text="Twitter"
        color="green"
        brightness="700"
        :href="twitter"
      />
      <LinkCornerRounded
        text="GitHub"
        color="gray"
        brightness="700"
        :href="github"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";
import LinkCornerRounded from '~/components/LinkCornerRounded.vue';
import LogoNuxt from '~/components/LogoNuxt.vue';

export default defineComponent({
  components: {
    LinkCornerRounded,
    LogoNuxt,
  },
  setup() {
    const title = computed(() => process.env.APP_NAME);
    const description = computed(() => process.env.APP_DESCRIPTION);
    const twitter = computed(() => process.env.AUTHOR_TWITTER);
    const github = computed(() => process.env.GITHUB_REPOSITORY);

    return {
      title,
      description,
      twitter,
      github,
    };
  },
});
</script>

<style scoped lang="stylus">
#page-index {
  display flex
  flex-direction column
  min-height 100vh
  justify-content center
  align-items center
  text-align center
}
</style>
