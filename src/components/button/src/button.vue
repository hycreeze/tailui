<template>
  <button
    :class="[
      'tail-button',
      type ? 'tail-button--' + type : '',
      buttonSize ? 'tail-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-round': round,
        'is-circle': circle,
        'is-animation': animation
      },
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <span>
        <tail-svg 
					v-show="loading"
          size="large"
					class="-ml-1 mr-2 h-4 w-4 text-white inline-block" 
          name="load"
          :spin="true"
        />
      <span
        v-if="$slots.default"
      >
        <slot />
      </span>
    </span>
  </button>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { isValidComponentSize } from "@/utils/validator";
	import TailSvg from "../../svg/src/svg";

  // 定义一个对象
  type TailButtonType = PropType<'primary' | 'success' | 'warming' | 'danger' | 'info' | 'text' | 'default'| 'link'>
  type TailButtonNativeType = PropType<'button' | 'submit' | 'reset'>

  interface TailButtonProps {
      type: string
      size: string
      icon: string
      nativeType: string
      loading: boolean
      animation: boolean
      disabled: boolean
      autofocus: boolean
      round: boolean
      circle: boolean
  }

  type TailFn = (evt: Event) => void

  export default defineComponent({
      name: 'TailButton',
			components: { TailSvg },
      props: {
          type: {
              type: String as TailButtonType,
              default: 'default',
              validator: (val: string) => {
                  // array.includes() 返回 boolean 表示是否包含某一元素
                  return [
                      'primary',
                      'default',
                      'success',
                      'warming',
                      'danger',
                      'info',
                      'text',
                      'link'
                  ].includes(val)
              },
          },
          size: {
              type: String as PropType<'' |'large'|'medium'|'small'| 'mini'>,
              default: 'small',
              validator: isValidComponentSize,
          },
          icon: {
              type: String,
              default: '',
          },
          nativeType: {
              type: String as TailButtonNativeType,
              default: 'button',
              validator: (val: string) => {
                  return ['button', 'submit', 'reset'].includes(val)
              }
          },
          loading: {
              type: Boolean,
              default: false
          },
          disabled: {
              type: Boolean,
              default: false
          },
          autofocus: {
              type: Boolean,
              default: false
          },
          round: {
              type: Boolean,
              default: false
          },
          circle: {
              type: Boolean,
              default: false
          },
          animation: {
              type: Boolean,
              default: false
          }
      },
      emits: ['click'],

      setup (props, ctx) {
          const buttonSize = computed(() => {
              return props.size
          });

          const buttonDisabled = computed(() => {
              return props.disabled || props.loading
          });

          const handleClick = (evt: Event) => {
              ctx.emit('click', evt)
          };

          return {
              buttonSize,
              buttonDisabled,
              handleClick
          }
      }
  })
</script>
