import { App } from 'vue'
import Svg from './src/svg.vue'
Svg.install = (app: App): void => {
    app.component(Svg.name, Svg)
};


export default Svg