import { Col, Container, Row } from "react-bootstrap"
import { ColorStyle } from "../../styles/colors"
import { useNavigate } from "react-router"
import { setCookie } from "../../utils/cookie"
import { postAuthLogin } from "../../services/api/loginApi"
import { notify } from "../../components/Notification"
import Form from "../../components/FormBase"
import Button from "../../components/Button"

const Login = () => {
  const navigate = useNavigate()

  const onFinish = async (value: MLogin.IRecord) => {
    const res: any = await postAuthLogin(value)
    if (res?.success) {
      notify({ title: "Success", type: "success", description: "Đăng nhập thành công" })
      setCookie("accessToken", res.accessToken, 15)
      setCookie("refreshToken", res.refreshToken, 7 * 24 * 60)
      navigate("/")
    } else {
      notify({ title: "Error", type: "error", description: res?.message })
    }
  }

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: ColorStyle.GradientPrimary
    }}>
      <Container style={{
        maxHeight: "450px",
        maxWidth: "500px",
        padding: "40px 20px",
        borderRadius: "13px",
        backgroundColor: "#fff",
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
        border: "1px solid rgba(0,0,0,0.05)"
      }}>
        <h4
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "bold",
            background: ColorStyle.GradientPrimary,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Đăng nhập
        </h4>
        <Form onFinish={onFinish}>
          <Row>
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Email</label>
              <Form.Input name="email" required />
            </Col>
            <Col sm={12}>
              <label className="form-label required" style={{ margin: 5 }}>Mật khẩu</label>
              <Form.Input name="password" required type="password" />
            </Col>
            <Col sm={12}>
              <Button style={{ width: "100%", marginTop: 25 }} type="gradientPrimary" htmlType="submit">
                <span>Đăng nhập</span>
              </Button>
            </Col>
            <Col sm={12}>
              <Button style={{ width: "100%", marginTop: 10 }} onClick={() => navigate("/register")}>
                <span>Đăng ký</span>
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  )
}

export default Login