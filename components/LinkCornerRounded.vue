<template>
  <a
      class="link-corner-rounded"
      :style="colorVariable"
      :href="href"
      target="_blank"
      rel="noopener"
  >
    {{ text }}
  </a>
</template>

<script lang="ts">
import { computed, defineComponent } from "@vue/composition-api";

type Props = {
  text: string;
  color: string;
  href: string;
};

export default defineComponent({
  props: {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
  },
  setup(props: Props) {
    const colorVariable = computed(() => {
      return {
        '--hex-color': props.color,
      };
    });

    return {
      colorVariable,
    };
  },
});
</script>

<style scoped lang="stylus">
.link-corner-rounded {
  display inline-block
  border-radius 4px
  border 1px solid
  border-color var(--hex-color)
  color var(--hex-color)
  text-decoration none
  padding 10px 30px
  transition background-color .3s ease-in, color .3s ease-in

  &:hover {
    color white
    background-color var(--hex-color)
    transition background-color .3s ease-in, color .3s ease-in
  }
}
</style>
