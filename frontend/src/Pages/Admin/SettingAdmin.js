import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Form,
  Input,
  Button,
  Upload,
  Avatar,
  message,
  Divider,
  Spin,
  Radio,
  Col,
  Row
} from "antd";
import {
  UploadOutlined,
  UserOutlined,
  LockOutlined,
  EditOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";
import "../../UI/Setting.scss";
import Cookies from "js-cookie";
import { getUserProfile, updateUserProfile } from "../../api/apiUser";
import ChangePassword from "../Client/Auth/ChangePassword";

const { Sider, Content } = Layout;

function SettingAdminPage() {
  const [selectedKey, setSelectedKey] = useState("account");
  const [user, setUser] = useState(null);
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const email = Cookies.get("email");

  useEffect(() => {
    getUserProfile()
      .then(res => {
        setUser(res.data.user);
        form.setFieldsValue(res.data.user);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        message.error("Vui lòng đăng nhập để xem hồ sơ");
        navigate("/login");
      });
  }, [navigate, form]);

  const handleUpdate = (values) => {
    updateUserProfile(values.name, values.email, values.phone, values.gender, values.address)
      .then(res => {
        setUser(res.data.user);
        form.setFieldsValue(res.data.user);
        setEditing(false);
        message.success("Cập nhật thành công");
      })
      .catch(err => {
        console.error(err);
        message.error("Cập nhật thất bại");
      });
  };

  const renderSection = () => {
    switch (selectedKey) {
      case "account":
        return (
          <>
            {loading ? <Spin /> : (
              <>
                <h2 className="setting-content__title">Thông tin tài khoản</h2>
                <Divider />
                <div className="setting-avatar">
                  <Avatar size={64} icon={<UserOutlined />} />
                  <Upload showUploadList={false}>
                    <Button icon={<UploadOutlined />} className="setting-avatar__button">
                      Đổi ảnh đại diện
                    </Button>
                  </Upload>
                </div>

                <Form layout="vertical" form={form} onFinish={handleUpdate} className="setting__form">
                  <Row gutter={16}>
                    <Col xxl={12} xl={12} lg={24} sm={24} xs={24}>
                      <Form.Item label="Họ tên" name="name">
                        <Input disabled={!editing} />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={24} sm={24} xs={24}>
                      <Form.Item label="Email" name="email">
                        <Input disabled={true} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xxl={12} xl={12} lg={24} sm={24} xs={24}>
                      <Form.Item label="Số điện thoại" name="phone">
                        <Input disabled={!editing} />
                      </Form.Item>
                    </Col>
                    <Col xxl={12} xl={12} lg={24} sm={24} xs={24}>
                      <Form.Item label="Địa chỉ" name="address">
                        <Input disabled={!editing} />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={24}>
                      <Form.Item label="Giới tính" name="gender">
                        <Radio.Group disabled={!editing}>
                          <Radio value="male">Nam</Radio>
                          <Radio value="female">Nữ</Radio>
                          <Radio value="other">Khác</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>

                <div className="setting-content__actions">
                  {editing ? (
                    <>
                      <Button type="primary" onClick={() => form.submit()} className="setting-content__button">Lưu</Button>
                      <Button onClick={() => setEditing(false)} className="setting-content__button">Hủy</Button>
                    </>
                  ) : (
                    <Button icon={<EditOutlined />} onClick={() => setEditing(true)} className="setting-content__button">Chỉnh sửa</Button>
                  )}
                </div>
              </>
            )}
          </>
        );

      case "security":
        return (
          <>
            <h2 className="setting-content__title">Bảo mật</h2>
            <Divider />
            <ChangePassword email={email} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Layout className="setting-sider-layout">
      <Sider width={260} className="setting-sider">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => setSelectedKey(key)}
          items={[
            { key: "account", icon: <UserOutlined />, label: "Tài khoản" },
            { key: "security", icon: <LockOutlined />, label: "Bảo mật" },
          ]}
        />
      </Sider>
      <Layout>
        <Content className="setting-content">
          {renderSection()}
        </Content>
      </Layout>
    </Layout>
  );
}
export default SettingAdminPage;