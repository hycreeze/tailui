<template>
  <button
    :class="[
      'tail-button',
      type ? 'tail-button--' + type : '',
      buttonSize ? 'tail-button--' + buttonSize : '',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :disabled="buttonDisabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <svg
      v-show="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span
      v-if="$slots.default"
    >
      <slot />
    </span>
  </button>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType } from 'vue'
  import { isValidComponentSize } from "@/utils/validator";

  // 定义一个对象
  type TailButtonType = PropType<'primary' | 'success' | 'warming' | 'danger' | 'info' | 'text' | 'default'>
  type TailButtonNativeType = PropType<'button' | 'submit' | 'reset'>

  interface TailButtonProps {
      type: string
      size: string
      icon: string
      nativeType: string
      loading: boolean

      disabled: boolean
      plain: boolean
      autofocus: boolean
      round: boolean
      circle: boolean
  }

  type TailFn = (evt: Event) => void

  export default defineComponent({
      name: 'TailButton',
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
                      'text'
                  ].includes(val)
              },
          },
          size: {
              type: String as PropType<'' |'large'|'medium'|'small'| 'mini'>,
              default: 'large',
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
          plain: {
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
