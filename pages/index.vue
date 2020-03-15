<template>
  <div id="page-index">
    <LogoNuxt />
    <h1 class="title">
      {{ title }}
    </h1>
    <h2 class="subtitle">
      {{ description }}
    </h2>
    <div class="links">
      <LinkCornerRounded
        text="Twitter"
        color="#2f855a"
        :href="twitter"
      />
      <LinkCornerRounded
        text="GitHub"
        color="#4a5568"
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
  margin 0 auto
  justify-content center
  align-items center
  text-align center

  > .title {
    font-weight 300
    font-size 4rem
    color #2d3748
  }

  .subtitle {
    font-weight 300
    font-size 2rem
    color #4a5568
  }
}
</style>
