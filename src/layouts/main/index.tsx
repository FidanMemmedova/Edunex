import { Button, Flex, Typography } from "antd";
import Title from "antd/es/typography/Title";
import Guard from "./guard";
import { useNavigate } from "react-router-dom";
const { Text } = Typography;

function Main() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/start");
  };
  return (
    <Flex justify="center" style={{ height: "60vh" }}>
      <Flex justify="center" align="center" vertical gap="24px">
        <Flex vertical gap="35px" style={{ textAlign: "center" }}>
          <Title level={4} style={{ fontSize: "18px" }}>
            Edunex təhsil portalına xoş gəlmisiz.
          </Title>
          <Text style={{ fontSize: "16px" }}>İlk imtahanını yarat</Text>
        </Flex>
        <Button
          type="primary"
          style={{
            width: "100%",
            padding: "10px 37px !important",
            height: "auto !important",
            borderRadius: "0",
            fontSize:"12px"
          }}
          onClick={handleNavigate}
        >
          Imtahan yarat
        </Button>
      </Flex>
    </Flex>
  );
}
export default Guard(Main);
