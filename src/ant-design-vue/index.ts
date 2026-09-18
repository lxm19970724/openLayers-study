/**
 * 按需引入ant-design-vue
 */
import { ConfigProvider, Button, Layout, Collapse, Input, Form } from "ant-design-vue";

const components = [ConfigProvider, Button, Layout, Collapse, Input, Form];

// 使用
const useAntd = (app: any) => {
  components.forEach((item) => {
    app.use(item);
  });
};

export default useAntd;
