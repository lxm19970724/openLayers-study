import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// 引入ant-design-vue
import useAntd from "@/ant-design-vue";

const app = createApp(App);
app.use(createPinia());
app.use(router);
// 使用ant-design-vue
useAntd(app);
app.mount("#app");
