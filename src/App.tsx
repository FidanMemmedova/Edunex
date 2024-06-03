import { Reset } from "@components/reset";
import { Theme } from "@components/theme";
import { Antd } from "@components/antd";
import { Layouts } from "./layouts";
import "./App.scss";

function App() {
  return (
    <Reset>
      <Theme>
        <Antd>
          <Layouts />
        </Antd>
      </Theme>
    </Reset>
  );
}

export default App;
