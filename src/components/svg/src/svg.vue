<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    :width="widthNum"
    :height="heightNum"
    :aria-labelledby="iconName"
    role="presentation"
    :class="className"
    @click="handleClick"
  >
    <title
      :id="iconName"
      lang="en"
    >
      {{ iconName }}
    </title>
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import type { PropType } from 'vue'

  interface TailSvg  {
    width: number
    height: number
    name: string
    color: string
  }

  const DefaultSize = 24;

  export default defineComponent({
    name: 'TailSvg',
    props: {
      width: {
        type: Number,
        default: DefaultSize,
      },
      height: {
        type: Number,
        default: DefaultSize,
      },
      size: {
        type: String as PropType<'large'|'medium'|'small'>,
        default: 'small',
        validator: (val: string) =>
          ['large', 'medium', 'small'].includes(val),
      },
      fill: {
        type: String,
        default: '',
      },
      name: {
        type: String,
        default: '',
      },
      spin: {
        type: Boolean,
        default: false
      },
      class: {
        type: String,
        default: ''
      }
    },

    emits: ['click'],
    
    setup (props, ctx) {

      const DefaultSize =  {
        small: 18,
        medium: 24,
        large: 40
      };

      const widthNum = computed(() => {
        return props.size ? DefaultSize[props.size] : props.width;
      })

      const heightNum = computed(() => {
        return props.size ? DefaultSize[props.size] : props.width;
      })

      const handleClick = (evt: Event) => {
        ctx.emit('click', evt)
      };

      const className = computed(() => {
        let classStr = '';
        if (props.spin) {
            classStr = classStr + 'animate-spin';
        }
        return classStr + ' ' + props.class;
      })

      const iconName = computed(() => {
        return '#' + props.name
      })

      return {
        widthNum,
        heightNum,
        handleClick,
        iconName,
        className
      }
    }
  })

</script>